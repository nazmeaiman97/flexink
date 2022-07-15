<template>
  <div class="row">
    <div class="col-3">
      <q-file
        v-model="newFile"
        :disable="disableUploadBtn"
        accept=".jpg, image/*"
        :label="`Pick ${title}`"
        outlined
        use-chips
        multiple
        append
        style="max-width: 300px"
      />
    </div>
    <div class="cols-3 q-pl-lg q-mt-sm">
      <q-btn
        @click="uploadFile"
        :disable="newFile.length === 0 || disableUploadBtn"
        class="full-width"
        color="primary"
        >Upload</q-btn
      >
    </div>
  </div>
  <div class="q-mt-lg">
    <q-table
      class="my-sticky-header-column-table"
      :title="`${title} Uploaded`"
      :rows="uploadedFile"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-icon
            name="delete"
            color="red"
            @click="() => deleteFile(props.value)"
          ></q-icon>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import { uploadedFileDataType } from 'components/models';

const columns = [
  {
    name: 'fileName',
    align: 'center',
    label: 'File Name',
    field: 'filename',
    sortable: true,
  },
  {
    name: 'Original File Name',
    align: 'center',
    label: 'Original File Name',
    field: 'originalFilename',
    sortable: true,
  },
  {
    name: 'File Size',
    align: 'center',
    label: 'File Size',
    field: 'fileSize',
    sortable: true,
  },
  {
    name: 'contentType',
    align: 'center',
    label: 'Content Type',
    field: 'contentType',
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: 'Action',
    field: 'filename',
    sortable: true,
  },
];

export default defineComponent({
  name: 'UploadedFile',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const newFile = ref([]);
    const uploadedFile = ref<Array<uploadedFileDataType>>([]);
    const disableUploadBtn = ref<boolean>(false);

    const uploadFile = () => {
      const formData = new FormData();
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      newFile.value.forEach((file) => {
        formData.append('file', file);
      });
      api.post('/public/bbs/post/file', formData, config).then((response) => {
        newFile.value = [];
        const { data } = response;
        data.forEach((element: any) => {
          uploadedFile.value.push(element);
        });
      });
    };

    const deleteFile = (fileName: string) => {
      api.delete(`/public/bbs/post/file/${fileName}`).then(() => {
        uploadedFile.value = uploadedFile.value.filter(
          (file: uploadedFileDataType) => {
            return file.filename !== fileName;
          }
        );
      });
    };

    return {
      columns,
      newFile,
      uploadedFile,
      disableUploadBtn,
      uploadFile,
      deleteFile,
    };
  },
});
</script>

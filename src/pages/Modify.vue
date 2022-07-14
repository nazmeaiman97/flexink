<template>
  <q-page v-if="apiReady" class="items-center justify-evenly q-ma-lg">
    <div class="text-weight-bold q-pb-lg">Modify</div>
    <form @submit.prevent.stop="SaveChanges" class="q-gutter-md">
      <div class="row">
        <div class="col-2">Title</div>
        <div class="col-9">
          <q-input
            square
            outlined
            ref="titleRef"
            v-model="register.title"
            :rules="[(val) => !!val || 'Title is required']"
          />
        </div>
        <div class="col-2">Content</div>
        <div class="col-9">
          <q-input
            square
            outlined
            ref="contentRef"
            v-model="register.content"
            type="textarea"
            :rules="[(val) => !!val || 'Content is required']"
          />
        </div>
        <div class="col-2">Files</div>
        <div class="col-9">
          <div class="text-subtitle2" v-for="file in allFile" :key="file.id">
            <div class="row">
              {{
                'originalFilename' in file
                  ? file.originalFilename
                  : file.filename
              }}
              <q-icon
                @click="deleteFile(file.id)"
                name="delete"
                class="text-red q-mt-xs q-mb-xs q-ml-md"
                style="font-size: 1.2rem"
              />
            </div>
          </div>
          <div class="col-3" style="display: inline-flex">
            <q-file
              v-model="newFile"
              :disable="disableUploadBtn"
              label="Add files"
              outlined
              use-chips
              multiple
              append
              style="max-width: 300px"
            />
            <div class="q-ml-md q-mt-sm">
              <q-btn
                @click="uploadFileBtn"
                class="full-width"
                color="primary"
                :disable="newFile.length === 0 || disableUploadBtn"
                >Upload</q-btn
              >
            </div>
          </div>
          <div class="cols-3 q-pl-lg q-mt-sm"></div>
        </div>
      </div>
      <div class="row q-pt-lg">
        <q-btn
          type="submit"
          :disable="register.attachedFile.length === 0"
          class="full-width"
          color="primary"
          >Save
        </q-btn>
      </div>
    </form>
  </q-page>
</template>

<script lang="ts">
import { Register, FileDataType } from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'ModifyPage',
  components: {},
  setup() {
    const register = ref<Register>({
      id: 0,
      title: '',
      content: '',
      view: 0,
      attachedFile: {
        id: 0,
        attachedFileInfos: <Array<FileDataType>>[],
      },
    });
    const newFile = ref([]);
    const newUploadedFile = ref<Array<FileDataType>>([]);
    const tempDeleteFile = ref<Array<FileDataType>>([]);
    const allFile = ref<Array<FileDataType>>([]);
    const apiReady = ref<boolean>(false);
    const titleRef = ref<any>(null);
    const contentRef = ref<any>(null);
    const disableUploadBtn = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      getSinglePost();
    });

    const getSinglePost = () => {
      api.get(`/public/bbs/post/${route.params.id}`).then((response) => {
        register.value = response.data;
        allFile.value = response.data.attachedFile.attachedFileInfos;
        apiReady.value = true;
      });
    };

    const deleteFile = (id: number) => {
      allFile.value = allFile.value.filter((file) => {
        if (file.id === id) {
          tempDeleteFile.value.push(file);
        }
        return file.id !== id;
      });
    };

    const SaveChanges = () => {
      titleRef.value.validate();
      contentRef.value.validate();

      if (titleRef.value.hasError || contentRef.value.hasError) {
        return;
      } else if (register.value.attachedFile.attachedFileInfos.length === 0) {
        return;
      }

      //Check deleted file exist
      if (tempDeleteFile.value.length > 0) {
        tempDeleteFile.value.forEach((file) => {
          api.delete(
            `/public/bbs/post/file/${register.value.id}/${register.value.attachedFile.id}/${file.id}`
          );
        });
      }
      api
        .put(`public/bbs/post/${register.value.id}`, {
          title: register.value.title,
          content: register.value.content,
          attachedFile: {
            attachedFileInfos: newUploadedFile.value,
          },
        })
        .then(() => router.push('/bbs/list'));
    };

    const uploadFileBtn = () => {
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
        response.data.forEach((res: any) => {
          allFile.value.push(res);
          console.table(allFile.value);
          newUploadedFile.value.push(res);
        });
        disableUploadBtn.value = true;
      });
    };

    return {
      register,
      allFile,
      newFile,
      newUploadedFile,
      tempDeleteFile,
      deleteFile,
      uploadFileBtn,
      SaveChanges,
      disableUploadBtn,
      titleRef,
      contentRef,
      apiReady,
    };
  },
});
</script>

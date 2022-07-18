<template>
  <q-page v-if="apiReady" class="items-center justify-evenly q-ma-lg">
    <TitlePage title="BBS Register" />
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
          <div
            class="text-subtitle2"
            v-for="file in register.attachedFile.attachedFileInfos"
            :key="file.id"
          >
            <div class="row">
              {{ file.filename }}
              <q-icon
                @click="deleteFile(file.id)"
                name="delete"
                class="text-red q-mt-xs q-mb-xs q-ml-md"
                style="font-size: 1.2rem"
              />
            </div>
          </div>
          <div class="cols-3 q-mt-sm">
            <div>
              <UploadedFile title="New File" ref="uploadRef" />
            </div>
          </div>
        </div>
      </div>
      <div class="row q-pt-lg" style="place-content: center">
        <div class="cols-6 q-pr-lg">
          <q-btn color="negative" @click="deletePost()">Delete</q-btn>
        </div>
        <div class="cols-6">
          <q-btn type="submit" class="full-width" color="primary">Save </q-btn>
        </div>
      </div>
    </form>
  </q-page>
</template>

<script lang="ts">
import { Register, FileDataType } from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import UploadedFile from 'components/UploadedFile.vue';
import TitlePage from 'components/TitlePage.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ModifyPage',
  components: { UploadedFile, TitlePage },
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
    const tempDeleteFile = ref<Array<FileDataType>>([]);
    const apiReady = ref<boolean>(false);
    const titleRef = ref<any>(null);
    const contentRef = ref<any>(null);
    const uploadRef = ref<any>(null);
    const disableUploadBtn = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    onMounted(() => {
      getSinglePost();
    });

    const getSinglePost = () => {
      api.get(`/public/bbs/post/${route.params.id}`).then((response) => {
        register.value = response.data;
        apiReady.value = true;
      });
    };

    const deleteFile = (id: number) => {
      let currentFile = register.value.attachedFile.attachedFileInfos;
      register.value.attachedFile.attachedFileInfos = currentFile.filter(
        (file) => {
          if (file.id === id) {
            tempDeleteFile.value.push(file);
          }
          return file.id !== id;
        }
      );
    };

    const SaveChanges = () => {
      titleRef.value.validate();
      contentRef.value.validate();

      if (titleRef.value.hasError || contentRef.value.hasError) {
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
            attachedFileInfos: uploadRef.value.uploadedFile,
          },
        })
        .then(() => router.push('/bbs/list'));
    };

    const deletePost = () => {
      $q.notify({
        message: 'Are you sure want to delete this post?',
        color: 'white',
        textColor: 'negative',
        icon: 'delete',
        actions: [
          {
            label: 'Yes',
            color: 'negative',
            handler: () => {
              api
                .delete(`/public/bbs/post/${route.params.id}`)
                .then(() => router.push('/bbs/list'));
            },
          },
        ],
        closeBtn: 'Cancel',
      });
    };

    return {
      register,
      tempDeleteFile,
      deleteFile,
      SaveChanges,
      deletePost,
      disableUploadBtn,
      titleRef,
      contentRef,
      uploadRef,
      apiReady,
    };
  },
});
</script>

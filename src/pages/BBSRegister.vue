<template>
  <q-page class="items-center justify-evenly q-ma-lg">
    <TitlePage />
    <div class="text-weight-bold q-pb-lg">Register</div>
    <form @submit.prevent.stop="registerPost" class="q-gutter-md">
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

        <div>
          <UploadedFile title="File" ref="uploadRef" />
        </div>
      </div>
      <div class="row q-pt-lg">
        <q-btn type="submit" class="full-width" color="primary">Save </q-btn>
      </div>
    </form>
  </q-page>
</template>

<script lang="ts">
import { Register, FileDataType } from 'components/models';
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import UploadedFile from 'components/UploadedFile.vue';
import TitlePage from 'components/TitlePage.vue';

export default defineComponent({
  name: 'BBSRegisterPage',
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
    const titleRef = ref<any>(null);
    const contentRef = ref<any>(null);
    const uploadRef = ref<any>(null);
    const disableUploadBtn = ref<boolean>(false);
    const router = useRouter();
    const $q = useQuasar();

    const registerPost = () => {
      titleRef.value.validate();
      contentRef.value.validate();

      if (titleRef.value.hasError || contentRef.value.hasError) {
        return;
      } else if (uploadRef.value.uploadedFile.length === 0) {
        return $q.notify({
          message: 'Need to upload file before saving the post',
          icon: 'upload',
          color: 'negative',
        });
      }

      api
        .post('public/bbs/post?lang=en', {
          title: register.value.title,
          content: register.value.content,
          attachedFile: {
            attachedFileInfos: uploadRef.value.uploadedFile,
          },
        })
        .then(() => {
          router.push('/bbs/list');
        });
    };

    return {
      register,
      disableUploadBtn,
      titleRef,
      contentRef,
      uploadRef,
      registerPost,
    };
  },
});
</script>

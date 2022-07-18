<template>
  <q-page class="items-center justify-evenly q-ma-lg" v-if="apiReady">
    <TitlePage title="BBS View" />
    <q-card class="bg-white q-pa-xl">
      <div class="row item-center" style="display: flex; text-align: center">
        <div class="col-2 .text-subtitle1 q-pb-xl">Title</div>
        <div class="col-9 text-subtitle2">
          {{ register.title }}
        </div>
      </div>
      <q-separator class="q-mb-lg" />
      <div class="row" style="display: flex; text-align: center">
        <div class="col-2 .text-subtitle1 q-pb-xl">Content</div>
        <div class="col-9 text-subtitle2">
          {{ register.content }}
        </div>
      </div>
      <q-separator class="q-mb-lg" />
      <div class="row" style="display: flex; text-align: center">
        <div class="col-2 .text-subtitle1 q-pb-xl">Files</div>
        <div class="col-9">
          <div
            class="text-subtitle2"
            v-for="file in register.attachedFile.attachedFileInfos"
            :key="file.id"
          >
            <div class="row">
              <li class="col-12">
                <span
                  class="text-primary"
                  style="cursor: pointer"
                  href=""
                  @click="downloadFile(file.id)"
                >
                  {{ file.filename }}
                </span>
              </li>
            </div>
          </div>
        </div>
      </div>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" to="/bbs/list/">List</q-btn>
        <q-btn color="warning" :to="`/bbs/modify/${$route.params.id}`"
          >Modify</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Register, FileDataType } from 'components/models';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import TitlePage from 'components/TitlePage.vue';

export default defineComponent({
  name: 'ViewListPage',
  components: { TitlePage },
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
    const apiReady = ref<boolean>(false);
    const route = useRoute();

    onMounted(() => {
      getPost();
    });

    const getPost = () => {
      api.get(`/public/bbs/post/${route.params.id}`).then((response) => {
        register.value = response.data;
        apiReady.value = true;
      });
    };

    const downloadFile = (id: number) => {
      const postId = register.value.id;
      const fileId = register.value.attachedFile.id;
      const attachedFileInfos = register.value.attachedFile.attachedFileInfos;

      const filterInfoId = attachedFileInfos.filter((file: any) => {
        return file.id === id;
      });
      window.open(
        `http://public.flexink.com:9250/api/public/bbs/post/file/${postId}/${fileId}/${filterInfoId[0].id}?lang=en`,
        '_blank'
      );
    };

    return {
      register,
      apiReady,
      downloadFile,
    };
  },
});
</script>

<template>
  <q-page class="items-center justify-evenly q-ma-lg">
    <TitlePage />
    <div class="q-pa-md">
      <q-table
        title="List"
        :rows="postList"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        :table-style="
          'counter-reset: cssRowCounter ' +
          (startPage - 1) * pagination.rowsPerPage +
          ';'
        "
      >
        <template v-slot:body-cell-row-number="props">
          <q-td
            ><div>{{ props.value }}</div>
            <span class="rowNumber" />
          </q-td>
        </template>
        <template v-slot:body-cell-title="props">
          <q-td :props="props">
            <div>
              <span class="text-primary" style="cursor: pointer">
                {{ props.value }}
              </span>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn color="primary" size="xs" :to="`/bbs/view/${props.value}`"
              >View</q-btn
            >
          </q-td>
        </template>

        <template v-slot:bottom>
          <div class="row justify-center q-mt-md">
            <q-btn
              flat
              size="xs"
              @click="previousPage"
              :disable="startPage === 1"
              ><q-icon name="arrow_back"></q-icon
            ></q-btn>
            <q-select
              class="q-ma-lg"
              v-model="startPage"
              :options="pageNumberOption"
            ></q-select>
            <q-btn
              size="xs"
              flat
              @click="nextPage"
              :disable="startPage === totalPageNumber"
              ><q-icon name="arrow_forward"></q-icon
            ></q-btn>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
const columns = [
  {
    name: 'row-number',
    required: true,
    label: '#',
    align: 'left',
    sortable: false,
  },
  {
    name: 'title',
    align: 'center',
    label: 'Title',
    field: 'title',
    sortable: true,
  },
  { name: 'views', label: 'View', field: 'views', sortable: true },
  {
    name: 'action',
    align: 'right',
    label: 'Action',
    field: 'id',
    sortable: true,
  },
];

import { defineComponent, ref, onMounted, watch } from 'vue';
import { ListDataType } from 'components/models';
import { api } from 'boot/axios';
import TitlePage from 'components/TitlePage.vue';

export default defineComponent({
  name: 'BBSListPage',
  components: { TitlePage },

  setup() {
    const postList = ref<Array<ListDataType>>([]);
    const totalPostList = ref<number>(0);
    const pagination = ref({
      page: 1,
      sortBy: 'desc',
      descending: false,
      rowsPerPage: 10,
    });
    const startPage = ref<number>(1);
    const pageNumberOption = ref<Array<number>>([]);
    const totalPageNumber = ref<number>(0);

    onMounted(() => {
      getPostList(startPage.value);
    });

    const getPostList = (pageNumber: number) => {
      api
        .get('/public/bbs/post', {
          params: {
            pageNumber: pageNumber,
          },
        })
        .then((response) => {
          postList.value = response.data.data;
          totalPostList.value = response.data.count;
          totalPageNumber.value = Math.ceil(
            totalPostList.value / pagination.value.rowsPerPage
          );
          pageNumberOption.value = [];
          for (let i = 1; i <= totalPageNumber.value; i++) {
            pageNumberOption.value.push(i);
          }
        });
    };

    const previousPage = () => {
      startPage.value--;
    };

    const nextPage = () => {
      startPage.value++;
    };

    watch(startPage, (newValue) => {
      getPostList(newValue);
    });

    return {
      columns,
      postList,
      pagination,
      startPage,
      totalPageNumber,
      pageNumberOption,
      previousPage,
      nextPage,
      totalPostList,
    };
  },
});
</script>

<style scoped>
.rowNumber::before {
  counter-increment: cssRowCounter;
  content: counter(cssRowCounter) '. ';
}
</style>

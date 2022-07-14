<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Flexink App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <EssentialLink
          v-for="menu in menu"
          :key="menu.menuName"
          v-bind="menu"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title style="text-align-last: center">
          <p>Made by Nazme Aiman</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { api } from 'boot/axios';
import { menuDataType } from 'components/models';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const menu = ref<Array<menuDataType>>([]);

    onMounted(() => {
      api.get('/public/menu/hierarchy').then((response: any) => {
        menu.value = response.data;
      });
    });

    return {
      leftDrawerOpen,
      menu,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

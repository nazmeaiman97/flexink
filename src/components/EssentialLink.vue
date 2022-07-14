<template>
  <q-expansion-item expand-separator :label="menuName" :content-inset-level="1">
    <q-card v-for="(sub, index) in subMenus" :key="index">
      <q-item clickable :to="sub.url">
        <q-item-section>
          <q-item-label>{{ sub.menuName }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    menuName: {
      type: String,
      required: true,
    },
    subMenus: {
      type: Array,
      required: true,
    },
  },
});
</script>

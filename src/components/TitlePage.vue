<template>
  <h4 style="text-transform: capitalize">{{ title ? title : path }}</h4>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TitlePage',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  setup() {
    const route = useRoute();

    const path = computed(() => {
      let title = route.path.replace(/\//g, ' ').toLowerCase();
      return title.charAt(0).toUpperCase() + title.slice(1);
    });

    return {
      path,
    };
  },
});
</script>


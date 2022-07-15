<template>
  <q-card class="my-card">
    <q-card-section>
      <p style="text-transform: capitalize; text-align: center">
        {{ title ? title : path }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'EmptyContent',
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

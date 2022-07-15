<template>
  <q-page class="items-center justify-evenly q-ma-lg">
    <TitlePage />
    <EmptyContent />
  </q-page>
</template>

<script lang="ts">
import TitlePage from 'components/TitlePage.vue';
import EmptyContent from 'components/EmptyContent.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MemberRegisterPage',
  components: { TitlePage, EmptyContent },
});
</script>

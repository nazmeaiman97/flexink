<template>
  <div class="col-2">{{ subject }}</div>
  <div class="col-9">
    <q-input
      square
      :value="title"
      @input="$emit('update:title', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'InputComponent',
};
</script>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps(['title']);
defineEmits(['update:title']);
</script>

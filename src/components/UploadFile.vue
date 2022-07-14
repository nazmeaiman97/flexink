<template>
  <div class="col-3">
    <q-file
      :value="modelValue"
      @input="updateValue"
      :disable="disableUploadBtn"
      label="Pick files"
      outlined
      use-chips
      multiple
      append
      style="max-width: 300px"
    />
  </div>
  <div class="cols-3">
    <q-btn
      @click="uploadFileBtn"
      class="full-width"
      color="primary"
      :disable="disableUploadBtn"
      >Upload</q-btn
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UploadFile',
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    disableUploadBtn: {
      type: Boolean,
      required: true,
    },
    uploadFileBtn: {
      type: Function,
      required: true,
    },
  },
  setup(props, context) {
    const updateValue = (event: any) => {
      context.emit('input:modelValue', event.target.files[0].name);
    };
    return {
      updateValue,
    };
  },
});
</script>

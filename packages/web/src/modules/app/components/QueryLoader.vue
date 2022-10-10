<script setup lang="ts">
const props = defineProps<{ query: ReturnType<typeof useTrpcQuery> }>();

// eslint-disable-next-line vue/no-setup-props-destructure
const { isLoading, error, data, isSuccess } = props.query;
const isEmpty = computed(
  () =>
    (isSuccess.value && !data) ||
    (Array.isArray(data.value) && data.value.length === 0)
);
</script>

<template>
  <slot v-if="isLoading" name="loading">
    <UiCenter><UiSpinner text-6xl /></UiCenter>
  </slot>
  <slot v-else-if="error" name="error" :error="error">
    <div color-red-5 m-y-5>{{ error }}</div>
  </slot>

  <slot v-else-if="isEmpty" name="empty"><div>Empty</div></slot>

  <slot v-else-if="data" :data="data"></slot>
</template>

<style scoped></style>

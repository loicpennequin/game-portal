<script setup lang="ts">
const props = defineProps<{
  color: string;
  icon: string;
}>();
</script>

<template>
  <span
    p-2
    :bg="props.color"
    rounded-full
    aspect-square
    w-10
    flex
    items-center
    justify-center
  >
    <div :i-ui="icon" h-full w-full color="white dark:black" />
  </span>
</template>

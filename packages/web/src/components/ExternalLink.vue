<script setup lang="ts">
const props = defineProps<{ href: string }>();
</script>
<template>
  <a
    target="_blank"
    :href="props.href"
    underline
    color="blue-6 hover:blue-8"
    bg="focus-visible:blue-1"
    outline="focus:none"
  >
    Learn more
  </a>
</template>

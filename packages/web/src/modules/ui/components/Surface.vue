<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: string }>(), {
  as: 'div'
});
</script>

<template>
  <component :is="props.as" bg="white dark:dark-2" color="inherit" p="5">
    <slot />
  </component>
</template>

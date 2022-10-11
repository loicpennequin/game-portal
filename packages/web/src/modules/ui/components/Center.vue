<script setup lang="ts">
const props = withDefaults(defineProps<{ as?: any }>(), {
  as: 'div'
});
</script>
<template>
  <component :is="props.as" flex items-center justify-center h-full>
    <slot />
  </component>
</template>

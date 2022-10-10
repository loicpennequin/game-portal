<script setup lang="ts">
import { HtmlTag } from '~~/src/utils/types';

const props = withDefaults(defineProps<{ as?: HtmlTag }>(), {
  as: 'div'
});
</script>

<template>
  <component :is="props.as" bg="white dark:dark-2" color="inherit" p="5">
    <slot />
  </component>
</template>

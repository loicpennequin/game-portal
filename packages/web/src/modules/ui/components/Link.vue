<script setup lang="ts">
import { TypedRouteList } from '~~/src/generated';
import { TypedRouteLocationRaw } from '~~/src/generated/typed-router';

const props = defineProps<{
  to: TypedRouteLocationRaw<TypedRouteList>;
}>();
</script>
<template>
  <NuxtLink
    :to="props.to"
    color="sky-6 dark:sky-3 hover:sky-7 dark:hover:sky-2"
    underline
    prefetch
  >
    <slot />
  </NuxtLink>
</template>

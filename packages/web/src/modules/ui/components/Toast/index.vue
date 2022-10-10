<script setup lang="ts">
import UiLink from '../Link.vue';
import { TypedRouteLocationRaw } from '~~/src/generated/typed-router';
import { TypedRouteList } from '~~/src/generated';

const props = defineProps<{
  isOpened: boolean;
  colorScheme: string;
  icon: string;
  to?: TypedRouteLocationRaw<TypedRouteList>;
}>();

const emit = defineEmits<{
  (e: 'update:isOpened', value: boolean): void;
}>();

const color = computed(
  () => `${props.colorScheme}-5 dark:${props.colorScheme}-4`
);
</script>

<template>
  <UiSurface
    p="3"
    border-t="solid 8"
    :border-t-color="color"
    rounded="lg"
    outline="solid 1 black/10 dark:white/10"
    grid
    grid-cols="$cols"
    items-center
    gap-4
    style="--cols: auto 1fr auto"
    role="status"
  >
    <UiToastIcon :icon="props.icon" :color="color" />
    <component
      :is="props.to ? UiLink : 'div'"
      :to="props.to"
      color="inherit"
      no-underline
      @click="emit('update:isOpened', false)"
    >
      <slot />
    </component>

    <UiButtonIcon
      m-l-auto
      m-t="-2"
      icon="close"
      self-start
      title="close"
      @click="emit('update:isOpened', false)"
    />
  </UiSurface>
</template>

<script setup lang="ts">
import NuxtLink from '#app/components/nuxt-link';

const props = defineProps<{ leftIcon?: string; rightIcon?: string }>();
const attrs = useAttrs();

const is = computed(() => {
  if (attrs.to) return NuxtLink;
  if (attrs.href) return 'a';
  return 'button';
});
</script>

<template>
  <component
    :is="is"
    :cursor="!attrs.disabled && 'pointer'"
    select-none
    no-underline
    whitespace-nowrap
    align-middle
    p="x-0.75em y-0.5em"
    flex
    items-center
    gap-2
    justify-center
    font="semibold"
    rounded
    border="solid 1 transparent"
    outline="focus:none"
    ring="transparent focus-visible:brand-4 2"
    leading-none
  >
    <span
      v-if="props.leftIcon"
      i-ui="discord"
      block
      aspect-square
      text-lg
      aria-hidden="true"
    />
    <slot />
    <span
      v-if="props.rightIcon"
      :i-ui="props.rightIcon"
      block
      text-lg
      aspect-square
      aria-hidden="true"
    />
  </component>
</template>

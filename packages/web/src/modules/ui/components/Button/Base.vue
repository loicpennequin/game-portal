<script setup lang="ts">
const props = defineProps<{ leftIcon?: string; rightIcon?: string }>();
const attrs = useAttrs();

const is = computed(() => {
  if (attrs.to) return 'router-link';
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
    justify-center
    font="semibold"
    rounded
    border="solid 1 transparent"
    outline="focus:none"
    ring="transparent focus-visible:brand-4 2"
  >
    <span
      v-if="props.leftIcon"
      m-r="2"
      :m-l="-1"
      i-ui="discord"
      block
      aspect-square
      text-2xl
      aria-hidden="true"
    />
    <slot />
    <span
      v-if="props.rightIcon"
      m-l="2"
      :m-r="-1"
      :i-ui="props.rightIcon"
      block
      text-2xl
      aspect-square
      aria-hidden="true"
    />
  </component>
</template>

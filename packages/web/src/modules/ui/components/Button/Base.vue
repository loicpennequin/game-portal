<script setup lang="ts">
import NuxtLink from '#app/components/nuxt-link';

const props = defineProps<{
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
}>();
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
    p="x-1em y-0.75em"
    flex
    items-center
    gap-2
    justify-center
    font="semibold"
    rounded
    border="solid 1 transparent"
    outline="focus:none"
    ring="transparent focus-visible:sky-4 2"
    leading-none
  >
    <span
      v-if="props.leftIcon && !props.isLoading"
      :i-ui="props.leftIcon"
      block
      aspect-square
      text-lg
      aria-hidden="true"
    />
    <span grid items-center>
      <span
        col-start="1"
        col-end="-1"
        row-start="1"
        row-end="-1"
        flex
        justify-center
        :class="!isLoading && 'invisible'"
      >
        <UiSpinner text-2xl />
      </span>
      <span
        col-start="1"
        col-end="-1"
        row-start="1"
        row-end="-1"
        :class="isLoading && 'invisible'"
      >
        <slot />
      </span>
    </span>
    <span
      v-if="props.rightIcon && !props.isLoading"
      :i-ui="props.rightIcon"
      block
      text-lg
      aspect-square
      aria-hidden="true"
    />
  </component>
</template>

<script setup lang="ts">
import type { ButtonVariant } from './types';
import { useButtonGroupProvider } from './useButtonGroup';

type Props = { variant?: ButtonVariant; pill?: boolean };
const props = defineProps<Props>();

useButtonGroupProvider({
  variant: toRef(props, 'variant')
});
</script>

<template>
  <div
    flex
    items="center"
    justify="center"
    :rounded="
      props.pill
        ? `first:children:tl-full first:children:bl-full first:children:tr-0 first:children:br-0
           last:children:tr-full last:children:br-full last:children:tl-0 last:children:bl-0
           not-first:not-last:children:0`
        : 'not-first:not-last:children:0'
    "
  >
    <slot />
  </div>
</template>

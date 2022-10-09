<script setup lang="ts">
import { ButtonVariant } from '~~/src/modules/ui/utils/types';

const props = withDefaults(defineProps<{ variant?: ButtonVariant }>(), {
  variant: 'ghost'
});
</script>

<template>
  <UiButton
    :variant="props.variant"
    p="0"
    un-children="h-full block aspect-square"
    rounded="1/2"
  >
    <slot />
  </UiButton>
</template>

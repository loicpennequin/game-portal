<script setup lang="ts">
import { ButtonVariant } from '~~/src/modules/ui/utils/types';

const props = withDefaults(
  defineProps<{ variant?: ButtonVariant; icon: string }>(),
  {
    variant: 'ghost'
  }
);
</script>

<template>
  <UiButton :variant="props.variant" p="0" rounded="1/2">
    <span :i-ui="props.icon" inline-block />
  </UiButton>
</template>

<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue';
const modal = useModal();
const { title, closable, close } = modal;

const slotProps = useSlotProps(modal);
</script>

<template>
  <DialogTitle as="template">
    <UiSurface
      as="header"
      p="x-4 y-2"
      flex
      items-center
      justify-between
      sticky
      top-0
    >
      <slot v-bind="slotProps">
        <h2 text-xl leading-none>{{ title }}</h2>

        <UiButtonIcon
          v-if="closable"
          icon="close"
          title="close"
          @click="close"
        />
      </slot>
    </UiSurface>
  </DialogTitle>
</template>

<style scoped></style>

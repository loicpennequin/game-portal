<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';

const modal = useModal();
const { title } = modal;
const slotProps = useSlotProps(modal);
</script>

<template>
  <TransitionChild
    as="template"
    appear
    enter="duration-300 ease-out"
    enter-from="-translate-y-10 opacity-0"
    enter-to="-translate-y-0"
    leave="duration-200 ease-in"
    leave-from="-translate-y-0"
    leave-to="-translate-y-0 opacity-0"
  >
    <DialogPanel
      as="div"
      w="full"
      max-w="screen-md"
      w-full
      transform
      transition-all
      min-h-full
      overflow-y-auto
      m-t="20"
    >
      <UiSurface max-h="3/4" flex flex-col>
        <slot name="header" v-bind="slotProps">
          <UiModalHeader v-if="title" />
        </slot>

        <div flex-1 p-x-4>
          <slot v-bind="slotProps" />
        </div>

        <footer bg-inherit sticky bottom-0>
          <slot name="footer" v-bind="slotProps" />
        </footer>
      </UiSurface>
    </DialogPanel>
  </TransitionChild>
</template>

<style scoped></style>

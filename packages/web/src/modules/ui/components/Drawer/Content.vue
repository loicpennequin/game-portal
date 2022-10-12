<script setup lang="ts">
import { TransitionChild, DialogPanel } from '@headlessui/vue';

const drawer = useModal();
const { title } = drawer;
const slotProps = useSlotProps(drawer);

const slots = useSlots();
</script>

<template>
  <TransitionChild
    as="template"
    appear
    enter="duration-300 ease-out"
    enter-from="-translate-x-full"
    enter-to="-translate-x-0"
    leave="duration-200 ease-in"
    leave-from="-translate-x-0"
    leave-to="-translate-x-full"
  >
    <DialogPanel
      as="div"
      transition-transform
      w="full"
      max-w="md"
      transform
      transition-all
      min-h-full
      overflow-y-auto
    >
      <UiSurface min-h-full flex flex-col p="x-4 y-0">
        <slot name="header" v-bind="slotProps">
          <UiDrawerHeader v-if="title" />
        </slot>

        <div flex-1 p-x-4>
          <slot v-bind="slotProps" />
        </div>

        <footer v-if="slots.footer" bg-inherit sticky bottom-0>
          <slot name="footer" v-bind="slotProps" />
        </footer>
      </UiSurface>
    </DialogPanel>
  </TransitionChild>
</template>

<style scoped></style>

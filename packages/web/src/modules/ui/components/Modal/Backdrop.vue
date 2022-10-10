<script setup lang="ts">
import { TransitionChild } from '@headlessui/vue';
</script>
<template>
  <TransitionChild
    appear
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div fixed inset-0 bg="black/50" transition-opacity />
  </TransitionChild>
</template>

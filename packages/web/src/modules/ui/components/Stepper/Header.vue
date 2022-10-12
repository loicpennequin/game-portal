<script setup lang="ts">
import { Tab } from '@headlessui/vue';

const props = defineProps<{ index: number }>();
const { tabs, currentStep, selectedIndex } = useStepper();

const tab = computed(() => tabs.value[props.index]);
const isDisabled = computed(() => props.index > currentStep.value);

// const lineColor = computed(() =>
//   props.index > selectedIndex.value
//     ? 'gray-2 after:black dark:after:white'
//     : 'gray-2 after:sky-5 dark:after:sky-4'
// );
const markerColor = computed(() =>
  isDisabled.value
    ? 'inherit'
    : props.index > selectedIndex.value
    ? 'white dark:black'
    : 'white'
);
const markerBg = computed(() =>
  isDisabled.value
    ? 'transparent'
    : props.index > selectedIndex.value
    ? 'black dark:white'
    : 'sky-5'
);
</script>

<template>
  <Tab
    as="button"
    type="button"
    :disabled="isDisabled"
    flex
    items-center
    gap-2
    cursor-pointer
    color="inherit disabled:gray-4"
    p="2 l-0 lt-sm:r-0"
    rounded
    outline="focus:none"
    ring="transparent focus-visible:blue-4 2"
    bg="white dark:dark-2"
  >
    <span
      rounded-full
      block
      w-8
      aspect-square
      border-style="solid"
      border-width="1"
      :border="markerBg"
      flex
      items-center
      justify-center
      transition="colors"
      self
      duration="200"
      delay-200
      :bg="markerBg"
      :color="markerColor"
    >
      <span v-if="isDisabled && !tab.icon">
        {{ index + 1 }}
      </span>
      <span v-else :i-ui="isDisabled ? tab.icon : 'check'" />
    </span>
    <span lt-sm="hidden">{{ tab.label }}</span>
  </Tab>
</template>

<style scoped>
.line::after {
  content: '';
}
</style>

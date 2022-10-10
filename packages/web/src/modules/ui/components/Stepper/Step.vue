<script setup lang="ts">
import { TabPanel } from '@headlessui/vue';

const props = defineProps<{
  label: string;
  icon?: string;
}>();
const { addTab } = useStepper();

addTab({ label: props.label, icon: props.icon });
</script>

<template>
  <TabPanel :key="props.label">
    <slot />
  </TabPanel>
</template>

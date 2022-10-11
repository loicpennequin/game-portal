<script setup lang="ts">
import { TabGroup, TabList, TabPanels } from '@headlessui/vue';
const props = defineProps<{ currentStep: number; selectedIndex: number }>();
const emit = defineEmits<{
  (e: 'update:selectedIndex', payload: number): void;
}>();

const vModel = useVModel(props, 'selectedIndex', emit);
const { tabs } = useStepperProvider({
  currentStep: toRef(props, 'currentStep'),
  selectedIndex: vModel
});

const idx = computed(() => props.selectedIndex);

const headerElement = ref<HTMLElement>();
const currentStepWidth = computed(() => {
  if (!headerElement.value) return '';

  const boundary = [...headerElement.value.children][props.currentStep];
  const boundaryRect = boundary.getBoundingClientRect();
  const headerRect = headerElement.value.getBoundingClientRect();
  const width = Math.round(boundaryRect.left - headerRect.left);
  return `${width}px`;
});
const selectedIndexWidth = computed(() => {
  if (!headerElement.value) return '';

  const boundary = [...headerElement.value.children][props.selectedIndex];
  const boundaryRect = boundary.getBoundingClientRect();
  const headerRect = headerElement.value.getBoundingClientRect();
  const width = Math.round(boundaryRect.left - headerRect.left);
  return `${width}px`;
});
</script>

<template>
  <div>
    <TabGroup
      :selected-index="idx"
      @change="emit('update:selectedIndex', $event)"
    >
      <TabList>
        <slot name="header" :tabs="tabs">
          <nav
            ref="headerElement"
            flex
            items-center
            justify-between
            m-b-3
            relative
          >
            <UiStepperHeader
              v-for="(tab, index) in tabs"
              :key="index"
              isolate
              z="1"
              :index="index"
            />
            <div
              h="3px"
              absolute
              inset-y
              left-0
              w-full
              bg="gray-3"
              :un-before="`absolute left-0 top -0 h-full bg-black dark:bg-white transition-all duration-300`"
              :un-after="`absolute left-0 top -0 h-full bg-sky-5 transition-all duration-300`"
              class="progress-bar"
            />
          </nav>
        </slot>
      </TabList>

      <TabPanels>
        <slot />
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped>
.progress-bar {
  --completed-width: v-bind('currentStepWidth');
  --selected-width: v-bind('selectedIndexWidth');
}
.progress-bar::before {
  content: '';
  width: var(--completed-width);
}
.progress-bar::after {
  content: '';
  width: var(--selected-width);
}
</style>

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

const headerCols = computed(() => {
  const cols = Array.from({ length: tabs.value.length })
    .fill(['auto', '1fr'])
    .flat()
    .slice(0, -1)
    .join('_');

  return `[${cols}]`;
});

const idx = computed(() => props.selectedIndex);
</script>

<template>
  <div>
    <TabGroup
      :selected-index="idx"
      @change="emit('update:selectedIndex', $event)"
    >
      <TabList>
        <slot name="header" :tabs="tabs">
          <nav grid :grid-cols="headerCols" m-b-3>
            <UiStepperHeader
              v-for="(tab, index) in tabs"
              :key="index"
              :index="index"
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

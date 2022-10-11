<script setup lang="ts">
import { Placement } from '@floating-ui/dom';
import { getFocusableChildren } from '~~/src/modules/ui/utils/dom-helpers';

const props = defineProps<{
  isOpened: boolean;
  toggleLabel?: string;
  placement?: Placement;
}>();
const emit = defineEmits<{
  (e: 'update:isOpened', value: string): void;
}>();

const toggleContainerNode = ref<HTMLElement>();
const isOpened = useVModel(props, 'isOpened', emit);

const { close, toggleNode, toggle } = useDropdownProvider(isOpened, {
  placement: props.placement
});

watchEffect(() => {
  toggleNode.value = getFocusableChildren(toggleContainerNode.value)[0];
});

const dropdownNode = ref<HTMLElement>();
onClickOutside(dropdownNode, () => close());
</script>

<template>
  <div ref="dropdownNode">
    <div ref="toggleContainerNode">
      <slot name="toggle" :on="{ click: toggle }">
        <UiButton variant="ghost" right-icon="chevron-down" @click="toggle">
          {{ toggleLabel }}
        </UiButton>
      </slot>
    </div>
    <UiDropdownMenu ref="popperNode">
      <!-- <slot name="menu" /> -->
      <slot name="menu" />
    </UiDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { TransitionRoot, Dialog } from '@headlessui/vue';
import { Maybe } from '~~/src/utils/types';

type Props = {
  isOpened: boolean;
  closable?: boolean;
  title?: Maybe<string>;
};

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  title: undefined
});
const emit = defineEmits<{ (e: 'update:isOpened', val: boolean): void }>();

const vModel = useVModel(props, 'isOpened', emit);

const containerEl = ref<HTMLElement>();

useModalProvider({
  isOpened: vModel,
  closable: toRef(props, 'closable'),
  title: toRef(props, 'title')
});
</script>

<template>
  <ClientOnly>
    <TransitionRoot appear :show="vModel" as="template">
      <Dialog
        as="div"
        relative
        z-10
        :static="!closable"
        @close="vModel = false"
      >
        <div
          ref="containerEl"
          fixed
          inset-0
          overflow-y-auto
          grid
          justify-items-center
          un-children="col-start-1 row-start-1"
        >
          <slot />
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>

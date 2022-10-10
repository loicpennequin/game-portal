<script setup lang="ts">
import { Maybe } from '~~/src/utils/types';

type Props = {
  modelValue: Maybe<Blob[]>;
  isLoading?: boolean;
  id: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  label?: string;
};

const props = withDefaults(defineProps<Props>(), {
  label: 'Select or drop a file',
  accept: undefined
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const inputRef = ref<HTMLInputElement>();

const openFilePicker = () => {
  // ...sorry
  inputRef.value?.click();
};

const onDrop = (files: File[] | null) => {
  if (!files) return;
  vModel.value = files;
};

const onInputChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;

  const result: Blob[] = [];
  for (let i = 0; i < files.length; i++) {
    result.push(files[i]);
  }
  vModel.value = result;
};

const dropZoneRef = ref<HTMLElement>();
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <div ref="dropZoneRef">
    <slot :open-file-picker="openFilePicker">
      <UiButton
        v-bind="isOverDropZone && { bg: 'gray-5 dark:sky-5' }"
        :id="props.id"
        left-icon="file-upload"
        type="button"
        :disabled="props.disabled"
        :is-loading="props.isLoading"
        @click="openFilePicker"
        @keyup.enter="openFilePicker"
      >
        {{ props.label }}
      </UiButton>
    </slot>
    <input
      :id="props.id"
      ref="inputRef"
      type="file"
      sr-only
      w="1px!"
      tabindex="-1"
      :disabled="props.disabled"
      :multiple="props.multiple"
      :accept="props.accept"
      @change="onInputChange"
    />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "label": "Select or drop a file"
  },
  "fr": {
    "label": "Sélectionner ou déposez un fichier"
  }
}
</i18n>

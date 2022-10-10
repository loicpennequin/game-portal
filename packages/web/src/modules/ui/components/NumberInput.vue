<script setup lang="ts">
import { Maybe } from '~~/src/utils/types';

const props = defineProps<{
  name: string;
  id: string;
  modelValue: Maybe<string>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
</script>

<template>
  <UiTextInput
    v-model.number="vModel"
    :id="props.id"
    :name="props.name"
    type="number"
  />
</template>

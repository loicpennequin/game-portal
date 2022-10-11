<script setup lang="ts">
import { pick } from 'lodash-es';
import { Maybe } from '~~/src/utils/types';

type Props = {
  modelValue: Maybe<string>;
  name?: Maybe<string>;
  type?: string;
  id: string;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  leftIcon: undefined,
  rightIcon: undefined,
  name: undefined
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);

const slots = useSlots();
const attrs = useAttrs();
const inputHTMLAttrs = computed(
  () =>
    pick(attrs, [
      'placeholder',
      'min',
      'max',
      'minlength',
      'maxlength',
      'pattern',
      'required'
    ]) as any
);
</script>

<template>
  <div
    flex
    items-center
    gap="0"
    :bg="props.disabled ? 'light-6 dark:dark-2' : 'light-3 dark:dark-3'"
    border="solid 1 gray-4/60  dark:dark-9 focus-within:sky-4"
    rounded
    overflow-hidden
  >
    <div v-if="slots.left || props.leftIcon" m-l-2 self-stretch>
      <slot name="left">
        <div :i-ui="props.leftIcon" text-xl />
      </slot>
    </div>
    <input
      v-model="vModel"
      :id="props.id"
      :name="props.name"
      :type="props.type"
      flex-1
      bg-inherit
      color-inherit
      p="x-3 y-2"
      :disabled="props.disabled"
      outline="focus:none"
      min-w="0"
      v-bind="inputHTMLAttrs"
    />

    <div v-if="slots.right || props.rightIcon" m-r-2 self-stretch>
      <slot name="right">
        <div :i-ui="props.rightIcon" text-xl />
      </slot>
    </div>
  </div>
</template>

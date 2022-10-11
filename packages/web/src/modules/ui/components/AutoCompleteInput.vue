<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption
} from '@headlessui/vue';

type Props = {
  modelValue: string;
  options: string[];
  name?: string;
  id: string;
  allowMissing?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  allowMissing: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

const vModel = useVModel(props, 'modelValue', emit);
const query = ref(props.modelValue);

const isQueryMatching = computed(() =>
  props.options.some(
    option =>
      option.split(' ').join('').toLowerCase() ===
      query.value.split(' ').join('').toLowerCase()
  )
);

const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter(option =>
        option
          .split(' ')
          .join('')
          .toLowerCase()
          .includes(query.value.split(' ').join('').toLowerCase())
      )
);
</script>

<template>
  <Combobox v-model="vModel" relative as="div">
    <ComboboxInput
      :id="props.id"
      :name="props.name"
      :bg="$attrs.disabled ? 'light-6 dark:dark-2' : 'light-3 dark:dark-3'"
      border="solid 1 gray-4/60  dark:dark-9 focus-within:sky-5"
      rounded
      bg-inherit
      color-inherit
      p="x-3 y-2"
      w-full
      :disabled="$attrs.disabled"
      outline="focus:none"
      min-w="0"
      autocomplete="off"
      @change="query = $event.target.value"
    />
    <ComboboxOptions>
      <UiSurface
        p="0"
        absolute
        z-1
        top-full
        left-0
        w-full
        rounded
        border="solid 1 light-8 dark:dark-4"
      >
        <ComboboxOption
          v-for="option in filteredOptions"
          v-slot="{ selected, active }"
          :key="option"
          :value="option"
          as="template"
        >
          <li
            p="x-3 y-1"
            :bg="active || selected ? 'sky-5 ' : 'hover:sky-5'"
            :color="active || selected ? 'white' : 'hover:white'"
            :font="(active || selected) && 'bold'"
            cursor-default
          >
            <slot name="option" :option="option" :query="query">
              {{ option }}
            </slot>
          </li>
        </ComboboxOption>

        <ComboboxOption
          v-if="props.allowMissing && !isQueryMatching && query !== ''"
          v-slot="{ selected, active }"
          :value="query"
          as="template"
        >
          <li
            p="x-3 y-1"
            :bg="active || selected ? 'sky-5' : 'hover:sky-5'"
            :color="active || selected ? 'white' : 'hover:white'"
            :font="(active || selected) && 'bold'"
            cursor-default
            border-t="solid 1 black/30 dark:white/30"
          >
            <slot name="missing" :query="query">
              No result for {{ query }} (add new)
            </slot>
          </li>
        </ComboboxOption>
      </UiSurface>
    </ComboboxOptions>
  </Combobox>
</template>

<style scoped></style>

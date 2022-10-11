<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue: string; autoResize?: boolean }>(),
  { autoResize: true }
);
const emit = defineEmits(['update:modelValue']);

const shadowRef = ref<HTMLTextAreaElement>();
const inputSize = ref('auto');
const resize = () => {
  if (props.autoResize) {
    inputSize.value = `${shadowRef.value?.scrollHeight}px`;
  }
};

const vModel = useVModel(props, 'modelValue', emit);

onMounted(() => {
  resize();
});
watch(vModel, () => {
  resize();
});
</script>

<template>
  <div grid>
    <textarea
      v-model="vModel"
      bg="light-2 dark:dark-3"
      border="solid 1 gray-4/60  dark:dark-9 focus-within:sky-4"
      :style="{ minHeight: inputSize }"
      v-bind="$attrs"
      p="x-3 y-2"
      resize-none
      w-full
      overflow-hidden
      outline="focus:none"
      @input="resize"
    />
    <div
      ref="shadowRef"
      class="shadow"
      w-full
      absolute
      min-h="1rem"
      pointer-events-none
      opacity-0
      p="x-3 y-2"
      left-0
      top-0
      m-0
      whitespace-pre-wrap
    >
      {{ vModel }}
    </div>
  </div>
</template>

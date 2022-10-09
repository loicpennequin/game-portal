<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean;
  id: string;
}>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const vModel = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const attrs = useAttrs();
</script>

<template>
  <div
    flex
    gap="2"
    items-center
    outline="3 solid transparent focus-within:blue-4"
    p="1"
    rounded="full"
    text-xs
    :title="(attrs.ariaLabel as string)"
  >
    <input
      v-model="vModel"
      :id="props.id"
      :aria-label="(attrs.ariaLabel as string)"
      sr-only
      type="checkbox"
    />
    <slot name="off" />
    <label
      border="solid 1 gray-400 dark:gray-500"
      cursor-pointer
      :for="props.id"
      h="5"
      p-x="1"
      relative
      rounded-full
      un-after="absolute top-0  w-4 h-4 rounded-full bg-dark-2 dark:bg-blue-5  duration-200"
      w="10"
    />
    <slot name="on" />
  </div>
</template>

<style scoped>
label::after {
  content: '';
  margin-top: 1px;
  margin-left: 1px;
}

input[type='checkbox']:not(:checked) ~ label:after {
  left: 0;
}

input[type='checkbox']:checked ~ label:after {
  left: calc(100% - 18px);
}
</style>

<script setup lang="ts">
import type { Component } from 'vue';
import ButtonFull from './Full.vue';
import ButtonOutlined from './Outlined.vue';
import ButtonGhost from './Ghost.vue';
import { ButtonVariant } from '~~/src/modules/ui/utils/types';

type Props = {
  variant?: ButtonVariant;
};

const props = withDefaults(defineProps<Props>(), {
  variant: undefined
});

const variantMap = new Map<ButtonVariant, Component>([
  ['full', ButtonFull],
  ['outlined', ButtonOutlined],
  ['ghost', ButtonGhost]
]);

const buttonGroup = useButtonGroup();
const _variant = computed(
  () => props.variant ?? buttonGroup.variant.value ?? 'full'
);

const is = computed(() => variantMap.get(_variant.value));
</script>

<template>
  <component :is="is">
    <template #left><slot name="left" /></template>
    <slot />
    <template #right><slot name="right" /></template>
  </component>
</template>

<script setup lang="ts">
import { useColorScheme } from '@/utils/composables';
import type { VueInstance } from '@vueuse/core';

const el = ref<VueInstance>();
const cs = useColorScheme(el);

const LIGHT_SCHEMES = ['yellow', 'lime', 'cyan'];
</script>
<template>
  <DButtonBase
    ref="el"
    :bg="
      LIGHT_SCHEMES.includes(cs || '')
        ? 'context-4 hover:context-5 focus-visible:context-6 dark:hover:context-5 dark:focus-visible:context-6'
        : 'context-6 hover:context-7 focus-visible:context-8 dark:hover:context-5 dark:focus-visible:context-4'
    "
    :color="
      LIGHT_SCHEMES.includes(cs || '')
        ? 'readable-4 hover:readable-5 focus-visible:readable-6 dark:hover:readable-5 dark:focus-visible:readable-6'
        : 'readable-6 hover:readable-7 focus-visible:readable-8 dark:hover:readable-5 dark:focus-visible:readable-4'
    "
    un-disabled="bg-gray-2 color-gray-7"
  >
    <slot />
  </DButtonBase>
</template>

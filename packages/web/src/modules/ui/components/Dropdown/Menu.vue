<script setup lang="ts">
const api = useDropdown();

const { menuNode, isOpened, placement } = api;
const translateClass = computed(() => {
  if (placement.includes('top')) return 'translate-y-5';
  if (placement.includes('bottom')) return '-translate-y-5';
  if (placement.includes('left')) return 'translate-x-5';
  if (placement.includes('right')) return '-translate-x-5';
  return '';
});
</script>

<template>
  <ClientOnly>
    <div v-if="isOpened" ref="menuNode" z-10 absolute>
      <transition
        appear
        enter-active-class="transition-all duration-200"
        leave-active-class="transition-all duration-200"
        :enter-from-class="`${translateClass} opacity-0`"
        :leave-to-class="`${translateClass} opacity-0`"
      >
        <UiSurface p="0" rounded border="solid 1 light-8 dark:dark-4">
          <slot v-bind="api" />
        </UiSurface>
      </transition>
    </div>
  </ClientOnly>
</template>

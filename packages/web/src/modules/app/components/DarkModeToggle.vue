<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed({
  get: () => colorMode.preference === 'dark',
  set: val => {
    document.body.classList.add('color-mode--animating');
    colorMode.preference = val ? 'dark' : 'light';

    function cleanup() {
      document.body.classList.remove('color-mode--animating');
      document.body.removeEventListener('transitionend', cleanup);
    }
    document.body.addEventListener('transitionend', cleanup);
  }
});
</script>

<template>
  <UiSwitchInput
    v-model="isDarkMode"
    id="dark-mode-toggle"
    aria-label="dark mode"
  >
    <template #off>
      <div fill="dark:white" i-mdi-white-balance-sunny />
    </template>
    <template #on><div fill="dark:white" i-mdi-weather-night /></template>
  </UiSwitchInput>
</template>

<style>
body.color-mode--animating,
body.color-mode--animating * {
  --at-apply: 'transition-colors duration-200';
}
</style>

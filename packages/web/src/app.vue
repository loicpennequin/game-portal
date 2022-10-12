<script setup lang="ts">
useHead({
  title: 'Game Portal',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
  meta: [
    { name: 'description', content: 'The place where the cool kids play games' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class:
      'bg-light-7 dark:bg-dark-3 color-black dark:color-white font-sans min-h-screen cs-blue'
  }
});

usePagePreloader();
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToastBar />
  <UserOnboardingModal />
</template>

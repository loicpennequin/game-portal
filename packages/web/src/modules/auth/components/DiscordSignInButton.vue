<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const isDiscordEnabled = computed(
  () => !!runtimeConfig.public.discordAuthorizeUrl
);

const isWarningDisplayed = computed(
  () => import.meta.env.DEV && !isDiscordEnabled
);
</script>

<template>
  <p v-if="isWarningDisplayed" color-red-4>
    Discord Auth not configured in your local environment
  </p>

  <UiButton
    v-else
    :href="runtimeConfig.public.discordAuthorizeUrl"
    bg="#5865F2 hover:#424dbd focus-visible:#3f48a6"
    left-icon="discord"
  >
    Sign in with Discord
  </UiButton>
</template>

<script setup lang="ts">
import { gameDetailLoader } from '~~/src/modules/game/loaders/game-detail.loader';

definePageMeta({
  loader: gameDetailLoader
});

const { game } = gameDetailLoader.load();
</script>

<template>
  <UiContainer>
    <UiSurface>
      <AppQueryLoader v-slot="{ data }" :query="game">
        <h1 text-3xl font-bold>{{ data.name }}</h1>
        <p>by {{ data.author.username }}</p>
        <pre>{{ data }}</pre>
      </AppQueryLoader>
    </UiSurface>
  </UiContainer>
</template>

<style scoped></style>

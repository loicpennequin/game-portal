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
        <h1>{{ data.name }}</h1>
        <p>by {{ data.author.username }}</p>

        <iframe :src="data.url" w-full h-screen border="solid 1 black" />
      </AppQueryLoader>
    </UiSurface>
  </UiContainer>
</template>

<style scoped></style>

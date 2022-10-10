<script setup lang="ts">
enum Types {
  All,
  Multiplayer
}

const selectedType = ref(Types.All);

const gameTypes = [
  {
    title: 'All Game',
    type: Types.All
  },
  {
    title: 'Multiplayer',
    type: Types.Multiplayer
  }
];
</script>

<template>
  <UiContainer>
    <UiSurface space-y-5>
      <h1 text-xl inline-block m-r-3 mb-4>Browse for Games</h1>

      <section flex>
        <aside b-r="solid 1 gray-4 dark:gray-6" p-x-10>
          <ul space-y-1>
            <li v-for="gameType in gameTypes" :key="gameType.title">
              <UiButton
                w-full
                variant="ghost"
                :color="selectedType === gameType.type ? 'red-400' : ''"
                @click="selectedType = gameType.type"
              >
                {{ gameType.title }}
              </UiButton>
            </li>
          </ul>
        </aside>
        <UiSurface as="section">
          <section>YAY SOME GAMES</section>
        </UiSurface>
      </section>
    </UiSurface>
  </UiContainer>
</template>

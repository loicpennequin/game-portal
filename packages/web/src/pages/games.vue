<script setup lang="ts">
const { data: session } = useTrpcQuery(['auth.session']);

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
  <UiSurface space-y-5>
    <div v-if="session">
      <h1 text-xl inline-block m-r-3 mb-4>Browse for Games</h1>

      <section flex>
        <aside px-10>
          <ul>
            <li
              v-for="gameType in gameTypes"
              :key="gameType.title"
              my-4
              cursor-pointer
              :color="selectedType === gameType.type ? 'red-400' : ''"
              @click="selectedType = gameType.type"
            >
              {{ gameType.title }}
            </li>
          </ul>
        </aside>
        <section>YAY SOME GAMES</section>
      </section>
    </div>
  </UiSurface>
</template>

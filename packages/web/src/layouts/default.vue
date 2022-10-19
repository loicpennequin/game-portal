<script setup lang="ts">
const { data: session } = useSession();
</script>
<template>
  <div v-if="!session" min-h="screen" grid grid-rows="[auto_1fr_auto]">
    <AppHeader />

    <main p-t-5>
      <slot />
    </main>

    <AppFooter />
  </div>

  <div
    v-else
    min-h="screen"
    grid
    grid-rows="[auto_1fr_auto]"
    grid-cols="[auto_1fr_auto]"
  >
    <AppHeader col-start="1" col-end="-1" />

    <main p-t-5 col-start="2">
      <slot />
    </main>

    <aside col-start="3" lt-md="hidden">
      <UiSurface h-full>Friends List</UiSurface>
    </aside>

    <AppFooter col-start="1" col-end="-1" />
  </div>
</template>

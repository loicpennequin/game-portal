<template>
  <div>
    <div min-h="screen" grid class="grid-rows-[auto_1fr_auto]">
      <AppHeader />

      <main>
        <slot />
      </main>

      <AppFooter />
    </div>
  </div>
</template>

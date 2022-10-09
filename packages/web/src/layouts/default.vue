<template>
  <div>
    <div min-h="screen" grid class="grid-rows-[auto_1fr_auto]">
      <AppHeader />

      <UiContainer>
        <slot />
      </UiContainer>

      <AppFooter />
    </div>
  </div>
</template>

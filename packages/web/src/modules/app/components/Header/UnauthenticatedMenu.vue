<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <nav>
    <ul flex items-center gap-3>
      <li>
        <UiButton variant="ghost" :to="{ name: routes.games }">Games</UiButton>
      </li>
      <li>
        <UiButton variant="ghost" :to="{ name: routes.login }">
          Sign in / register
        </UiButton>
      </li>
      <li><AppDarkModeToggle /></li>
    </ul>
  </nav>
</template>

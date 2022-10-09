<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <nav>
    <ul flex items-center gap-3>
      <li><AppDarkModeToggle /></li>
      <li>
        <UiButton variant="ghost" :to="{ name: routes.login }">
          Sign in / register
        </UiButton>
      </li>
    </ul>
  </nav>
</template>

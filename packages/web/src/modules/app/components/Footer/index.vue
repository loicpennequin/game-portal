<script setup lang="ts">
const { routes } = useTypedRouter();
</script>

<template>
  <UiSurface as="footer" p="3">
    <UiContainer flex justify-between flex-wrap>
      <div flex gap-5 flex-wrap text="children:center">
        <NuxtLink
          :to="{
            name: routes.index
          }"
        >
          Terms of Service
        </NuxtLink>
        <NuxtLink
          :to="{
            name: routes.index
          }"
        >
          Privacy Policy
        </NuxtLink>
        <NuxtLink
          :to="{
            name: routes.index
          }"
        >
          cookies
        </NuxtLink>
      </div>
      <div grow="1 md:0">
        © 2022 Daria aka "CEO of based", All rights reserved or you go to gulag.
      </div>
    </UiContainer>
  </UiSurface>
</template>

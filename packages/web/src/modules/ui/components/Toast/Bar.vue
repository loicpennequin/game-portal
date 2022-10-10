<script setup lang="ts">
const { toasts, clear } = useToast();
</script>

<template>
  <div fixed z-10 bottom-10 w-full flex flex-col gap-5 items-center>
    <transition-group
      move-class="transition-all duration-300"
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="translate-y-1/2 opacity-0"
      leave-to-class="translate-y-1/2 opacity-0"
      appear
    >
      <UiToast
        v-for="toast in toasts"
        :key="toast.id"
        :color-scheme="toast.colorScheme"
        :icon="toast.icon"
        is-opened
        :to="toast.link"
        w-30rem
        @update:is-opened="clear(toast.id)"
      >
        <div>
          <strong>{{ toast.title }}</strong>
          <div min-h-1rem>
            {{ toast.text }}
          </div>
        </div>
      </UiToast>
    </transition-group>
  </div>
</template>

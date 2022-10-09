<script setup lang="ts">
import { throttle } from 'lodash-es';
// import ConnectedMenu from './ConnectedMenu.vue';
// import DisconnectedMenu from './DisconnectedMenu.vue';

// const currentUser = useCurrentUser();

// const menuComponent = computed(() =>
//   currentUser.value ? ConnectedMenu : DisconnectedMenu
// );

const isCollapsed = ref(false);
const COLLAPSE_SCROLL_THRESHOLD = 100;
onMounted(() => {
  let prevScrollY = window.scrollY;
  useEventListener(
    'scroll',
    throttle(
      () => {
        const diff = window.scrollY - prevScrollY;
        if (Math.abs(diff) >= COLLAPSE_SCROLL_THRESHOLD) {
          isCollapsed.value = window.scrollY >= prevScrollY;
        }
        prevScrollY = window.scrollY;
      },
      200,
      { leading: true }
    )
  );
});
</script>

<template>
  <UiSurface
    as="header"
    p="0"
    sticky
    top-0
    z-1
    transition-transform
    duration-300
    :class="isCollapsed && '-translate-y-full'"
    @focusin="isCollapsed = false"
  >
    <UiContainer flex justify-between gap-4 p="y-3 x-5">
      <h1 font-bold text-xl>Game Portal</h1>

      <AppDarkModeToggle />
    </UiContainer>
  </UiSurface>
</template>

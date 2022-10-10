<script setup lang="ts">
import { throttle } from 'lodash-es';

const { data: session, suspense } = useTrpcQuery(['auth.session']);

onServerPrefetch(async () => {
  try {
    await suspense();
  } catch {}
});

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
const { routes } = useTypedRouter();
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
    <UiContainer flex justify-between items-center gap-4 p="y-3 x-5">
      <NuxtLink :to="{ name: routes.index }" font-bold text-xl>
        Game Portal
      </NuxtLink>

      <AppHeaderAuthenticatedMenu v-if="session" />
      <AppHeaderUnauthenticatedMenu v-else />
    </UiContainer>
  </UiSurface>
</template>

<script setup lang="ts">
const { data, suspense } = useTrpcQuery(['things.getThings']);

onServerPrefetch(async () => {
  try {
    await suspense();
  } catch {}
});
</script>

<template>
  <div>{{ data }}</div>
</template>

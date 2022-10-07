<script setup lang="ts">
const { data, suspense } = useTrpcQuery(['things.getThings']);

onServerPrefetch(async () => {
  try {
    await suspense();
  } catch {}
});

const { mutate } = useTrpcMutation('things.sendMail');
</script>

<template>
  <div>{{ data }}</div>
  <button bg-blue-3 p-3 @click="mutate(null)">Test mailing</button>
</template>

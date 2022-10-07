<script setup lang="ts">
const route = useRoute();
const { router, routes } = useTypedRouter();
const { mutate, isSuccess, error } = useTrpcMutation(
  'auth.oneTimePasswordSignin',
  {
    onSuccess() {
      router.push({ name: routes.index });
    }
  }
);

onMounted(() => {
  if (route.query.token && typeof route.query.token === 'string') {
    mutate({ token: route.query.token });
  }
});
</script>

<template>
  <div>
    <div v-if="error" color-red-6>{{ error }}</div>
    <div v-else-if="isSuccess" colof-green-6>You're logged in</div>
    <div v-else>Authenticating you...</div>
  </div>
</template>

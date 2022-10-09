<script setup lang="ts">
const route = useRoute();
const { router, routes } = useTypedRouter();
const jwtStore = useJwtStore();

const { mutate: otpSignIn, error: otpError } = useTrpcMutation(
  'auth.oneTimePasswordSignin',
  {
    onSuccess(data) {
      jwtStore.jwt = data.accessToken;
      router.push({ name: routes.index });
    }
  }
);

const { mutate: discordSignIn, error: discordError } = useTrpcMutation(
  'auth.discordSignin',
  {
    onSuccess(data) {
      jwtStore.jwt = data.accessToken;
      router.push({ name: routes.index });
    }
  }
);

const error = computed(() => otpError.value || discordError.value);

onMounted(() => {
  if (route.query.token && typeof route.query.token === 'string') {
    otpSignIn({ token: route.query.token });
  } else if (route.query.code && typeof route.query.code === 'string') {
    discordSignIn({ code: route.query.code });
  }
});
</script>

<template>
  <div>
    <div v-if="error" color-red-6>{{ error }}</div>

    <div v-else>Authenticating you...</div>
  </div>
</template>

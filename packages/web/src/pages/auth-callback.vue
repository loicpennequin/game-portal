<script setup lang="ts">
const route = useRoute();
const { router, routes } = useTypedRouter();
const jwtStore = useJwtStore();
const { refetch: refetchSession } = useTrpcQuery(['auth.session']);

const onSuccess = ({ accessToken }: { accessToken: string }) => {
  jwtStore.jwt = accessToken;
  refetchSession();
  router.push({ name: routes.index });
};

const { mutate: otpSignIn, error: otpError } = useTrpcMutation(
  'auth.oneTimePasswordSignin',
  {
    onSuccess
  }
);

const { mutate: discordSignIn, error: discordError } = useTrpcMutation(
  'auth.discordSignin',
  {
    onSuccess
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
  <UiContainer h-full grid place-content-center gap-3>
    <UiSpinner text-7xl m-x-auto />
    <p v-if="error" color="red-6 dark:red-2" text-lg font-bold>{{ error }}</p>
    <p v-else text-lg>Signing you in...</p>
  </UiContainer>
</template>

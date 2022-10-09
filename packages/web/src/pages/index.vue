<script setup lang="ts">
const { data: session, refetch, suspense } = useTrpcQuery(['auth.session']);
const jwtStore = useJwtStore();

onServerPrefetch(async () => {
  try {
    await suspense();
  } catch {}
});

const email = ref('');
const {
  mutate: signInWithEmail,
  isSuccess,
  error
} = useTrpcMutation('auth.emailSignin');

const username = ref('');
const { mutate: setUsername } = useTrpcMutation('user.onboarding', {
  onSuccess() {
    refetch();
  }
});

const { mutate: signOff } = useTrpcMutation('auth.logout', {
  onSuccess() {
    jwtStore.jwt = null;
    refetch();
  }
});

const runtimeConfig = useRuntimeConfig();
const isDiscordEnabled = computed(
  () => !!runtimeConfig.public.discordAuthorizeUrl
);
</script>

<template>
  <UiSurface space-y-5>
    <div v-if="session">
      <h1 text-xl inline-block m-r-3>
        Hello, {{ session.username ?? 'there' }} !
      </h1>
      <UiButton @click="signOff(null)">Sign off</UiButton>

      <template v-if="!session.username">
        <p>It seems you haven't chosen a username yet</p>
        <form
          gap-2
          flex
          flex-col
          items-start
          @submit.prevent="setUsername({ username })"
        >
          <label>
            Username
            <input v-model="username" p-1 border="1 solid gray-4" />
          </label>
          <UiButton>Set your username</UiButton>
        </form>
      </template>
    </div>

    <template v-else>
      <form
        gap-2
        flex
        flex-col
        items-start
        @submit.prevent="signInWithEmail({ email })"
      >
        <label flex flex-col>
          E-mail
          <UiTextInput v-model="email" id="signin-email" type="email" />
        </label>
        <UiButton bg-blue-3 p-3>Sign in with email</UiButton>
        <p v-if="isSuccess" color-green-7>
          Go
          <code p-1 color-gray-8 bg-gray-3>/maildev</code>
          homie
        </p>
        <p v-if="error" color-red-6>{{ error }}</p>
      </form>

      <div>Or</div>
      <UiButton
        :href="runtimeConfig.public.discordAuthorizeUrl"
        bg="#5865F2 hover:#404ddb focus-visible:#222eba"
        w-max
        :disabled="!isDiscordEnabled"
        left-icon="discord"
      >
        Login with Discord
      </UiButton>

      <template v-if="!isDiscordEnabled">
        <p>
          You need to add those environment variables to eable Discord
          Authentication
        </p>
        <ul>
          <li>
            <code p-1 color-gray-8 bg-gray-3>
              NUXT_PUBLIC_DISCORD_AUTHORIZE_URL
            </code>
          </li>
          <li>
            <code p-1 color-gray-8 bg-gray-3>NUXT_DISCORD_REDIRECT_URI</code>
          </li>
          <li>
            <code p-1 color-gray-8 bg-gray-3>NUXT_DISCORD_CLIENT_ID</code>
          </li>
          <li>
            <code p-1 color-gray-8 bg-gray-3>NUXT_DISCORD_CLIENT_SECRET</code>
          </li>
        </ul>
      </template>
    </template>
  </UiSurface>
</template>

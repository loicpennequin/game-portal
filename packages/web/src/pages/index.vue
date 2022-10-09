<script setup lang="ts">
const { data: session, refetch, suspense } = useTrpcQuery(['auth.session']);
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
    refetch();
  }
});
</script>

<template>
  <div space-y-5>
    <div v-if="session">
      <h1 text-xl inline-block m-r-3>
        Hello, {{ session.username ?? 'there' }} !
      </h1>
      <button bg-blue-3 p="x-3 y-1" @click="signOff(null)">Sign off</button>

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
          <button bg-blue-3 p-3>Set your username</button>
        </form>
      </template>
    </div>

    <form
      v-else
      gap-2
      flex
      flex-col
      items-start
      @submit.prevent="signInWithEmail({ email })"
    >
      <label>
        E-mail
        <input v-model="email" type="email" p-1 border="1 solid gray-4" />
      </label>
      <button bg-blue-3 p-3>Sign in with email</button>
      <p v-if="isSuccess" color-green-7>Go check your email homie</p>
      <p v-if="error" color-red-6>{{ error }}</p>
    </form>
  </div>
</template>

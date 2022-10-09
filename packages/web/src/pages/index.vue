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

const { mutate: signOff } = useTrpcMutation('auth.logout', {
  onSuccess() {
    refetch();
  }
});
</script>

<template>
  <div space-y-5>
    <div v-if="session">
      Hello, {{ session.email }}
      <button bg-blue-3 p-3 @click="signOff(null)">Sign off</button>
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

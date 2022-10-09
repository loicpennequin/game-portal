<script setup lang="ts">
const emit = defineEmits<{
  (e: 'success'): void;
}>();
const email = ref('');

const {
  mutate: signInWithEmail,
  isLoading,
  error
} = useTrpcMutation('auth.emailSignin', {
  onSuccess() {
    emit('success');
  }
});
</script>

<template>
  <form flex flex-col items-start @submit.prevent="signInWithEmail({ email })">
    <p m-b-3>
      No need for a password ! We'll send you a magic link to sign you in.
    </p>
    <label flex flex-col sr-only for="singin-email">E-mail</label>
    <UiTextInput
      v-model="email"
      id="signin-email"
      type="email"
      w-full
      placeholder="Enter your email"
      m-b-5
    />
    <UiButton bg-sky3 p-3 w-full left-icon="envelope" :is-loading="isLoading">
      Sign in with email
    </UiButton>

    <p v-if="error" color-red-6>{{ error }}</p>
  </form>
</template>

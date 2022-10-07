<script setup lang="ts">
const { mutate, isSuccess, error } = useTrpcMutation('auth.emailSignin');
const email = ref('');
</script>

<template>
  <form gap-2 flex flex-col items-start @submit.prevent="mutate({ email })">
    <input v-model="email" type="email" p-1 border="1 solid gray-3" />
    <button bg-blue-3 p-3>Sign in with email</button>
  </form>
  <p v-if="isSuccess" color-green-7>Go check your email homie</p>
  <p v-if="error" color-red-6>{{ error }}</p>
</template>

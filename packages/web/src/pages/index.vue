<script setup lang="ts">
const { mutate, isSuccess, error } = useTrpcMutation('auth.emailSignin');
const email = ref('');

const {
  isLoading,
  error: thingsError,
  data
} = useTrpcQuery(['things.getThings']);
const onSubmit = () => {
  mutate({ email: email.value });
};
</script>

<template>
  <div>
    <div v-if="isLoading">Loading things...</div>
    <div v-else-if="thingsError" color-red-6>{{ thingsError }}</div>
    <pre v-else-if="data">{{ data }}</pre>

    <form gap-2 flex flex-col items-start @submit.prevent="onSubmit">
      <input v-model="email" type="email" p-1 border="1 solid gray-3" />
      <button bg-blue-3 p-3>Sign in with email</button>
    </form>
    <p v-if="isSuccess" color-green-7>Go check your email homie</p>
    <p v-if="error" color-red-6>{{ error }}</p>
  </div>
</template>

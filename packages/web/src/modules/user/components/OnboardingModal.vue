<script setup lang="ts">
const { data: session, refetch } = useTrpcQuery(['auth.session']);

const isOpened = computed(() =>
  session.value ? !session.value.username : false
);

const username = ref('');
const { mutate, isLoading, error } = useTrpcMutation('user.onboarding', {
  onSuccess() {
    refetch();
  }
});
</script>

<template>
  <UiModal v-model:is-opened="isOpened" :closable="false">
    <UiModalBackdrop />

    <UiModalContent p="3" text-center max-w="max">
      <h2 font-bold text-3xl>Almost done !</h2>
      <p>You're almost ready to play some cool games no our platform !</p>
      <p>We just need you to select a username below</p>

      <form
        m="x-auto t-5"
        max-w-xs
        space-y-3
        @submit.prevent="mutate({ username })"
      >
        <label for="onboarding-username" block font-bold text-xl text-center>
          My username is
        </label>
        <UiTextInput v-model="username" id="onboarding-username" />
        <UiButton w-full :is-loading="isLoading">Let's go ! 🚀</UiButton>
        <p v-if="error" color-red-4>{{ error }}</p>
      </form>
    </UiModalContent>
  </UiModal>
</template>

<style scoped></style>

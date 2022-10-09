<script setup lang="ts">
const qc = useQueryClient();

const jwtStore = useJwtStore();
const { mutate: signOff } = useTrpcMutation('auth.logout', {
  onSuccess() {
    jwtStore.jwt = null;
    qc.setQueryData(['auth.session'], null);
  }
});
</script>

<template>
  <nav>
    <ul>
      <li><AppDarkModeToggle /></li>
      <li>
        <UiButton right-icon="power-off" @click="signOff(null)">
          Sign off
        </UiButton>
      </li>
    </ul>
  </nav>
</template>

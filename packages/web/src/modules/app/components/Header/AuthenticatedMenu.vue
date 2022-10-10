<script setup lang="ts">
const { routes } = useTypedRouter();
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
    <ul flex items-center gap-3>
      <li>
        <UiButton variant="ghost" :to="{ name: routes.games }">Games</UiButton>
      </li>
      <li>
        <UiButton variant="ghost" right-icon="power-off" @click="signOff(null)">
          Sign off
        </UiButton>
      </li>
      <li><AppDarkModeToggle /></li>
    </ul>
  </nav>
</template>

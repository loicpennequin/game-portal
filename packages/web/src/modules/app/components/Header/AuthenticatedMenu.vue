<script setup lang="ts">
const { routes } = useTypedRouter();
const qc = useQueryClient();

const { data: session } = useTrpcQuery(['auth.session']);
const jwtStore = useJwtStore();
const { mutate: signOff } = useTrpcMutation('auth.logout', {
  onSuccess() {
    jwtStore.jwt = null;
    qc.setQueryData(['auth.session'], null);
  }
});

const isDropdownOpened = ref(false);
</script>

<template>
  <nav>
    <ul flex items-center gap-3>
      <li>
        <UiButton variant="ghost" :to="{ name: routes.games }">Games</UiButton>
      </li>
      <li>
        <UiDropdown v-model:is-opened="isDropdownOpened">
          <template #toggle="{ on }">
            <UserAvatar
              as="button"
              title="user menu"
              outline="focus:none"
              cursor-pointer
              ring="transparent focus-visible:sky-4 2"
              :user="session"
              h="10"
              v-on="on"
            />
          </template>

          <template #menu>
            <UiDropdownItem icon="brush">
              Toggle dark mode
              <AppDarkModeToggle />
            </UiDropdownItem>

            <UiDropdownItem
              icon="power-off"
              close-on-click
              cursor-pointer
              @click="signOff(null)"
            >
              Sign off
            </UiDropdownItem>
          </template>
        </UiDropdown>
      </li>
    </ul>
  </nav>
</template>

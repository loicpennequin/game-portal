<script setup lang="ts">
import gamepad from '@/assets/images/gamepad.png';

const isSubmitted = ref(false);
</script>

<template>
  <UiContainer max-w="sm" grid place-content="center" h-full>
    <UiSurface space-y-5 overflow-hidden flex flex-col items-center>
      <div grid place-content-center un-children="col-start-1 row-start-1">
        <h1 font-bold text-5xl self-center>Sign in</h1>
        <img
          :src="gamepad"
          w="2/3"
          m-x-auto
          aspect="4/3"
          rotate-z="-10"
          translate-x="25"
        />
      </div>
      <template v-if="!isSubmitted">
        <AuthEmailSignInForm max-w="xs" @success="isSubmitted = true" />
        <div>Or</div>
        <AuthDiscordSignInButton w-full max-w="xs" />
      </template>

      <transition
        appear
        enter-active-class="transition-all duration-200"
        enter-from-class="scale-x-0 scale-y-0 opacity-0"
      >
        <div v-if="isSubmitted" flex flex-col items-center gap-5>
          <div i-ui-check-cloud text-7xl color="green-5" />
          <p text="center 2xl">All set !</p>
          <p>
            You will recieve your magic link via email shortly (it's probably
            already there). Go ahead and check it to pla some awesome games !
          </p>
        </div>
      </transition>
    </UiSurface>
  </UiContainer>
</template>

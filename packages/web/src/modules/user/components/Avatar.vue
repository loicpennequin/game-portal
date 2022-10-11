<script setup lang="ts">
const props = withDefaults(defineProps<{ user: any; as?: any }>(), {
  as: 'div'
});

const backgroundImg = computed(
  () =>
    props.user.avatar?.url && `url('${props.user.avatar?.thumbnails.avatar}')`
);
</script>

<template>
  <UiCenter
    :as="props.as"
    aspect-square
    bg="black dark:sky-5"
    color-white
    rounded="1/2"
    no-underline
    class="avatar"
    text="xl"
  >
    {{ props.user.username.charAt(0) }}
  </UiCenter>
</template>

<style scoped>
.avatar {
  background-image: v-bind(backgroundImg);
  background-size: cover;
}
</style>

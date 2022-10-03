<script setup lang="ts">
type Props = {
  name: string;
  description: string;
  link?: string;
  isReady?: boolean;
};
const props = withDefaults(defineProps<Props>(), { isReady: true, link: null });
</script>

<template>
  <article
    p-6
    flex
    flex-col
    gap-2
    rounded-lg
    bg-opacity-60
    :bg="props.isReady ? 'white' : 'light-4'"
    :color="!props.isReady && 'gray-5'"
  >
    <h2 text-2xl leading-relaxed>
      {{ props.name }}
    </h2>
    <p>{{ props.description }}</p>

    <div m-t-auto self-end>
      <ExternalLink v-if="props.isReady" :href="props.link">
        Learn more
      </ExternalLink>

      <span v-else color-red-6 font-semibold>Soon™</span>
    </div>
  </article>
</template>

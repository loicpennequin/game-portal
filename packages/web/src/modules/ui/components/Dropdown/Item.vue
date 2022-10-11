<script setup lang="ts">
import UiLink from '@/modules/ui/components/Link.vue';
import { TypedRouteList } from '~~/src/generated';
import { TypedRouteLocationRaw } from '~~/src/generated/typed-router';

const api = useDropdown();

const props = withDefaults(
  defineProps<{
    closeOnClick?: boolean;
    icon?: string;
    to?: TypedRouteLocationRaw<TypedRouteList>;
  }>(),
  {
    closeOnClick: false,
    icon: '',
    to: null as any
  }
);

const onClick = () => {
  if (props.closeOnClick) api.close();
};

const attrs = useAttrs();
const is = computed(() => {
  if (props.to) return UiLink;
  if (attrs.onClick) return 'button';

  return 'div';
});
</script>
<template>
  <component
    :is="is"
    :to="props.to"
    flex
    items-center
    gap-4
    bg="hover:light-3 dark:hover:dark-2"
    p="3"
    divide-x
    divide="black/30 dark:white/30"
    select-none
    no-underline
    color="inherit"
    w-full
    @click="onClick"
  >
    <div w-4 aspect-square :i-ui="props.icon" />
    <div p-l-5 flex items-center gap-2 flex-1>
      <slot />
    </div>
  </component>
</template>

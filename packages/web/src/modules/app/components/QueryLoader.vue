<script lang="ts">
import { ComponentPublicInstance, VNode } from 'vue';
import QueryLoaderBase from './QueryLoaderBase.vue';

interface Props<T extends ReturnType<typeof useTrpcQuery>> {
  query: T;
}

type AssertDefined<T> = Exclude<T, undefined>;

type QueryLoader = new <T extends ReturnType<typeof useTrpcQuery>>(
  props: Props<T>
) => ComponentPublicInstance & {
  $props: Props<T>;
  $slots: {
    default: ({ data }: { data: AssertDefined<T['data']['value']> }) => VNode[];
    loading: (...args: any[]) => VNode[];
    error: (...args: any[]) => VNode[];
    empty: (...args: any[]) => VNode[];
  };
};

export default QueryLoaderBase as QueryLoader;
</script>

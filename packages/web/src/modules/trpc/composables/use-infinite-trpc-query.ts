import { TRPCClientError } from '@trpc/client';
import { UseInfiniteQueryOptions } from '@tanstack/vue-query';
import {
  AppRouter,
  InferQueryOutput,
  PathAndInput,
  TrpcQueryPath
} from '~~/src/modules/trpc/utils/types';
import { MaybeRef } from '~~/src/utils/types';

export type TrpcInfiniteQueryOptions<TPath extends TrpcQueryPath> =
  UseInfiniteQueryOptions<InferQueryOutput<TPath>, TRPCClientError<AppRouter>>;

export const useInfiniteTrpcQuery = <TPath extends TrpcQueryPath>(
  pathAndInput: MaybeRef<PathAndInput<TPath>>,
  options: MaybeRef<UseInfiniteQueryOptions<InferQueryOutput<TPath>>>
) => {
  const client = useClient();

  const resolvedOptions = computed(() => {
    return {
      queryKey: unref(pathAndInput) || [],
      queryFn: ({ pageParam }: { pageParam: any }) => {
        const [path, input] = unref(pathAndInput);
        const actualInput = { ...(input as any), offset: pageParam };

        return (client as any).query(path, actualInput);
      },
      ...unref(options || {})
    };
  });

  return useInfiniteQuery<InferQueryOutput<TPath>>(
    resolvedOptions as any // fixme
  );
};

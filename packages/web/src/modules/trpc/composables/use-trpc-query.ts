import { TRPCClientError } from '@trpc/client';
import { Ref } from 'vue';
import {
  QueryKey,
  UseQueryOptions,
  UseQueryReturnType
} from '@tanstack/vue-query';
import {
  TrpcQueryPath,
  InferQueryOutput,
  AppRouter,
  PathAndInput
} from '~~/src/modules/trpc/utils/types';
import { MaybeRef } from '~~/src/utils/types';

declare module '@tanstack/vue-query' {
  function useQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
  >(
    options:
      | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
      | Ref<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>>
  ): UseQueryReturnType<TData, TError>;
}

export type TrpcQueryOptions<TPath extends TrpcQueryPath> = UseQueryOptions<
  InferQueryOutput<TPath>,
  TRPCClientError<AppRouter>
>;

export type InferQueryOptions<TPath extends TrpcQueryPath> = Parameters<
  typeof useTrpcQuery<TPath, TrpcQueryOptions<TPath>>
>[1];

export const useTrpcQuery = <
  TPath extends TrpcQueryPath,
  TOptions extends TrpcQueryOptions<TPath>
>(
  pathAndInput: MaybeRef<PathAndInput<TPath>>,
  options?: MaybeRef<TOptions>
) => {
  const client = useClient();
  const resolvedOptions = computed(() => {
    return {
      queryKey: unref(pathAndInput) || [],
      queryFn: () => (client as any).query(...(unref(pathAndInput) || [])),
      ...unref(options || {})
    };
  });

  return useQuery<InferQueryOutput<TPath>, TRPCClientError<AppRouter>>(
    resolvedOptions as TrpcQueryOptions<TPath> // vue-uery typing says that you cant pass a ref as options, but you actually can
  );
};

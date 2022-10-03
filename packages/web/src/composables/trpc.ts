import { TRPCClientError } from '@trpc/client';
import {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions
} from 'vue-query';
import type { inferHandlerInput } from '@trpc/server';
import {
  AppRouter,
  InferQueryOutput,
  MaybeRef,
  PathAndInput,
  TrpcQueryPath,
  InferMutationOutput,
  TMutations,
  TMutationValues,
  TrpcMutationPath
} from '../utils/types';

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

  return useInfiniteQuery<InferQueryOutput<TPath>>(resolvedOptions as any);
};

export type InferMutationOptions<TPath extends TrpcMutationPath> = Parameters<
  typeof useTrpcMutation<TPath>
>[1];

export const useTrpcMutation = <TPath extends keyof TMutationValues & string>(
  path: TPath,
  options: UseMutationOptions<InferMutationOutput<TPath>, any, any, any> = {}
) => {
  const client = useClient();

  return useMutation<
    InferMutationOutput<TPath>,
    any,
    inferHandlerInput<TMutations[TPath]>[0]
  >(
    [path],
    input => {
      return (client as any).mutation(path, input);
    },
    options
  );
};

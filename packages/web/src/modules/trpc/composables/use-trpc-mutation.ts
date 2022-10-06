import type { inferHandlerInput } from '@trpc/server';
import { UseMutationOptions } from '@tanstack/vue-query';
import {
  InferMutationOutput,
  TMutations,
  TMutationValues,
  TrpcMutationPath
} from '~~/src/modules/trpc/utils/types';

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

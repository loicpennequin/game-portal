import type {
  ProcedureRecord,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput
} from '@trpc/server';
import type { TRPCClientErrorLike } from '@trpc/client';
import { router } from '~~/src/generated/trpc-router';

export type AppRouter = typeof router;

export type inferProcedures<
  TObj extends ProcedureRecord<any, any, any, any, any, any>
> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>;
    output: inferProcedureOutput<TObj[TPath]>;
  };
};

export type TQueries = AppRouter['_def']['queries'];
export type TError = TRPCClientErrorLike<AppRouter>;

export type TQueryValues = inferProcedures<AppRouter['_def']['queries']>;

export type TMutations = AppRouter['_def']['mutations'];
export type TMutationValues = inferProcedures<AppRouter['_def']['mutations']>;

export type TrpcQueryPath = keyof TQueryValues & string;
export type TrpcMutationPath = keyof TMutationValues & string;

export type InferQueryOutput<TRouteKey extends keyof TQueryValues & string> =
  inferProcedureOutput<TQueries[TRouteKey]>;

export type InferMutationOutput<
  TRouteKey extends keyof TMutationValues & string
> = inferProcedureOutput<TMutations[TRouteKey]>;

export type PathAndInput<TPath extends TrpcQueryPath> = [
  path: TPath,
  ...args: inferHandlerInput<TQueries[TPath]>
];

export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];

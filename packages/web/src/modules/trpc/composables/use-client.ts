import { TRPCClient } from '@trpc/client';
import { AppRouter } from '../utils/types';

export function useClient(): TRPCClient<AppRouter> {
  return useNuxtApp().$client;
}

import { Ref } from 'vue';
import { MaybeRef } from '~~/src/utils/types';

export function useClientHeaders(
  initialValue: MaybeRef<Record<string, any>> = {}
): Ref<Record<string, any>> {
  return useState('trpc-nuxt-header', () => initialValue);
}

import { defineStore } from 'pinia';
import { Maybe } from '~~/src/utils/types';

export const useJwtStore = defineStore('jwt', () => {
  const jwt = ref<Maybe<string>>(useCookie('access-token').value);

  return { jwt };
});

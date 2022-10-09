import { defineStore } from 'pinia';

export const useJwtStore = defineStore('jwt', () => {
  const jwt = ref(useCookie('access-token').value);

  return { jwt };
});

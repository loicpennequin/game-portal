import { FetchOptions } from 'ohmyfetch';
import { defineStore } from 'pinia';

export const useGlobalInterceptors = defineStore('interceptors', () => {
  const requestInterceptors = new Set<FetchOptions['onRequest']>();
  const requestErrorInterceptors = new Set<FetchOptions['onRequestError']>();
  const responseInterceptors = new Set<FetchOptions['onResponse']>();
  const responseErrorInterceptors = new Set<FetchOptions['onResponseError']>();

  return {
    request: requestInterceptors,
    requestError: requestErrorInterceptors,
    response: responseInterceptors,
    responseError: responseErrorInterceptors
  };
});

export const useHttp = () => {
  const { request, requestError, response, responseError } =
    useGlobalInterceptors();

  return $fetch.create({
    retry: 0,
    async onRequest(ctx) {
      for (const cb of request.values()) {
        await cb?.(ctx);
      }
    },
    async onRequestError(ctx) {
      for (const cb of requestError.values()) {
        await cb?.(ctx);
      }
    },
    async onResponse(ctx) {
      for (const cb of response.values()) {
        await cb?.(ctx);
      }
    },
    async onResponseError(ctx) {
      for (const cb of responseError.values()) {
        await cb?.(ctx);
      }
    }
  });
};

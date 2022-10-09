import { FetchOptions } from 'ohmyfetch';

const requestInterceptors = new Set<FetchOptions['onRequest']>();
const requestErrorInterceptors = new Set<FetchOptions['onRequestError']>();
const responseInterceptors = new Set<FetchOptions['onResponse']>();
const responseErrorInterceptors = new Set<FetchOptions['onResponseError']>();

export const useGlobalInterceptors = () => ({
  request: requestInterceptors,
  requestError: requestErrorInterceptors,
  response: responseInterceptors,
  responseError: responseErrorInterceptors
});

export const useHttp = () => {
  return $fetch.create({
    retry: 0,
    async onRequest(ctx) {
      for (const cb of requestInterceptors.values()) {
        await cb?.(ctx);
      }
    },
    async onRequestError(ctx) {
      for (const cb of requestErrorInterceptors.values()) {
        await cb?.(ctx);
      }
    },
    async onResponse(ctx) {
      for (const cb of responseInterceptors.values()) {
        await cb?.(ctx);
      }
    },
    async onResponseError(ctx) {
      for (const cb of responseErrorInterceptors.values()) {
        await cb?.(ctx);
      }
    }
  });
};

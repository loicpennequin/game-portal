import * as trpc from '@trpc/client';
import { unref } from 'vue';
import { FetchError } from 'ohmyfetch';
import { defineNuxtPlugin, useRequestHeaders } from '#app';
import { AppRouter } from '~~/src/modules/trpc/utils/types';

export default defineNuxtPlugin(nuxtApp => {
  const headers = useRequestHeaders();
  const protocol = import.meta.env.DEV ? 'http://' : 'https://';
  const http = useHttp();
  const url = process.server
    ? `${protocol}${headers.host}/api/trpc`
    : `${window.location.origin}/api/trpc`;

  if (!nuxtApp.payload['trpc-nuxt-header']) {
    nuxtApp.payload['nuxtApp.payload.state'] = {}; // @fixme
  }
  const otherHeaders = useClientHeaders();

  const client = trpc.createTRPCClient<AppRouter>({
    url,
    headers: () => {
      return {
        ...unref(otherHeaders),
        ...headers
      };
    },
    // use Nuxt native implementation of $fetch instead of standard fetch
    // this allows us to call directly the functions instead of making an API call when the app is server-rendered
    // We need to tweak the error handling a bit so the TRPC errors are formatted correctly
    fetch: (input, options) =>
      http
        .raw(input.toString(), options)
        .catch(e => {
          if (e instanceof FetchError && e.response) return e.response;

          throw e;
        })
        .then(response => ({
          ...response,
          json: () => Promise.resolve(response._data)
        }))
  });
  nuxtApp.provide('client', client);
});

declare module '#app' {
  interface NuxtApp {
    $client: trpc.TRPCClient<AppRouter>;
  }
}

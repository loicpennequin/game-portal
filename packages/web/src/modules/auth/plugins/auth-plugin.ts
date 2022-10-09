/* eslint-disable no-console */
import jwtDecode from 'jwt-decode';
import { getCookie, appendHeader } from 'h3';
import { FetchContext, FetchError } from 'ohmyfetch';
import { Maybe } from '~~/src/utils/types';

type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

const EXCLUDED_URLS = ['/api/trpc/auth.refreshJwt'] as const;

export default defineNuxtPlugin(nuxt => {
  const { request } = useGlobalInterceptors();
  const http = useHttp();
  const headers = useRequestHeaders();
  const trpcClient = useClient();
  const jwtStore = useJwtStore();
  let ongoingRefreshPromise: Maybe<Promise<void>>;
  const getCookieUniversal = (name: string) => {
    return nuxt.ssrContext
      ? getCookie(nuxt.ssrContext.event, name)
      : useCookie(name).value;
  };

  const setAuthorizationHeader = (ctx: FetchContext<unknown>) => {
    if (!jwtStore.jwt) return;

    if (!ctx.options.headers) ctx.options.headers = {};

    // @ts-ignore @FIXME
    ctx.options.headers.authorization = `Bearer ${jwtStore.jwt}`;
  };

  request.add(ctx => {
    setAuthorizationHeader(ctx);
    return Promise.resolve();
  });

  request.add(ctx => {
    console.log(
      'HTTP REQUEST',
      ctx.request.toString(),
      !!ongoingRefreshPromise
    );

    const isExcluded = EXCLUDED_URLS.some(url =>
      ctx.request.toString().startsWith(url)
    );
    if (isExcluded) return Promise.resolve();

    return (
      ongoingRefreshPromise ??
      (ongoingRefreshPromise = (async () => {
        const accessToken = getCookieUniversal('access-token');
        if (!accessToken) return;

        const { exp } = jwtDecode<JwtPayload>(accessToken);
        const now = new Date();
        const expirationDate = new Date(exp * 1000); // exp is in seconds
        const isExpired = now.getTime() > expirationDate.getTime();

        if (!isExpired) return;
        console.log('jwt expired, will refresh', ctx.request.toString());

        if (nuxt.ssrContext) {
          // https://v3.nuxtjs.org/getting-started/data-fetching/#example-pass-cookies-from-server-side-api-calls-on-ssr-response
          const applySSRCookies = (headers: Headers) => {
            console.log(
              'applying SSR cookies',
              ctx.request.toString(),
              !!nuxt.ssrContext
            );
            const cookies = headers.get('set-cookie');
            if (!cookies) return;
            for (const cookie of cookies.split(',')) {
              appendHeader(nuxt.ssrContext!.event, 'set-cookie', cookie);
            }
          };

          try {
            console.log('calling refresh endpoint');
            const res = await http.raw('/api/trpc/auth.refreshJwt', {
              method: 'POST',
              headers: headers as any,
              retry: false
            });

            jwtStore.jwt = (res._data as any).result.data.accessToken;
            setAuthorizationHeader(ctx);

            applySSRCookies(res.headers);
          } catch (err: any) {
            if (err instanceof FetchError && err.response) {
              applySSRCookies(err.response.headers);
            }
          }
        } else {
          await trpcClient.mutation('auth.refreshJwt');
        }
        ongoingRefreshPromise = null;
      })())
    );
  });
});

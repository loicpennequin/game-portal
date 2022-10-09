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

type RefreshEndpointRawResponse = {
  result: { data: { accessToken: string } };
};

const REFRESH_ENDPOINT = '/api/trpc/auth.refreshJwt';

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

  const checkJwtExpiration = (jwt: string) => {
    const { exp } = jwtDecode<JwtPayload>(jwt);
    const now = new Date();
    const expirationDate = new Date(exp * 1000); // exp is in seconds
    return now.getTime() > expirationDate.getTime();
  };

  // https://v3.nuxtjs.org/getting-started/data-fetching/#example-pass-cookies-from-server-side-api-calls-on-ssr-response
  const applySSRCookies = (headers: Headers) => {
    if (!nuxt.ssrContext) {
      console.warn('Cannot apply SSR cookies client side');
      return;
    }

    const cookies = headers.get('set-cookie');
    if (!cookies) return;

    for (const cookie of cookies.split(',')) {
      appendHeader(nuxt.ssrContext.event, 'set-cookie', cookie);
    }
  };

  const refreshJwtSSR = async (ctx: FetchContext) => {
    try {
      // using .raw() to have access to response headers
      const res = await http.raw<RefreshEndpointRawResponse>(REFRESH_ENDPOINT, {
        method: 'POST',
        headers: headers as any // types are whack
      });

      jwtStore.jwt = res._data?.result.data.accessToken;
      setAuthorizationHeader(ctx);
      applySSRCookies(res.headers);
    } catch (err: unknown) {
      if (err instanceof FetchError && err.response) {
        applySSRCookies(err.response.headers);
      }
    }
  };

  const refreshJwtIfNeeded = async (ctx: FetchContext) => {
    const accessToken = getCookieUniversal('access-token');
    if (!accessToken) return;

    const isExpired = checkJwtExpiration(accessToken);
    if (!isExpired) return;

    if (nuxt.ssrContext) {
      await refreshJwtSSR(ctx);
    } else {
      await trpcClient.mutation('auth.refreshJwt');
    }

    ongoingRefreshPromise = null;
  };

  request.add(ctx => {
    setAuthorizationHeader(ctx);
    return Promise.resolve();
  });

  request.add(ctx => {
    if (ctx.request.toString() === REFRESH_ENDPOINT) return Promise.resolve();

    if (!ongoingRefreshPromise) {
      ongoingRefreshPromise = refreshJwtIfNeeded(ctx);
    }

    return ongoingRefreshPromise;
  });
});

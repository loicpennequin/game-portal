import jwtDecode from 'jwt-decode';
import { getCookie } from 'h3';

type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};
export default defineNuxtPlugin(nuxt => {
  const { request } = useGlobalInterceptors();
  const trpcClient = useClient();

  const getCookieUniversal = (name: string) => {
    return nuxt.ssrContext
      ? getCookie(nuxt.ssrContext.event, name)
      : useCookie(name).value;
  };

  request.add(async ctx => {
    const accessToken = getCookieUniversal('access-token');
    if (!accessToken) return;

    const { exp } = jwtDecode<JwtPayload>(accessToken);
    const now = new Date();
    const expirationDate = new Date(exp * 1000); // exp is in seconds
    const isExpired = now.getTime() > expirationDate.getTime();

    if (!isExpired) return;
    if (ctx.request.toString().includes('auth.refreshJwt')) return;
    if (nuxt.ssrContext) {
      // https://v3.nuxtjs.org/getting-started/data-fetching/#example-pass-cookies-from-server-side-api-calls-on-ssr-response
      const res = await $fetch.raw('/api/trpc/auth.refreshJwt', {
        method: 'POST'
      });

      const cookies = (res.headers.get('set-cookie') || '').split(',');
      for (const cookie of cookies) {
        appendHeader(useRequestEvent(), 'set-cookie', cookie);
      }
    } else {
      await trpcClient.mutation('auth.refreshJwt');
    }
  });
});

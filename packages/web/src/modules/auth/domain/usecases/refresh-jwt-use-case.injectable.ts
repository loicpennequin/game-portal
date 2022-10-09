import { TRPCError } from '@trpc/server';
import { AuthService, CookieService } from '~~/src/generated/injectables';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';

type Injected = {
  authService: AuthService;
  event: AuthenticatedEvent;
  cookieService: CookieService;
};

export default ({ authService, cookieService, event }: Injected) =>
  async () => {
    const refreshTokenCookie = getCookie(event, 'refresh-token');
    if (!refreshTokenCookie) {
      console.log('no refresh token cookie');
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    try {
      const { accessToken, refreshToken } = await authService.refreshJWT(
        refreshTokenCookie
      );

      cookieService.setCookie(event, 'access-token', accessToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      cookieService.setCookie(event, 'refresh-token', refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        httpOnly: true
      });
      return { accessToken };
    } catch (err) {
      cookieService.deleteCookie(event, 'access-token');
      cookieService.deleteCookie(event, 'refresh-token');
      throw err;
    }
  };

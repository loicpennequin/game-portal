import { TRPCError } from '@trpc/server';
import { CompatibilityEvent } from 'h3';
import { AuthService, CookieService } from '~~/src/generated/injectables';

type Injected = {
  authService: AuthService;
  event: CompatibilityEvent;
  cookieService: CookieService;
};

export default ({ authService, cookieService, event }: Injected) =>
  async () => {
    const refreshTokenCookie = getCookie(event, 'refresh-token');
    if (!refreshTokenCookie) throw new TRPCError({ code: 'UNAUTHORIZED' });

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
  };

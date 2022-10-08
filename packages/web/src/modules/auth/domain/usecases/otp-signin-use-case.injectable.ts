import { CompatibilityEvent } from 'h3';
import { AuthService, CookieService } from '~~/src/generated/injectables';
import { OtpSigninDto } from '~~/src/modules/auth/domain/auth-dtos';

type Injected = {
  authService: AuthService;
  event: CompatibilityEvent;
  cookieService: CookieService;
};

export default ({ authService, event, cookieService }: Injected) =>
  async (input: OtpSigninDto) => {
    const { accessToken, refreshToken } =
      await authService.signInWithOneTimePassword(input.token);

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

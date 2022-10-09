import {
  CookieService,
  DiscordService,
  Db,
  AuthService
} from '~~/src/generated/injectables';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';

type Injected = {
  event: AuthenticatedEvent;
  db: Db;
  cookieService: CookieService;
  authService: AuthService;
  discordService: DiscordService;
};

export default ({
    discordService,
    db,
    authService,
    cookieService,
    event
  }: Injected) =>
  async (code: string) => {
    const payload = await discordService.getToken(code);
    const { email, username, id } = await discordService.getUserInfos(
      payload.access_token
    );

    await db.user.upsert({
      where: { email },
      create: { email, username, discordId: id },
      update: {}
    });

    const { accessToken, refreshToken } = await authService.signInWithDiscordId(
      id
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

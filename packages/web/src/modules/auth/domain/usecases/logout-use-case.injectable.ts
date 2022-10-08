import { AuthService, CookieService } from '~~/src/generated/injectables';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';

type Injected = {
  event: AuthenticatedEvent;
  authService: AuthService;
  cookieService: CookieService;
};

export default ({ event, authService, cookieService }: Injected) =>
  async () => {
    if (!event.context.session) return true;

    await authService.logout(event.context.session.id);
    cookieService.deleteCookie(event, 'refresh-token');
    cookieService.deleteCookie(event, 'access-token');

    return true;
  };

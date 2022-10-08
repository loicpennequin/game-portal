import {
  CookieService,
  Db,
  EncryptionService
} from '~~/src/generated/injectables';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';

type Injected = {
  cookieService: CookieService;
  encryptionService: EncryptionService;
  db: Db;
  event: AuthenticatedEvent;
};
export default ({ cookieService, encryptionService, event, db }: Injected) =>
  async () => {
    const jwt = cookieService.getCookie(event, 'access-token');
    if (!jwt) return;

    const payload = encryptionService.verifyJwt(jwt);

    event.context.session = await db.user.findUnique({
      where: { id: payload.sub as string }
    });
  };

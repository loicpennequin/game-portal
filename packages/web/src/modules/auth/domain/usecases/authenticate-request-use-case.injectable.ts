import { Db, EncryptionService } from '~~/src/generated/injectables';
import { AuthenticatedEvent } from '~~/src/modules/core/utils/types';

type Injected = {
  encryptionService: EncryptionService;
  db: Db;
  event: AuthenticatedEvent;
};
export default ({ encryptionService, event, db }: Injected) =>
  async () => {
    const { authorization } = event.req.headers;

    if (!authorization) return;
    const payload = encryptionService.verifyJwt(
      authorization.replace('Bearer ', '')
    );

    event.context.session = await db.user.findUnique({
      where: { id: payload.sub as string }
    });
  };

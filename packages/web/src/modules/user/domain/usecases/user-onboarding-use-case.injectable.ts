import { AuthenticatedEvent, Db } from '~~/src/generated/injectables';

type Injected = {
  event: AuthenticatedEvent;
  db: Db;
};

export default ({ db, event }: Injected) =>
  (username: string) =>
    db.user.update({
      where: { id: event.context.session!.id },
      data: { username }
    });

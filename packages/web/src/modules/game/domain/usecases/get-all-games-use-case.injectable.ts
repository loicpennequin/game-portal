import { Db } from '~~/src/generated/injectables';

type Injected = {
  db: Db;
};
export default ({ db }: Injected) =>
  () =>
    db.game.findMany();

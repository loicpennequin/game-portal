import { TRPCError } from '@trpc/server';
import { Db } from '~~/src/generated/injectables';
import { FindGameByIdDto } from '~~/src/modules/game/domain/game-dtos';

type Injected = {
  db: Db;
};
export default ({ db }: Injected) =>
  async ({ id }: FindGameByIdDto) => {
    const game = await db.game.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!game) throw new TRPCError({ code: 'NOT_FOUND' });

    return game;
  };

import { TRPCError } from '@trpc/server';
import { createRouter } from '@/modules/trpc/utils/create-router';
import { findGameByIdDto } from '~~/src/modules/game/domain/game-dtos';

export default createRouter()
  .query('findAll', {
    resolve({ ctx }) {
      return ctx.db.game.findMany();
    }
  })
  .query('findById', {
    input: findGameByIdDto,
    async resolve({ ctx, input }) {
      const game = await ctx.db.game.findUnique({
        where: { id: input.id },
        include: { author: true }
      });

      if (!game) throw new TRPCError({ code: 'NOT_FOUND' });

      return game;
    }
  });

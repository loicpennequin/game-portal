import { createRouter } from '@/modules/trpc/utils/create-router';
import { findGameByIdDto } from '~~/src/modules/game/domain/game-dtos';

export default createRouter()
  .query('findAll', {
    resolve({ ctx }) {
      return ctx.getAllGamesUseCase();
    }
  })
  .query('findById', {
    input: findGameByIdDto,
    resolve({ ctx, input }) {
      return ctx.getGameDetailsUseCase(input);
    }
  });

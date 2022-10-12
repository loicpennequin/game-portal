import { createRouter } from '@/modules/trpc/utils/create-router';

export default createRouter().query('findAll', {
  resolve({ ctx }) {
    return ctx.db.game.findMany();
  }
});

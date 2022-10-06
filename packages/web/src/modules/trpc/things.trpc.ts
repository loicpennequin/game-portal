import { createRouter } from '@/modules/trpc/utils/create-router';

export default createRouter().query('getThings', {
  resolve({ ctx }) {
    return ctx.db.thing.findMany();
  }
});

import { createRouter } from '@/modules/trpc/utils/create-router';

export default createRouter()
  .query('getThings', {
    resolve({ ctx }) {
      return ctx.db.thing.findMany();
    }
  })
  .mutation('sendMail', {
    resolve({ ctx }) {
      return ctx.mailService.sendMail({
        to: 'foo@gmail.com',
        template: {
          subject: 'This is an email !',
          body: 'The email body'
        }
      });
    }
  });

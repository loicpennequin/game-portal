/* eslint-disable no-console */
import chalk from 'chalk';
import { resolve } from 'pathe';
import MailDev from 'maildev';
import { addServerHandler, defineNuxtModule } from '@nuxt/kit';
import { setupNuxtModule } from '../../utils/nuxt-module';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('mailing', nuxt);

    if (process.env.NODE_ENV === 'production') return;

    addServerHandler({
      handler: resolve(__dirname, 'server/api/proxy-middleware.ts'),
      middleware: true
    });

    nuxt.hook('listen', () => {
      const maildev = new MailDev({
        // @ts-ignore dumbass walmart thirst party types smh
        basePathname: '/maildev',
        smtp: 1025
      });

      maildev.listen(err => {
        if (err) console.error(err);

        console.log(
          chalk.yellow('[MAILDEV]'),
          ' - ',
          'ready at endpoint /maildev'
        );
      });
    });
  }
});

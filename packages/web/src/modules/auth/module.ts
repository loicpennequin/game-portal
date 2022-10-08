/* eslint-disable no-console */
import { addServerHandler, defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'pathe';
import { setupNuxtModule } from '../../utils/nuxt-module';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('auth', nuxt);

    addServerHandler({
      handler: resolve(
        __dirname,
        './server/api/authenticate-request-middleware.ts'
      ),
      middleware: true
    });
  }
});

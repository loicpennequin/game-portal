import { addServerHandler, defineNuxtModule } from '@nuxt/kit';
import { resolve } from 'pathe';
import { setupNuxtModule } from '../../utils/nuxt-module';
import { generateTrpcRouter } from './utils/generate-trpc-router-file';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('trpc', nuxt);

    addServerHandler({
      route: '/api/trpc/*',
      handler: resolve(__dirname, './api/trpc.ts')
    });

    generateTrpcRouter();
    nuxt.hook('builder:watch', (_event, path) => {
      if (path.startsWith('generated')) return;
      generateTrpcRouter();
    });
  }
});

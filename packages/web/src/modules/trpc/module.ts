import { addServerHandler, defineNuxtModule } from '@nuxt/kit';
import { relative, resolve } from 'pathe';
import { setupNuxtModule } from '../../utils/nuxt-module';
import { generateTrpcRouter } from './utils/generate-trpc-router';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('trpc', nuxt);

    addServerHandler({
      route: '/api/trpc/*',
      handler: resolve(__dirname, './api/trpc.ts')
    });

    generateTrpcRouter();
    nuxt.hook('builder:watch', (_event, path) => {
      path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
      if (path.startsWith('generated')) return;
      generateTrpcRouter();
    });
  }
});

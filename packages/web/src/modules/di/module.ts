import { relative, resolve } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit';
import { setupNuxtModule } from '../../utils/nuxt-module';
import { generateInjectables } from './utils/generate-injectables';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('di', nuxt);

    generateInjectables();
    nuxt.hook('builder:watch', (_event, path) => {
      path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
      if (path.startsWith('generated')) return;
      generateInjectables();
    });
  }
});

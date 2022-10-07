import { defineNuxtModule } from '@nuxt/kit';
import { setupNuxtModule } from '../../utils/nuxt-module';
import { generateInjectables } from './utils/generate-injectables';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('di', nuxt);

    generateInjectables();
    nuxt.hook('builder:watch', (_event, path) => {
      if (path.startsWith('generated')) return;
      generateInjectables();
    });
  }
});

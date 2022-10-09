import { defineNuxtModule } from '@nuxt/kit';
import { setupNuxtModule } from '../../utils/nuxt-module';

export default defineNuxtModule({
  setup(_options, nuxt) {
    setupNuxtModule('app', nuxt);
  }
});

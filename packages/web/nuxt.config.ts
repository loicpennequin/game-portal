import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import presetAttributify from '@unocss/preset-attributify';
import { presetUno } from '@unocss/preset-uno';
import { presetIcons } from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';
import unoPreset from './src/modules/ui/uno-preset';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MODULES_PATH = resolve(__dirname, 'src/modules');
const modules = fs
  .readdirSync(MODULES_PATH)
  .map(m => resolve(MODULES_PATH, `${m}/module.ts`))
  .filter(entryPoint => fs.existsSync(entryPoint));

export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    ...modules,
    'nuxt-typed-router',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    appUrl: '',
    jwtSecret: '',
    refreshTokenSecret: '',
    discordClientId: '',
    discordClientSecret: '',
    discordRedirectUri: '',
    sendgridApiKey: '',
    public: {
      discordAuthorizeUrl: ''
    }
  },

  trpc: {
    baseURL: process.env.TRPC_URL,
    endpoint: '/api/trpc' // defaults to /trpc
  },

  unocss: {
    preflight: true,

    presets: [
      presetAttributify(),
      presetUno(),
      presetIcons(),
      presetWebFonts({
        fonts: {
          sans: 'Roboto'
        }
      }),
      unoPreset()
    ]
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  }
});

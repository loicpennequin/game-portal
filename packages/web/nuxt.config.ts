import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import fs from 'fs-extra';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ICONS_DIR = resolve(__dirname, 'src/assets/icons');

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
    attributify: true,
    icons: {
      collections: {
        ui: FileSystemIconLoader(ICONS_DIR, svg => {
          return svg.replace('<svg ', '<svg fill="currentColor" ');
        })
      }
    },
    webFonts: {
      fonts: {
        sans: 'Roboto'
      }
    },
    safelist: [
      ...fs
        .readdirSync(ICONS_DIR)
        .map(fileName => fileName.replace('.svg', ''))
        .map(icon => `[i-ui~="${icon}"]`)
    ]
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: ''
  }
});

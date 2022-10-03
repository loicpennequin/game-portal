import { resolve } from 'path';
import fs from 'fs';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';

const getAliases = () => {
  const NuxtTsConfig = fs.readFileSync('./.nuxt/tsconfig.json').toString();

  const tsConfigFormated = JSON.parse(
    NuxtTsConfig.replace(
      /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
      (m, g) => (g ? '' : m)
    )
  );

  const r = (p: string) => resolve(__dirname, p);

  return Object.fromEntries(
    Object.entries(tsConfigFormated.compilerOptions.paths).map(
      ([key, value]) => [key, r(value[0])]
    )
  );
};

export default defineConfig({
  root: '.',
  plugins: [
    vue(),
    Components({ dts: false }),
    AutoImport({
      /* options */
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dirs: ['./composables/**'],
      dts: false
    })
  ],
  resolve: {
    alias: getAliases()
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts']
  }
});

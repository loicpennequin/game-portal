import { addComponentsDir, addImportsDir, addPlugin } from '@nuxt/kit';
import { Nuxt } from '@nuxt/schema';
import fs from 'fs-extra';
import { relative, resolve } from 'pathe';

export const setupNuxtModule = (name: string, nuxt: Nuxt) => {
  const dirname = resolve(process.cwd(), 'src/modules', name);
  const COMPOSABLES_DIR = resolve(dirname, 'composables');
  const COMPONENTS_DIR = resolve(dirname, 'components');
  const PLUGINS_DIR = resolve(dirname, 'plugins');

  let composablesImported = false;
  let componentsImported = false;
  const importedPlugins: string[] = [];

  const handleAutoImports = () => {
    if (fs.existsSync(COMPOSABLES_DIR) && !componentsImported) {
      addImportsDir(COMPOSABLES_DIR);
      componentsImported = true;
    }

    if (fs.existsSync(COMPONENTS_DIR) && !composablesImported) {
      addComponentsDir({ path: COMPONENTS_DIR, prefix: name });
      composablesImported = true;
    }

    if (fs.existsSync(PLUGINS_DIR)) {
      fs.readdirSync(PLUGINS_DIR)
        .map(fileName => resolve(PLUGINS_DIR, fileName))
        .forEach(plugin => {
          if (importedPlugins.includes(plugin)) return;
          addPlugin(plugin);
          importedPlugins.push(plugin);
        });
    }
  };

  nuxt.hook('builder:watch', (_event, path) => {
    path = relative(nuxt.options.srcDir, resolve(nuxt.options.srcDir, path))
    if (path.startsWith('generated')) return;
    handleAutoImports();
  });

  handleAutoImports();
};

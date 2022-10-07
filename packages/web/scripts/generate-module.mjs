/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
import { resolve } from 'path';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { Command } from 'commander';
import * as chalk from 'chalk';
// eslint-disable-next-line import/default
import prettier from 'prettier';

const templates = {
  module(name) {
    return `
      import { defineNuxtModule } from '@nuxt/kit';
      import { setupNuxtModule } from '../../utils/nuxt-module';

      export default defineNuxtModule({
        setup(_options, nuxt) {
          setupNuxtModule('${name}', nuxt);
        }
      });
    `;
  }
};

const prettify = async template =>
  prettier.format(template, {
    ...(await prettier.resolveConfig(process.cwd())),
    parser: 'typescript'
  });

const program = new Command();

program
  .name('CLI')
  .command('module')
  .argument('<string>', 'the module name')
  .action(async name => {
    const MODULES_PATH = resolve(process.cwd(), 'src/modules');
    const outputPath = resolve(MODULES_PATH, name);

    if (existsSync(outputPath)) {
      console.log(chalk.red(`Directory ${outputPath} already exists.`));
      process.exit(0);
    }

    mkdirSync(outputPath);

    mkdirSync(resolve(outputPath, 'components'));
    mkdirSync(resolve(outputPath, 'composables'));
    mkdirSync(resolve(outputPath, 'plugins'));
    mkdirSync(resolve(outputPath, 'utils'));
    writeFileSync(
      resolve(outputPath, 'module.ts'),
      await prettify(templates.module(name))
    );
  });

program.parse();

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

const baseUrl = './dist';
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});

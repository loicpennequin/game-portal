import typescript from '@rollup/plugin-typescript';
import ttypescript from 'ttypescript';

const defaults = {
  input: 'src/index.ts'
};

export default [
  {
    ...defaults,
    output: {
      dir: 'dist/cjs',
      format: 'cjs'
    },
    plugins: [
      typescript({
        outDir: './dist/cjs',
        declarationDir: 'dist/cjs',
        typescript: ttypescript
      })
    ]
  },
  {
    ...defaults,
    output: {
      dir: 'dist/esm',
      format: 'es'
    },
    plugins: [
      typescript({
        outDir: './dist/esm',
        declarationDir: 'dist/esm',
        typescript: ttypescript
      })
    ]
  }
];

import typescript from '@rollup/plugin-typescript';
import ttypescript from 'ttypescript';

const defaults = {
  input: 'src/index.ts'
};

console.log(process.env.ROLLUP_WATCH);
export default [
  {
    ...defaults,
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true
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
      format: 'es',
      sourcemap: true
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

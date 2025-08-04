import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next'],
  treeshake: true,
  minify: true,
  outDir: 'dist',
  tsconfig: './tsconfig.lib.json',
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
}); 
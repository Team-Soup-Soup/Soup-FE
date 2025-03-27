import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  external: [],
  format: ['esm', 'cjs'],
  dts: true,
});

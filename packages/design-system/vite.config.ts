import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  resolve: {
    alias: {
      '@soup/design-system': path.resolve(
        __dirname,
        'node_modules/@soup/design-system/dist',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@storybook/docs-renderer'],
  },
});

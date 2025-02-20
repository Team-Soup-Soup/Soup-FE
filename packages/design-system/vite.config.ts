import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@soup/design-system': path.resolve(
        __dirname,
        'node_modules/@soup/design-system/dist',
      ),
    },
  },
});

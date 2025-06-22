import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      root: './',
      projects: [path.resolve(__dirname, 'tsconfig.json')],
    }),
  ],
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],

  build: {
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  },

  resolve: {
    alias: [
      { find: '@src', replacement: path.resolve(__dirname, 'src') },
      { find: '@console', replacement: path.resolve(__dirname, 'src/console') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
    ],
  },

  server: {
    port: 3000,
    open: true,
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
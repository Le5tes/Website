/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths'


import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      ...angular({
        tsconfig: 'src/tsconfig.spec.json'
      }),
      viteTsConfigPaths({
        projects: ['./tsconfig.json', './src/tsconfig.spec.json']
      })
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.spec.ts'],
      exclude: ['src/**/*.e2e-spec.ts', 'e2e/**/*'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});

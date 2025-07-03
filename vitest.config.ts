import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/**/*.e2e-spec.ts', 'e2e/**/*']
  },
  resolve: {
    alias: {
      'src/': '/src/'
    }
  }
});

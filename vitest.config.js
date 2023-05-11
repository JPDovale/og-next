/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@components/': '/src/components/',
      '@contexts/': '/src/contexts/',
      '@api/': '/src/api/',
      '@hooks/': '/src/hooks/',
      '@layouts/': '/src/layouts/',
      '@pages/': '/src/pages/',
      '@services/': '/src/services/',
      '@styles/': '/src/styles/',
    },
  },
})

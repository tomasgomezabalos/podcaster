import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'cross-env NODE_ENV=test BROWSER=none yarn dev',
    port: 3000
  },
  reporter: 'list'
});

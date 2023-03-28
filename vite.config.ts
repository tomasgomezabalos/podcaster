import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  test:{
    globals:true,
    environment:'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    include: ['./tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage:{
      provider:'c8',
      reporter: ['text', 'lcov'],
    }
  }
});

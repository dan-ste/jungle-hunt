/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/jungle-hunt/',
  plugins: [react()],
  server: { port: 5190, strictPort: true },
});

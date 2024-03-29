import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Check if running in production mode
const isProduction = process.env.NODE_ENV === 'PRODUCTION';

let serverConfig;

// Configure HTTPS only for production environment
if (isProduction) {
  serverConfig = {
    port: 4000, // Default port
    https: {
      key: fs.readFileSync(path.resolve('/home/st111/cert/server.key')),
      cert: fs.readFileSync(path.resolve('/home/st111/cert/server.crt')),
    },
  };
} else {
  serverConfig = {
    port: 5173,
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: serverConfig,
  preview: serverConfig
})

// filepath: /Users/jethrothao/Graphic-Cards-Marketplace/Client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'log-env', // Custom plugin to log environment variables
      config() {
        // Log the value of VITE_API_URL during build
        console.log('VITE_API_URL:', process.env.VITE_API_URL);
      },
    },
  ],
  root: '.', // Ensure this points to the directory containing index.html
});
// filepath: /Users/jethrothao/Graphic-Cards-Marketplace/Client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure this points to the directory containing index.html
});
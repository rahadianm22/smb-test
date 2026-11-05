import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build statis: Vercel mendeteksi Vite otomatis (output ke dist/).
export default defineConfig({
  plugins: [react()]
});

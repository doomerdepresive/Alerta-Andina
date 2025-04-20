import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // Permite conexiones desde cualquier IP
    port: 5173,      // Usa este puerto específicamente
    strictPort: true, // No cambia el puerto si está ocupado
    open: true       // Abre el navegador automáticamente
  }
});
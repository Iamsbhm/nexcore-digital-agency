import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Target modern browsers with iOS Safari compatibility
      target: ['es2020', 'safari14'],
      // Split CSS per chunk — only load styles for what's rendered
      cssCodeSplit: true,
      // Increase warning limit (we split chunks so individual files are smaller)
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Manual chunk splitting — separates vendor libs from app code
          // This means React/motion only re-downloaded when THEY change, not app code
          manualChunks: {
            // Core React runtime — rarely changes
            'react-vendor': ['react', 'react-dom'],
            // Animation library — large, separate chunk
            'motion':       ['motion/react'],
            // Icon library — tree-shaken but still worth isolating
            'icons':        ['lucide-react'],
          },
        },
      },
    },
  };
});

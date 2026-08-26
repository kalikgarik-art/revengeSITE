import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function standaloneHtmlPlugin(): Plugin {
  return {
    name: 'standalone-html-plugin',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      // Remove type="module" and crossorigin in built bundle so script executes directly on file:/// without CORS/ES module blocks
      return html
        .replace(/<script\b([^>]*?)\btype=["']module["']([^>]*?)>/gi, (match, before, after) => {
          const cleaned = `${before} ${after}`.replace(/\bcrossorigin(=["'][^"']*["'])?/gi, '').trim();
          return cleaned ? `<script ${cleaned}>` : '<script>';
        })
        .replace(/<link\s+rel=["']modulepreload["'][^>]*>/gi, '');
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), viteSingleFile(), standaloneHtmlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'esnext',
      modulePreload: false,
      assetsInlineLimit: 100000000,
      chunkSizeWarningLimit: 100000000,
      cssCodeSplit: false,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

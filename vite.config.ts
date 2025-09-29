import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist/legacy/build/pdf'],
  },
  worker: {
    format: 'es',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      external: (id) => {
        // Externalize browser-only libraries for SSR
        if (id.includes('heic2any')) return true;
        return false;
      },
    },
  },
  ssr: {
    external: ['heic2any', 'canvas'],
    noExternal: ['pdfjs-dist'],
  },
}));

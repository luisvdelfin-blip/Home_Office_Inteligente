import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/",
  
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
        },
      },
    },
    // Ensure assets are properly handled
    assetsInlineLimit: 4096,
  },

  // Development server config
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },

  // Preview server config (for testing production builds)
  preview: {
    host: "0.0.0.0",
    port: 4173,
    strictPort: true,
  },

  // Plugins
  plugins: [
    react(),
  ],

  // Path resolution
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Ensure proper CSS handling
  css: {
    postcss: "./postcss.config.js",
  },
}));
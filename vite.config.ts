import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin to prevent React 19 dev profiler from throwing SecurityError when traversing cross-origin frames in AI Studio preview
function crossOriginReactDevPatchPlugin(): Plugin {
  return {
    name: 'cross-origin-react-dev-patch',
    transform(code, id) {
      if (id.includes('react-dom') || id.includes('react_dom')) {
        let patched = code;
        if (patched.includes('function readReactElementTypeof')) {
          patched = patched.replace(
            /function readReactElementTypeof\(value\)\s*\{[\s\S]*?return\s+["']?\$\$typeof["']?\s+in\s+value[\s\S]*?:\s*void 0;?\s*\}/g,
            `function readReactElementTypeof(value) {
              try {
                return (value && typeof value === "object" && "$$typeof" in value && Object.prototype.hasOwnProperty.call(value, "$$typeof"))
                  ? value.$$typeof
                  : void 0;
              } catch {
                return void 0;
              }
            }`
          );
        }
        return patched;
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [crossOriginReactDevPatchPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

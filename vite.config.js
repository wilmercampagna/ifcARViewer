import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/ifcARViewer/",
  plugins: [
    vue(),
    glsl({
      include: [
        '**/*.glsl', '**/*.wgsl',
        '**/*.vert', '**/*.frag',
        '**/*.vs', '**/*.fs'
      ],
    }),
    VitePWA(
      {
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        clientsClaim: true,
        skipWaiting: true,
        sourcemap: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
            }
          },
          {
            handler: 'NetworkOnly',
            urlPattern: /\/api\/.*\/*.json/,
            method: 'POST',
            options: {
              backgroundSync: {
                name: 'myQueueName',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          },
        ]
      },
      devOptions: {
        enabled: true,
      },
      manifest:
        {
          "name": "ifcAR",
          "id": "/ifcAR/",
          "short_name": "ifcAR",
          "start_url": ".",
          "background_color": "#ffffff",
          "theme_color": "#ffffff",
          "display": "standalone",
          "display_override": [
            "window-controls-overlay",
            "standalone",
            "browser",
            "side_panel"
          ],
          "side_panel": {
            "preferred_width": 600
          },
          "handle_links": "auto",
          "icons": [
            {
              "src": "logo192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "logo256.png",
              "sizes": "256x256",
              "type": "image/png"
            },
            {
              "src": "logo512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            }
          ],
          "description": "ifcAR Viewer es una aplicación web que permite cargar archivos IFC y visualizarlos en 3D y en realidad aumentada.",
          "orientation": "portrait-primary",
          "dir": "auto",
          "lang": "es",
          "categories": [
            "education",
            "navigation",
            "productivity",
            "construction"
          ],
          "screenshots" : [
            {
              "src": "screenshot.png",
              "sizes": "1442x764",
              "type": "image/png",
              "platform": "wide",
            }
          ],
        }
      }
    ),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three'],
          'ifc-engine': ['web-ifc-three'],
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
        }
      }
    }
  },
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://wilmercampagna.github.io/ifcUV",
  plugins: [
    vue(),
    glsl({
      include: [                   // Glob pattern, or array of glob patterns to import
        '**/*.glsl', '**/*.wgsl',
        '**/*.vert', '**/*.frag',
        '**/*.vs', '**/*.fs'
      ],
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    VitePWA(
      {
      registerType: "autoUpdate",
      // injectRegister: 'auto',      
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        clientsClaim: true,
        skipWaiting: true,
        sourcemap: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
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
          "name": "ifc4all",
          "id": "/ifc4all/",
          "short_name": "ifc4all",
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
          "description": "Ifc4all es una iniciativa open source, en la que es espera desarrollar una serie de herramientas que tomen como base archivos ifc",
          "orientation": "portrait-primary",
          "dir": "auto",
          "lang": "en-US",
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
})

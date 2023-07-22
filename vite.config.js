import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
              "src": "./src/assets/logo192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "./src/assets/logo256.png",
              "sizes": "256x256",
              "type": "image/png"
            },
            {
              "src": "./src/assets/logo512.png",
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
              "src": "./src/assets/screenshot.png",
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

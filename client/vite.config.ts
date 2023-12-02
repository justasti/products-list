import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifest: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable_icon.png'],
  manifest: {
    name: 'Shopping List',
    short_name: 'shoplist',
    description: 'App to create shopping lists easily',
    icons: [
      {
        src: 'public/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: 'public/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: 'public/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: 'public/maskable_icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
})

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/

export default({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
    define: {
      'process.env': loadEnv(mode, process.cwd(), ''),
    },
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          // '/api' 로 들어오면 포트 8080(스프링 서버)로 보낸다
          target: 'http://localhost:8080',
          changeOrigin: true // cross origin 허용
        }
      }
    }
  })
} 


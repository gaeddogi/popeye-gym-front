import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    // To access env vars here use process.env.TEST_VAR
    define: {
      'process.env': loadEnv(mode, process.cwd(), ''),
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
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
  });
}


// export default defineConfig({
//   define: {
//     'process.env': loadEnv(mode, process.cwd(), ''),
//   },
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   server: {
//     port: 3000,
//     proxy: {
//       '/api': {
//         // '/api' 로 들어오면 포트 8080(스프링 서버)로 보낸다
//         target: 'http://localhost:8080',
//         changeOrigin: true // cross origin 허용
//       }
//     }
//   }
// });

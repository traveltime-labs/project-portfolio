import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path';
// import { visualizer } from 'rollup-plugin-visualizer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: mode === 'production' ? '/Portfolio_admin/' : '/',
    //base: '/Portfolio_admin/', // base: '/Portfolio/backend/',
    server: {
      host: true
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      tailwindcss(),
      Pages({
        dirs: 'src/views', // 預設掃描資料夾
        extensions: ['vue'],
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'], // 那些plugin要自動引入
        dirs: ['src/assets/ts', 'src/composables', 'src/icons', 'src/types', 'src/stores'], // 自定義模組
        dts: 'src/auto-imports.d.ts'
      }),
      Components({
        dirs: 'src/components/',
        dts: 'src/components.d.ts', // 生成組件類型定義
        deep: true,
      }),
      // visualizer({ 
      //   open: true, // 設定是否開啟打包分析畫面
      //   filename: 'stats.html', // 產生文件檔案
      //   gzipSize: true, // gzip 相關資訊顯示
      //   brotliSize: true // 收集 brotli 相關資訊顯示
      // }),
      createSvgIconsPlugin({
        // 指定存放 SVG 圖示的目錄
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定 symbolId 格式
        symbolId: '[dir]/[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    build: {
      // chunkSizeWarningLimit: 1500
      chunkSizeWarningLimit: 60, // 預設 500KB, 只針對 JS
      assetsInlineLimit: 1096, // < 1096KB 資源將內連為 base64
      rollupOptions: {
        output: {
          outDir: mode === 'production' ? 'dist' : 'dist_dev',
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames: assetInfo => {
            const rawName = (Array.isArray((assetInfo as any).names) ? (assetInfo as any).names[0] : assetInfo.name) || ''
            const ext = rawName.split('.').pop() || ''

            if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) return 'images/[name]-[hash][extname]'
            if (['css'].includes(ext)) return 'css/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          }
        }
      }
    }
  }
})

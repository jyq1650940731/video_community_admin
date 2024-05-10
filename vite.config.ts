import { fileURLToPath, URL } from 'node:url';

import { UserConfigExport, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // process.cwd(): index根目录
  // env:获取当前环境下信息
  let env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], //图标存放路径
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/types', import.meta.url)),
        images: fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "sass:math";@import "@/assets/styles/variables/variables.module.scss";',
        },
      },
    },
    server: {
      //用来配置跨域
      host: 'localhost',
      port: 5173,
      proxy: {
        '/dev-api': {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  };
};

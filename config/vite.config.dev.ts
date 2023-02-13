import {mergeConfig} from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: false,
      fs: {
        strict: true,
      },
      cors: true,
      proxy: {
        "/": {
          target: "http://127.0.0.1:11000",
          changeOrigin: true,
          rewrite: (path: string) => path
        }
      }
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);

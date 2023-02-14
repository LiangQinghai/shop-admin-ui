import {mergeConfig} from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
import {viteMockServe} from "vite-plugin-mock";

export default mergeConfig(
  {
    mode: 'mock',
    server: {
      open: false,
      fs: {
        strict: true,
      }
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
      // mockjs：需要注意的是mockPath必须配置
      viteMockServe({
        mockPath: "../src/mock/", // 解析，路径可根据实际变动
        localEnabled: true, // 此处可以手动设置为true，也可以根据官方文档格式
        supportTs: false,
        logger: true
      })
    ],
  },
  baseConfig
);

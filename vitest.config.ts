import { resolve } from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'temp']
  },
  resolve: {
    alias: [
      {
        find: '@middy/core',
        replacement: resolve(
          __dirname,
          'src/layers/nodejs/node_modules/@middy/core'
        )
      },
      {
        find: '@middy/validator',
        replacement: resolve(
          __dirname,
          'src/layers/nodejs/node_modules/@middy/validator'
        )
      },
      {
        find: '@middy/http-header-normalizer',
        replacement: resolve(
          __dirname,
          'src/layers/nodejs/node_modules/@middy/http-header-normalizer'
        )
      },
      {
        find: '@middy/http-json-body-parser',
        replacement: resolve(
          __dirname,
          'src/layers/nodejs/node_modules/@middy/http-json-body-parser'
        )
      }
    ]
  }
});

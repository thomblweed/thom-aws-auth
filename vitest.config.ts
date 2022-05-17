import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
      }
    ]
  }
});

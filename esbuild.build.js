require('esbuild')
  .build({
    format: 'cjs',
    entryPoints: ['src/login/login.ts'],
    bundle: true,
    platform: 'node',
    target: ['node14.18.1'],
    outdir: 'src',
    tsconfig: 'tsconfig.json'
  })
  .catch(() => process.exit(1));

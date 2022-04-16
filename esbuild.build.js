require('esbuild')
  .build({
    format: 'cjs',
    entryPoints: ['login/login.ts'],
    bundle: true,
    platform: 'node',
    target: ['node14.18.1'],
    outdir: 'login',
    tsconfig: 'tsconfig.json'
  })
  .catch(() => process.exit(1));

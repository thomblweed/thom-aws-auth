require('esbuild')
  .build({
    format: 'cjs',
    entryPoints: ['lambdas/login/login.ts'],
    bundle: true,
    platform: 'node',
    target: ['node14.18.1'],
    outdir: 'lambdas',
    tsconfig: 'tsconfig.json'
  })
  .catch(() => process.exit(1));

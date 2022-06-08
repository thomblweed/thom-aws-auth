require('esbuild')
  .build({
    format: 'cjs',
    entryPoints: ['src/lambdas/login/login.ts', 'src/lambdas/logout/logout.ts'],
    bundle: true,
    platform: 'node',
    target: ['node14.18.1'],
    outdir: 'dist',
    tsconfig: 'tsconfig.json'
  })
  .catch(() => process.exit(1));

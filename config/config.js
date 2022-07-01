require('esbuild').build({
    entryPoints: ['./src/sw.js', './src/scripts/scrappingLinkedin.js', './src/scripts/scrapping.candidates.js'],
    bundle: true,
    target: ['chrome58', 'firefox57', 'safari11'],
    outdir: './dist',
    watch: true
})
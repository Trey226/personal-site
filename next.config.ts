module.exports = {
    output: 'standalone',
    outputFileTracingExcludes: {
        'api/**/*': [
            './node_modules/**/*',
            './_data/**/*',
            './app/**/*',
            './components/**/*',
            './public/**/*',
        ]
    }

  }

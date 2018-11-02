module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 5 years'],
        },
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-stage-0',
      { pipelineProposal: 'minimal', decoratorsLegacy: true, loose: true },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['import', { libraryName: 'antd', style: 'css' }],
  ],
  env: {
    dev: {
      plugins: ['react-hot-loader/babel'],
    },
  },
}

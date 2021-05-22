module.exports = (api) => {
  api.cache.never();
  // api.assertVersion("^7.4.5");

  return {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      // '@loadable/babel-plugin',
      ['@babel/plugin-transform-modules-commonjs', {
        'allowTopLevelThis': true
      } ],
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-proposal-class-properties',
      // ["@babel/plugin-proposal-decorators", {
      //   "decoratorsBeforeExport": true
      // } ],
      '@babel/plugin-proposal-export-default-from',
      // "@babel/plugin-proposal-export-namespace-from",
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-template-literals',
      // ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" } ],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-classes'
    ],
    presets: [
      [
        '@babel/preset-env', { 'targets':{ 'node':'current' } },
        '@babel/preset-react'
      ]
    ],
    env: {
      'development': {
        'presets': [
          [
            '@babel/preset-react',
            {
              'development': true
            }
          ]
        ]
      },
      'production': {
        'plugins': [
          [
            'transform-react-remove-prop-types',
            {
              'mode': 'wrap',
              'ignoreFilenames': [
                'node_modules'
              ]
            }
          ]
        ]
      }
    }
  };
};

module.exports = (api) => {
  api.cache.never();

  return {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-transform-modules-commonjs', {
        'allowTopLevelThis': true
      } ],
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-template-literals',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-classes'
    ],
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    env: {
      // 'development': {
      //   'presets': [
      //     [
      //       '@babel/preset-react',
      //       {
      //         'development': true
      //       }
      //     ]
      //   ]
      // },
      'production': {
        'plugins': [
          ['transform-react-remove-prop-types',
          {
            'mode': 'wrap',
            'ignoreFilenames': [
              'node_modules'
            ]
          } ]
        ]
      }
    }
  };
};

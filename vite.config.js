const webDocPlugin = require('./plugins/vite-plugin-web-doc');

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: [
    webDocPlugin({
      docs: [
        
      ]
    })
  ],
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  build: {
    outDir: 'site'
  },
};

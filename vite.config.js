const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const webDocPlugin = require('./plugins/vite-plugin-web-doc');

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: webDocPlugin(),
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production',
  },
  optimizeDeps: {
    exclude: ['__INDEX__']
  },
  build: {
    outDir: 'site',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
        }),
      ],
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
};

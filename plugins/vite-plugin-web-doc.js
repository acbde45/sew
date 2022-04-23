const createVuePlugin = require('@vitejs/plugin-vue');
const indexTransformPlugin = require('./vite-plugin-index-transform');
const getTransformedVueSrc = require('./utils/get-demo-by-path');

const fileRegex = /\.(md|vue)$/;

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
});

const createDemoPlugin = () => {
  const webDocPlugin = {
    name: 'web-doc',
    transform(_, id) {
      if (fileRegex.test(id)) {
        return getTransformedVueSrc(id);
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx;
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file);
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        });
      }
    }
  };

  return [indexTransformPlugin, webDocPlugin, vuePlugin];
};

module.exports = createDemoPlugin;

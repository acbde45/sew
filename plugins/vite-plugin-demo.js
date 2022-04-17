const createVuePlugin = require('@vitejs/plugin-vue');
const getTransformedVueSrc = require('./utils/get-demo-by-path');

const fileRegex = /\.(md|vue)$/;

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
});

const createDemoPlugin = () => {
  const naiveDemoVitePlugin = {
    name: 'demo-vite',
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

  return [naiveDemoVitePlugin, vuePlugin];
};

module.exports = createDemoPlugin;

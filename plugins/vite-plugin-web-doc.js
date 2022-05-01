const createVuePlugin = require('@vitejs/plugin-vue');
const indexTransformPlugin = require('./vite-plugin-index-transform');
const transformDocFile = require('./utils/transform-doc-file');
const transformMenuOptionsFile = require('./utils/transform-menu-options-file');
const transformSetupFile = require('./utils/transform-setup-file');

const fileRegex = /\.(md|vue)$/;
const menuOptionsFileRegex = /store\/menu-options\.js$/;
const setupFileRegex = /setup\.js$/;

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
});

const createDemoPlugin = (config) => {
  const webDocPlugin = {
    name: 'web-doc',
    transform(_, id) {
      if (fileRegex.test(id)) {
        return transformDocFile(id);
      }
      if (menuOptionsFileRegex.test(id)) {
        return transformMenuOptionsFile(id, config);
      }
      if (setupFileRegex.test(id)) {
        return transformSetupFile(id, config);
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx;
      if (menuOptionsFileRegex.test(file)) {
        const code = await transformMenuOptionsFile(file, config);
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        });
      }
      if (setupFileRegex.test(file)) {
        const code = await transformSetupFile(file, config);
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        });
      }
      if (fileRegex.test(file)) {
        const code = await transformDocFile(file);
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code
        });
      }
     
      return ctx;
    }
  };

  return [indexTransformPlugin, webDocPlugin, vuePlugin];
};

module.exports = createDemoPlugin;

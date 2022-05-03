const slash2 = require('slash2');
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
      if (~id.search(slash2(__dirname)) && menuOptionsFileRegex.test(id)) {
        return transformMenuOptionsFile(id, config);
      }
      if (~id.search(slash2(__dirname)) && setupFileRegex.test(id)) {
        return transformSetupFile(id, config);
      }
    },
  };

  return [indexTransformPlugin, webDocPlugin, vuePlugin];
};

module.exports = createDemoPlugin;

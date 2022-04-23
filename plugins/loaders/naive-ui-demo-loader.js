const { convertMd2Demo } = require('./convert-md-to-demo');
const convertVue2Demo = require('./convert-vue-to-demo');

module.exports = function (content, path, type) {
  const relativeUrl = path.replace(process.cwd() + '/', '')
  if (type === 'vue') {
    return convertVue2Demo(content, {
      relativeUrl,
      resourcePath: path,
      isVue: true
    });
  }
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: path,
    isVue: false
  });
};

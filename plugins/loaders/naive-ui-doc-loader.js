const convertMd2Doc = require('./convert-md-to-doc');

module.exports = async function (content, path) {
  const env = process.env.NODE_ENV;
  const relativeUrl = path.replace(process.cwd() + '/', '');
  return convertMd2Doc(content, relativeUrl, env);
};

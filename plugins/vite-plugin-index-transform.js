const fs = require('fs');
const path = require('path');

const transformIndexHtml = (code) => {
  return code.replace(/__VUE-WEB-DOC-INDEX__/, path.join(__dirname, './www/index.js'));
};

function generateUrl(url) {
  if (!url) {
    return '/';
  }
  // url with parameters
  if (url.indexOf('?') > 0) {
    return url.split('?')[0];
  }
  return url;
}

function indexTransformPlugin() {
  return {
    name: 'index-transform',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          exclude: ['__VUE-WEB-DOC-INDEX__']
        },
        esbuild: {
          jsxFactory: 'h',
          jsxFragment: 'Fragment'
        }
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use('/', async (req, res, next) => {
          const url = decodeURI(generateUrl(req.url));
          // if request is not html , directly return next()
          if (!~url.search('web-doc.html')) {
            return next();
          }
          const htmlCode = (await this.load(url)) ?? '';
          // @ts-ignore
          res.write(await server.transformIndexHtml(url, htmlCode));
          next();
        });
      };
    },
    async load(id) {
      if (~id.search('web-doc.html')) {
        const html = await fs.readFileSync(path.join(__dirname, 'www', id), { encoding: 'utf8' });
        return html;
      }
      return null;
    },
    transform(code, id) {
      if (~id.search('web-doc.html')) {
        return { code: transformIndexHtml(code), map: null };
      }
    },
    transformIndexHtml
  };
}

module.exports = indexTransformPlugin();

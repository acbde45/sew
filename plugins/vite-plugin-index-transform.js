const fs = require('fs');
const path = require('path');

const transformIndexHtml = (code) => {
  const htmlPath = path.resolve(__dirname, './www/index.js');
  return code.replace(/__VUE-WEB-DOC-INDEX__/, path.relative(process.cwd(), htmlPath));
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
          // if request is not html , directly return next()
          if (!~req.originalUrl.search('web-doc.html')) {
            return next();
          }
          if (!req.originalUrl.endsWith('web-doc.html')) {
            res.writeHead(301, {'Location': '/web-doc.html'});
            res.end();
            return next();
          }
          const url = decodeURI(generateUrl(req.url));
          const htmlCode = (await this.load(url)) ?? '';
          // @ts-ignore
          res.write(await server.transformIndexHtml(url, htmlCode));
          next();
        });
      };
    },
    async load(id) {
      if (id.endsWith('web-doc.html')) {
        const html = await fs.readFileSync(path.join(__dirname, 'www', id), { encoding: 'utf8' });
        return html;
      }
      return null;
    },
    transform(code, id) {
      if (id.endsWith('web-doc.html')) {
        return { code: transformIndexHtml(code), map: null };
      }
    },
    transformIndexHtml
  };
}

module.exports = indexTransformPlugin();

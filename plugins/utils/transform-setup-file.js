const fs = require('fs-extra');
const nodePath = require('path');
const slash = require('slash2');

function getRelativePath(...paths) {
  return slash(nodePath.relative(
    nodePath.join(__dirname, '../www'),
    nodePath.join(...paths)
  ));
}

module.exports = async function transformSetupFile(path, config) {
  let code = await fs.readFile(path, 'utf-8');
  const components = config.components;

  let imports = [];
  let appUseComponents = [];
  Object.keys(components).forEach((key, index) => {
    imports.push(`import Component${index} from "${getRelativePath(process.cwd(), components[key])}";`);
    appUseComponents.push(`app.component('${key}', Component${index})`);
  })

  imports = imports.join('\n');
  appUseComponents = appUseComponents.join('\n');

  code = imports + '\n' + code;
  code = code.replace(
    /<!--INSTALL_COMPONENTS_SLOT-->/,
    appUseComponents
  );

  return code;
};

const fs = require('fs-extra');
const nodePath = require('path');

const ROOT_DIR = 'docs';
const INDEX = 'index.md';
const INDEX_DEMO_ENTRY = 'index.demo-entry.md';
const COMPONENTS = 'components';

function getRelativePath(...paths) {
  return nodePath.relative(
    nodePath.join(__dirname, '../www/store/'),
    nodePath.join(...paths)
  );
}

module.exports = async function transformMenuOptionsFile(path, config) {
  let code = await fs.readFile(path, 'utf-8');

  const menuOptions = {};
  const headerMenuOptions = [];

  Object.keys(config.docs).forEach((key) => {
    const docsDir = nodePath.join(process.cwd(), ROOT_DIR, key);
    const headerOptions = config.docs[key];
    const options = headerOptions.menuOptions;

    headerMenuOptions.push({
      key,
      label: headerOptions.title,
      path: headerOptions.link
    });

    options.forEach((option) => {
      if (option.type === 'group') {
        option?.children?.forEach((childOption) => {
          childOption.filerRlativePath = getRelativePath(
            docsDir,
            childOption.name,
            key === COMPONENTS ? INDEX_DEMO_ENTRY : INDEX
          );
        });
      } else {
        option.filerRlativePath = getRelativePath(
          docsDir,
          option.name,
          key === COMPONENTS ? INDEX_DEMO_ENTRY : INDEX
        );
      }
    });

    menuOptions[key] = options;
  });

  code = code.replace(
    /<!--HEADER_MENU_OPTIONS_SLOT-->/,
    JSON.stringify(headerMenuOptions, null, 2)
  );
  code = code.replace(
    /<!--MENU_OPTIONS_SLOT-->/,
    JSON.stringify(menuOptions, null, 2)
  );

  return code;
};

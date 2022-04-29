// rubbish code here

import { h } from 'vue';
import { RouterLink } from 'vue-router';

export const renderMenuLabel = (option) => {
  if (!('path' in option) || option.label === '--Debug') {
    return option.label;
  }
  return h(
    RouterLink,
    {
      to: option.path
    },
    { default: () => option.label }
  );
};

const appendCounts = (item) => {
  if (!item.children) {
    item.count = 1;
    return item;
  }
  if (item.children) {
    item.children.forEach(appendCounts);
    item.count = item.children.reduce((sum, item) => sum + item.count, 0);
    if (item.type === 'group') {
      item.label += ` (${item.count})`;
    }
    return item;
  }
};

function createItems(prefix, items) {
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      path: rawItem.path ? prefix + rawItem.path : undefined
    };
    if (rawItem.children) {
      item.children = createItems(prefix, rawItem.children);
    }
    return item;
  });
}

export function createMenuOptions({ mode }) {
  const menuOptions = <!--MENU_OPTIONS_SLOT-->; 

  let result = {};
  Object.keys(menuOptions).forEach(key => {
    result[key] = createItems('/' + key, menuOptions[key].map(option => {
      if (option.type === 'group' && option.name === 'components') {
        return appendCounts(option);
      }
      return option;
    }));
  });
  return result;
}

export function createHeaderMenuOptions({ mode }) {
  const menuOptions = <!--HEADER_MENU_OPTIONS_SLOT-->;
  return menuOptions;
}

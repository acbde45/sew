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
      item.en += ` (${item.count})`;
      item.zh += ` (${item.count})`;
    }
    return item;
  }
};

function createItems(prefix, items) {
  return items.map((rawItem) => {
    const item = {
      ...rawItem,
      key: rawItem.en,
      label: rawItem.zh,
      path: rawItem.path ? prefix + rawItem.path : undefined
    };
    if (rawItem.children) {
      item.children = createItems(prefix, rawItem.children);
    }
    return item;
  });
}

export function createDocumentationMenuOptions({ mode }) {
  return createItems('/docs', [
    {
      en: 'Introduction',
      zh: '介绍',
      type: 'group',
      children: [
        {
          en: 'Vue Admin',
          zh: 'Vue Admin',
          path: '/introduction'
        }
      ]
    }
  ]);
}

export function createComponentMenuOptions({ mode }) {
  return createItems('/components', [
    appendCounts({
      zh: '通用组件',
      en: 'Common Components',
      type: 'group',
      children: [
        {
          en: 'Button',
          zh: '按钮',
          enSuffix: true,
          path: '/button'
        }
      ]
    })
  ]);
}

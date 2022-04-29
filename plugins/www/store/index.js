import { computed, ref } from 'vue';
import hljs from './hljs';
import { createMenuOptions, createHeaderMenuOptions } from './menu-options';

// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug');
const displayModeRef = computed({
  get() {
    return _displayModeRef.value;
  },
  set(value) {
    _displayModeRef.value = value;
    window.localStorage.setItem('mode', value);
  }
});

export function useDisplayMode() {
  return displayModeRef;
}

// options
const menuOptionsRef = computed(() =>
  createMenuOptions({
    mode: displayModeRef.value
  })
);
const headerMenuOptionsRef = computed(() =>
  createHeaderMenuOptions({
    mode: displayModeRef.value
  })
);
const flattenedMenuOptionsRef = computed(() => {
  const flattenedItems = [];
  const traverse = (items) => {
    if (!items) return;
    items.forEach((item) => {
      if (item.children) traverse(item.children);
      else flattenedItems.push(item);
    });
  };
  Object.values(menuOptions).forEach((options) => {
    traverse(options);
  });

  return flattenedItems;
});

export function useMenuOptions() {
  return menuOptionsRef;
}

export function useHeaderMenuOptions() {
  return headerMenuOptionsRef;
}

export function useFlattenedDocOptions() {
  return flattenedMenuOptionsRef;
}

export function siteSetup() {
  return {
    hljs
  };
}

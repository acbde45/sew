import { computed, ref } from 'vue';
import hljs from './hljs';
import {
  createDocumentationMenuOptions,
  createComponentMenuOptions
} from './menu-options';

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
const docOptionsRef = computed(() =>
  createDocumentationMenuOptions({
    mode: displayModeRef.value
  })
);
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    mode: displayModeRef.value
  })
);
const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = [];
  const traverse = (items) => {
    if (!items) return;
    items.forEach((item) => {
      if (item.children) traverse(item.children);
      else flattenedItems.push(item);
    });
  };
  traverse(docOptionsRef.value);
  traverse(componentOptionsRef.value);
  return flattenedItems;
});

export function useDocOptions() {
  return docOptionsRef;
}

export function useComponentOptions() {
  return componentOptionsRef;
}

export function useFlattenedDocOptions() {
  return flattenedDocOptionsRef;
}

export function siteSetup() {
  return {
    hljs
  };
}

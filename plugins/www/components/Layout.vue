<template>
  <n-layout
    id="doc-layout"
    :has-sider="showSider"
    position="absolute"
    :style="{
      top: 'var(--header-height)'
    }"
  >
    <n-layout-sider
      v-if="showSider"
      :native-scrollbar="false"
      :collapsed-width="0"
      collapse-mode="transform"
      trigger-style="top: 240px;"
      collapsed-trigger-style="top: 240px; right: -20px;"
      bordered
      show-trigger="arrow-circle"
    >
      <n-menu
        :value="menuValue"
        :options="options"
        :render-label="renderMenuLabel"
      />
    </n-layout-sider>
    <n-layout
      ref="layoutInstRef"
      :scrollbar-props="layoutScrollbarProps"
      :native-scrollbar="false"
      :position="showSider ? 'static' : 'absolute'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
// Frame component for components & docs page
import { defineComponent, computed, watch, toRef, ref } from 'vue';
import { useRoute } from 'vue-router';
import { findMenuValue } from '../utils/route';
import { useDocOptions, useComponentOptions } from '../store';
import { renderMenuLabel } from '../store/menu-options';
import { useMemo } from 'vooks';

export default defineComponent({
  setup() {
    const route = useRoute();
    const layoutInstRef = ref(null);
    const docOptionsRef = useDocOptions();
    const componentOptionsRef = useComponentOptions();
    const optionsRef = computed(() =>
      route.path.includes('/docs/')
        ? docOptionsRef.value
        : componentOptionsRef.value
    );

    const menuValueRef = computed(() => {
      return findMenuValue(optionsRef.value, route.path);
    });
    watch(toRef(route, 'path'), (value, oldValue) => {
      const langAndThemeReg = /\/(zh-CN|en-US)\/(light|dark|os-theme)/g;
      // only theme & lang change do not restore the scroll status
      if (
        value.replace(langAndThemeReg, '') !==
        oldValue.replace(langAndThemeReg, '')
      ) {
        layoutInstRef.value.scrollTo(0, 0);
      }
    });

    return {
      layoutScrollbarProps: {
        containerClass: 'document-scroll-container'
      },
      renderMenuLabel,
      showSider: true,
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef
    };
  }
});
</script>

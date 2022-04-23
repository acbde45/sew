<template>
  <n-layout-header bordered class="nav" :style="style">
    <n-text tag="div" class="ui-logo" :depth="1">
      <img src="./assets/images/naivelogo.svg" />
      <span>Vue Admin</span>
    </n-text>
    <div style="display: flex; align-items: center">
      <div class="nav-menu">
        <n-menu
          mode="horizontal"
          :value="menuValue"
          :options="menuOptions"
          :render-label="renderMenuLabel"
        />
      </div>
    </div>
    <div class="nav-end">
      <n-text class="nav-picker padded">
        {{ version }}
      </n-text>
      <n-button
        v-if="dev"
        size="small"
        quaternary
        class="nav-picker"
        @click="handleDisplayModeUpdate"
      >
        {{ displayModeLabelMap[displayMode] }}
      </n-button>
    </div>
  </n-layout-header>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { version } from 'naive-ui';
import { useDisplayMode } from './store';
import { renderMenuLabel } from './store/menu-options';

export default defineComponent({
  name: 'SiteHeader',
  setup() {
    const route = useRoute();
    // menu
    const menuOptionsRef = computed(() => {
      return [
        {
          key: 'doc',
          label: '文档',
          path: '/docs/introduction'
        },
        {
          key: 'component',
          label: '组件',
          path: '/components/button'
        }
      ];
    });
    const menuValueRef = computed(() => {
      if (/\/docs\//.test(route.path)) return 'doc';
      if (/\/components\//.test(route.path)) return 'component';
      else if (route.name === 'home') return 'home';
      return null;
    });

    // display mode
    const displayModeRef = useDisplayMode();
    const displayModeLabelMap = {
      common: 'Debug',
      debug: 'Prod'
    };
    function handleDisplayModeUpdate() {
      if (displayModeRef.value === 'common') {
        displayModeRef.value = 'debug';
      } else {
        displayModeRef.value = 'common';
      }
    }

    return {
      version,
      dev: __DEV__,
      renderMenuLabel,
      // menu
      menuOptions: menuOptionsRef,
      menuValue: menuValueRef,
      // displayMode
      displayMode: displayModeRef,
      displayModeLabelMap,
      handleDisplayModeUpdate,
      // common
      style: {
        '--side-padding': '32px',
        'grid-template-columns': 'calc(272px - var(--side-padding)) 1fr auto'
      }
    };
  }
});
</script>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 var(--side-padding);
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.ui-logo > img {
  margin-right: 12px;
  height: 32px;
  width: 32px;
}

.nav-menu {
  padding-left: 36px;
}

.nav-picker {
  margin-right: 4px;
}

.nav-picker.padded {
  padding: 0 10px;
}

.nav-picker:last-child {
  margin-right: 0;
}

.nav-end {
  display: flex;
  align-items: center;
}
</style>

<style>
.nav-menu .n-menu-item {
  height: calc(var(--header-height) - 1px) !important;
}
</style>

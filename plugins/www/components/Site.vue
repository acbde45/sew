<template>
  <n-layout position="absolute" class="root-layout">
    <SiteHeader />
    <router-view />
  </n-layout>
</template>

<script>
import { onMounted, defineComponent } from 'vue';
import { useLoadingBar } from 'naive-ui';
import SiteHeader from './SiteHeader.vue';
import { loadingBarApiRef } from '../routes/router';

export default defineComponent({
  name: 'Site',
  components: {
    SiteHeader
  },
  setup() {
    const loadingBar = useLoadingBar();
    onMounted(() => {
      loadingBarApiRef.value = loadingBar;
      loadingBar.finish();
    });
  }
});
</script>

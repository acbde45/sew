<template>
  <n-config-provider class="demo" namespace="naive-ui-doc" :hljs="hljs">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <Site />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineComponent } from 'vue';
import { siteSetup } from './store';
import Site from './Site.vue';

export default defineComponent({
  name: 'SiteProvider',
  components: {
    Site
  },
  setup() {
    return siteSetup();
  }
});
</script>

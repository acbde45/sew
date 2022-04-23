<template>
  <n-card
    v-if="showDemo"
    :id="demoFileName"
    class="demo-card"
    :segmented="{
      footer: true
    }"
    footer-style="padding: 0;"
  >
    <template #header>
      <span style="cursor: pointer" @click="handleTitleClick">
        <slot name="title" />
      </span>
    </template>
    <template #header-extra>
      <n-tooltip>
        <template #trigger>
          <edit-in-code-sandbox-button
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :code="showTs ? sfcTsCode : sfcJsCode"
          />
        </template>
        在 CodeSandbox 中编辑
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <copy-code-button
            depth="3"
            style="padding: 0; margin-right: 6px"
            size="tiny"
            :code="showTs ? sfcTsCode : sfcJsCode"
            success-text="复制成功"
          />
        </template>
        复制代码
      </n-tooltip>
      <n-tooltip ref="expandCodeButtonRef">
        <template #trigger>
          <n-button
            style="padding: 0"
            size="tiny"
            text
            depth="3"
            @click="toggleCodeDisplay"
          >
            <template #icon>
              <n-icon>
                <code-outline />
              </n-icon>
            </template>
          </n-button>
        </template>
        {{ !showCode ? '显示代码' : '收起代码' }}
      </n-tooltip>
    </template>
    <slot name="content" />
    <slot name="demo" />
    <template v-if="showCode" #footer>
      <n-tabs
        v-if="languageType === 'ts'"
        size="small"
        type="segment"
        style="padding: 12px 24px 0 24px"
        :value="showTs ? 'ts' : 'js'"
        @update:value="($e) => (showTs = $e === 'ts')"
      >
        <n-tab name="ts"> TypeScript </n-tab>
        <n-tab name="js"> JavaScript </n-tab>
      </n-tabs>
      <n-scrollbar
        x-scrollable
        content-style="padding: 20px 24px;"
        style="height: auto"
      >
        <n-code v-if="showTs" language="html" :code="sfcTsCode" />
        <n-code v-else language="html" :code="sfcJsCode" />
      </n-scrollbar>
    </template>
  </n-card>
</template>

<script>
import { defineComponent, computed, nextTick, ref, watch } from 'vue';
import { CodeOutline } from '@vicons/ionicons5';
import { useDisplayMode } from '../store';
import CopyCodeButton from './CopyCodeButton.vue';
import EditInCodeSandboxButton from './EditInCodeSandboxButton.vue';

export default defineComponent({
  components: {
    CodeOutline,
    CopyCodeButton,
    EditInCodeSandboxButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    tsCode: {
      type: String,
      required: true
    },
    demoFileName: {
      type: String,
      required: true
    },
    relativeUrl: {
      type: String,
      required: true
    },
    jsCode: {
      type: String,
      required: true
    },
    languageType: {
      type: String,
      default: 'js'
    }
  },
  setup(props) {
    const displayModeRef = useDisplayMode();
    const isDebugDemo = /(d|D)ebug/.test(props.demoFileName);
    const showDemoRef = computed(() => {
      return !(isDebugDemo && displayModeRef.value !== 'debug');
    });
    const showCodeRef = ref(false);
    const showTsRef = ref(props.languageType === 'ts');
    const expandCodeButtonRef = ref(null);
    watch(showCodeRef, () => {
      nextTick(() => {
        expandCodeButtonRef.value.syncPosition();
      });
    });
    return {
      expandCodeButtonRef,
      showDemo: showDemoRef,
      showCode: showCodeRef,
      showTs: showTsRef,
      sfcTsCode: decodeURIComponent(props.tsCode),
      sfcJsCode: decodeURIComponent(props.jsCode),
      toggleCodeDisplay() {
        showCodeRef.value = !showCodeRef.value;
      },
      handleTitleClick: () => {
        window.location.hash = `#${props.demoFileName}`;
      },
      toggleLanguageChange() {
        showTsRef.value = !showTsRef.value;
      },
    };
  }
});
</script>

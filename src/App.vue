<template>
  <div class="drag-parent">
    <DragBox :x="100" :y="100" />
  </div>
</template>

<script setup>
import DragBox from "./shared/components/drag-box/index.vue";
</script>

<style lang="scss" scoped>
.drag-parent {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div
    ref="container"
    class="drag-box"
    :style="positionStyles"
    @mousedown="handleContainerMouseDown"
  >
    {{ positionStyles.left }}-{{ positionStyles.top }}
  </div>
</template>

<script setup>
import { defineProps, computed, ref, onMounted, onUnmounted } from 'vue';

const events = new Map([
  ['mouseup', up],
  ['mousemove', move],
  ['mouseleave', up]
]);

const { x, y } = defineProps(['x', 'y']);

const container = ref(null);
const parentNode = computed(() => {
  return container?.value?.parentNode;
});
const savedPosition = ref({ pointerX: 0, pointerY: 0, x, y });
const bodyDrag = ref(false);

const positionStyles = computed(() => ({
  left: savedPosition.value.x + 'px',
  top: savedPosition.value.y + 'px',
}));

onMounted(() => {
  batchAddEvent(events);
});

onUnmounted(() => {
  batchRemoveEvent(events);
});

function batchAddEvent(events) {
  for (const [event, callback] of events) {
    document.documentElement.addEventListener(event, callback);
  }
}

function batchRemoveEvent(events) {
  for (const event of events) {
    const callback = events[event];
    document.documentElement.removeEventListener(event, callback);
  }
}

function handleContainerMouseDown(ev) {
  if (typeof ev.stopPropagation !== 'undefined') {
    ev.stopPropagation();
  }

  if (typeof ev.preventDefault !== 'undefined') {
    ev.preventDefault();
  }

  bodyDrag.value = true;
  savedPosition.value.pointerX = ev.pageX;
  savedPosition.value.pointerY = ev.pageY;
}

function move(ev) {
  ev.stopPropagation();
  if (!bodyDrag.value) return;
  const delta = {
    x: savedPosition.value.pointerX - ev.pageX,
    y: savedPosition.value.pointerY - ev.pageY
  };
  savedPosition.value.pointerX = ev.pageX;
  savedPosition.value.pointerY = ev.pageY;
  savedPosition.value.x = savedPosition.value.x - delta.x;
  savedPosition.value.y = savedPosition.value.y - delta.y;
}

function up(ev) {
  ev.stopPropagation();
  bodyDrag.value = false;
  savedPosition.value.pointerX = 0;
  savedPosition.value.pointerY = 0;
}
</script>

<style lang="scss" scoped>
.drag-box {
  position: absolute;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  background: #e1f3cc;
}
</style>

<template>
  <DraggableResizable
    v-if="visible"
    :x="100"
    :y="100"
    :w="320"
    :h="384"
    :active="true"
    :draggable="true"
    :resizable="true"
    :parent="true" 
    class="bg-white shadow-lg border rounded-lg overflow-hidden z-999999 fixed"
  > <!-- 限制在父容器內拖曳 -->
    <!-- Header -->
    <div class="bg-blue-600 text-white p-2">
      Chat 視窗
      <button class="float-right" @click="visible = false">✕</button>
    </div>

    <!-- 內容 -->
    <div class="p-3 h-full overflow-auto" style="height: calc(100% - 2.5rem);">
      <p>這裡是聊天內容
        這裡是聊天內容
        這裡是聊天內容
        這裡是聊天內容
      </p>
    </div>
  </DraggableResizable>

  <!-- 控制按鈕 -->
  <button class="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow z-50" @click="visible = true">
    開啟聊天
  </button>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import DraggableResizable from 'vue3-draggable-resizable'
  import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
  const visible = ref(true)

  </script>
  
  <style lang="scss" scoped>
:deep(.vdr) {
  position: fixed !important;
}
  </style>
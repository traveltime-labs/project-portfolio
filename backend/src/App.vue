<script setup lang="ts">
import { RouterView } from 'vue-router'

console.log(import.meta.env.VITE_APP_TITLE);
</script>

<template class="relative w-screen h-screen">
  <ThemeProvider>
    <!-- <Loading/> -->
    <SideTool/>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>
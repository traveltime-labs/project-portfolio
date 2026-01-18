<script setup lang="ts">
const gotopup = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可加 smooth 動畫效果，或用 'auto'
    })
}
</script>

<template>
    <div class="fixed bottom-16 right-12 z-999 w-16 h-16 rounded-4xl flex items-center justify-center bg-white p-2 ring-1 ring-gray-900/5 dark:bg-white/5 dark:ring-white/20 cursor-pointer" @click="gotopup">
        <Icon icon="eva:arrow-up-fill" width="60" height="60" class="text-white/30"/>
    </div>
</template>
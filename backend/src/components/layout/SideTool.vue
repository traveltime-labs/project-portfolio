<script setup lang="ts">
const w = 32
const h = 32

const isActive = ref(false)

const gotopup = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 可加 smooth 動畫效果，或用 'auto'
    })
}

const gotodown = () => {
    const h = document.body.scrollHeight
    window.scrollTo({
        top: h,
        behavior: 'smooth' // 可加 smooth 動畫效果，或用 'auto'
    })
}
</script>


<template>
    <div class="toolbox fixed bottom-2 right-3.5 lg:bottom-16 lg:right-12 z-1">
        <Icon icon="eva:arrow-up-fill" :width="w" :height="h" class="text-white/30" @click="gotopup"/>
        <Icon icon="eva:arrow-down-fill" :width="w" :height="h" class="text-white/30" @click="gotodown"/>
        <Icon icon="mdi:robot-excited" :width="w" :height="h" class="text-white/30 mt-1.5" @click="isActive = !isActive"/>
        <!-- <Icon icon="mdi:robot-confused" :width="w" :height="h" class="text-white/30 mb-1.5"/> -->
        <div class="chatContainer" v-if="isActive">
            <ChatRoom/>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
.toolbox {
    background-color: #2b2c3a;
    border-radius: 50px;
    padding: 10px 10px;
    // padding: 10px;
}

.chatContainer {
    width: 350px;
    height: 500px;
    background: black;
    position: fixed;
    bottom: 80px;
    right: 120px;
}
</style>
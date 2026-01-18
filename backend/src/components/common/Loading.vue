<script lang="ts" setup>
const ui = useUIStore()
</script>

<template>
    <div class="loading-mask w-full bg-white dark:bg-black z-10 top-0 left-0" :class="{'active': ui.loading}">
        <Icon icon="eos-icons:three-dots-loading" class=" text-gray-600 hover:text-blue-500" />
    </div>
</template>

<style lang="scss" scoped>
.loading-mask {
    position: absolute;
    z-index: 999999;
    // height: 100vh;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    transition: .3s;
    pointer-events: none;
    svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
    }
    &.active {
        transition: .3s;
        opacity: 1;
        pointer-events: auto;
    }
}
</style>
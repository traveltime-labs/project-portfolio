<script lang="ts" setup>
// 格式：[{ label: '台灣', value: 'tw' }, { label: '全球', value: 'world' }] 

// 泛型函式
const props = defineProps<{
  tabs: TabItem[]
  active: string
}>()

const emit = defineEmits([
    'update:active'
])

const select = (tab: string) => emit('update:active', tab)
</script>


<template>
    <nav class="rounded-lg bg-gray-100 p-1 dark:bg-gray-900 inline-block">
        <button v-for="tab in tabs" :key="tab.value"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out bg-transparent dark:text-white"
            :class="active === tab.value ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-white/[0.03] dark:text-white' : 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
            @click="select(tab.value)">
            {{tab.label}}
        </button>
    </nav>
</template>
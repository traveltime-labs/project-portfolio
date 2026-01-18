<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
console.log(import.meta.env.VITE_ENV)

const isShowStockModal = ref(false)
const currentPageTitle = ref('聊天室')

</script>

<template>
    <AdminLayout>
        <!-- 麵包屑 -->
        <PageBreadcrumb :pageTitle="currentPageTitle" />
        <!-- 總表 -->
        <div class="mx-auto max-w-(--breakpoint-2xl)">
            <div class="grid grid-cols-1 gap-6 ">
                <ChatRoom/>
            </div>
        </div>

    </AdminLayout>
</template> 
<style lang="scss" scoped>
svg {
    transition: .3s;
    filter: brightness(1);

    &:hover {
        transition: .3s;
        filter: brightness(150%);
    }
}
</style>
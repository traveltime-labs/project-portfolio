<script setup lang="ts">
const ui = useUIStore()
ui.showLoading(false)
</script>

<template>
    <AdminLayout>
        <PageBreadcrumb pageTitle="停電公告" />
        <ComponentCard :isShowHeader=false title="">
            停電公告
        </ComponentCard>
    </AdminLayout>
    
</template>
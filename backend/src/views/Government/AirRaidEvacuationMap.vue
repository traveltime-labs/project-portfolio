<script setup lang="ts">
const ui = useUIStore()
ui.showLoading(false)
</script>

<template>
    <AdminLayout>
        <PageBreadcrumb pageTitle="防空疏散" />
        <ComponentCard :isShowHeader=false title="">
            <div class="text-white">
                防空疏散<br/>
                https://kiang.github.io/air_raid_shelter/<br/>
                <br/>
                https://www.google.com/maps/d/u/0/viewer?mid=1QTlJW03o_dVuYCOWw3hGbCRIviCdAmyf&ll=24.16678265817364%2C120.68738845757505&z=15
            
            <iframe src="https://kiang.github.io/air_raid_shelter/" frameborder="0"></iframe>
            </div>
        </ComponentCard>
    </AdminLayout>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh/1.5);
}
</style>
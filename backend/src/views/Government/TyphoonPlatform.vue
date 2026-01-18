<script setup lang="ts">
const ui = useUIStore()
ui.showLoading(false)
</script>

<template>
    <AdminLayout>
        <PageBreadcrumb pageTitle="颱風觀測平台" />
        <ComponentCard :isShowHeader=false title="">
            <div class="text-white">
                颱風觀測平台<br/>
            https://watch.ncdr.nat.gov.tw/watch_typhoon.aspx
            </div>

            <div class="w-full">
                <iframe src="https://embed.windy.com/embed2.html?lat=26.037&lon=122.344&zoom=4&level=surface&overlay=wind&menu=&message=&marker=&forecast=12&calendar=now&location=coordinates&type=map&actualGrid=&metricWind=kt&metricTemp=%C2%B0C" frameborder="0"></iframe>
            </div>
        </ComponentCard>
    </AdminLayout>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh/2)
}
</style>
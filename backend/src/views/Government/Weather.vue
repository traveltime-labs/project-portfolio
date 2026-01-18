<script setup lang="ts">

const useGovernment = useGovernmentData()
const ui = useUIStore()
ui.showLoading(false)

useGovernment.getWeatherWeekly()
</script>

<template>
    <AdminLayout>
        <PageBreadcrumb pageTitle="氣象公告" />
        <ComponentCard :isShowHeader=false title="">

           參考：https://www.pinterest.com/pin/59672763807148380/
            <div class="grid grid-cols-12 gap-4 md:gap-6 text-white">
                <div class="col-span-12 space-y-6 xl:col-span-7">
                
                    <div class="flex">
                        <div class="mr-2">
                            <div>台中市</div>
                            <small>北區 ...</small>
                            <div class="flex">
                                <div>
                                    <small>最高</small>
                                    <div>25度</div>
                                </div>
                                <div>
                                    <small>最低</small>
                                    <div>25度</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            ICON
                        </div>
                    </div>

                    <div>
                        今天的天氣
                        <div>
                            現在
                            ICON
                            27度
                        </div>
                    </div>

                </div>
                <div class="col-span-12 space-y-6 xl:col-span-5">
                    test
                </div>
            </div>

            <!-- <iframe class="w-full" src="https://www.cwa.gov.tw/V8/C/W/County/County.html?CID=10017" frameborder="0"></iframe> -->
        </ComponentCard>
    </AdminLayout>
</template>

<style lang="scss" scoped>
iframe {
    height: calc(100vh/1.5);
}
</style>
<script lang="ts" setup>
const { scrollToSection } = useScrollTo()
const ui = useUIStore()
const useGovernmentStore = useGovernmentData()
const tabs = ref<TabItem[]>([])
const activeTab = ref('')

onMounted(async () => {
    ui.showLoading(true)
    try {
        await useGovernmentStore.台灣水庫即時水情()
        tabs.value = useGovernmentStore.water.水庫即時水情.map(a => ({
            label: a.地區,
            value: a.地區
        }))
        activeTab.value = tabs.value[0].value
    } catch (e) {
        console.error(`載入 api 異常: ${e}`)
    } finally {
        ui.showLoading(false)
    }

})
</script>

<template>
    <AdminLayout>
        <!-- 麵包屑 -->
        <PageBreadcrumb pageTitle="停水公告" />
        <ComponentCard class="relative overflow-hidden" :isShowHeader="false" title="">
            <Loading/>
            <div class="mx-auto max-w-(--breakpoint-2xl)">
                <TabSwitcher class=" mb-3.5" :tabs="tabs" v-model:active="activeTab"
                    @click="scrollToSection(activeTab)" />

                <div class="info mb-5 text-black dark:text-white">
                    <div>
                        是否改用 echarts-liquidfill
                        <span>串接水庫圖表</span>
                        https://watch.ncdr.nat.gov.tw/watch_drought
                    </div>
                    <div class="">資料來源：<a href="http://www.wra.gov.tw/" target="_blank">經濟部水利署</a></div>
                    <div>即時水情資料係自記儀器自動產生，未經人工完整檢驗，僅提供參考。</div>
                    <div>根據<a href="http://fhy.wra.gov.tw/ReservoirPage_2011/StorageCapacity.aspx"
                            target="_blank">水利署網頁</a>公布，各項水庫資料由各水庫管理單位在每日輸入，更新時間不一致。（部分水庫星期六、日之資料則在星期一統一輸入）
                    </div>
                    <div class="text-red">預測剩餘天數 = 即時有效蓄水量/昨日下降蓄水量。因降雨、用水量隨時間變化，預測結果僅提供參考。</div>
                </div>

                <div v-for="(a, index) in useGovernmentStore.water.水庫即時水情" :key="index">

                    <hr class=" my-2.5 " />

                    <h2 class=" my-10 text-black dark:text-white font-bold text-2xl" :class="a.地區" :data-id="index"
                        :id="index == 1 ? 'example' : ''">
                        {{ a.地區 }}
                    </h2>

                    <div class="grid grid-cols-12 gap-6 mb-5">
                        <div class="mb-5 col-span-12 sm:col-span-6 md:col-span-4" v-for="(b, bindex) in a.水庫"
                            :key="bindex">
                            <div>
                                <h3 class="text-center mb-5 text-black dark:text-white">{{ b.名稱 }}({{ b.縣市 }})</h3>
                                <div class="reservoir-wrap text-center mx-auto mb-5 text-black dark:text-white"
                                    :class="b.資訊.percentage > 60 ? 'normal' : (b.資訊.percentage > 30 ? 'warning' : 'danger')">
                                    <div class="reservoir">
                                        <div class="wave" :style="`height:${b.資訊.percentage}%`"></div>
                                        <div class="reservoir-percentage">
                                            <b>{{ b.資訊.percentage }}%</b>
                                        </div>
                                    </div>
                                </div>
                                <div class="reservoir-info text-black dark:text-white">
                                    <div>有效蓄水量：{{ b.資訊.volumn }} 萬立方公尺</div>
                                    <div>
                                        昨日水量上升：
                                        <span v-if="b.資訊.昨日水量變化 > 0" class="text-blue">
                                            {{ b.資訊.昨日水量變化 }}%
                                        </span>
                                        <span v-else-if="b.資訊.昨日水量變化 <= 0" class="text-red">
                                            {{ b.資訊.昨日水量變化 }}%
                                        </span>
                                        <span v-else="b.資訊.昨日水量變化<=0">
                                            待更新
                                        </span>
                                    </div>
                                    <div>
                                        剩餘天數：
                                        <span v-if="b.資訊.剩餘天數 > 0">
                                            {{ b.資訊.剩餘天數 }}天
                                        </span>
                                        <span v-else>
                                            待更新
                                        </span>
                                    </div>
                                    <div>更新時間：{{ b.資訊.updateAt }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ComponentCard>
    </AdminLayout>
</template>


<style>
.vdr-container.active {
  border: 1px solid #333;
}
.vdr-handle-tl, .vdr-handle-tm, .vdr-handle-ml, .vdr-handle-mr, .vdr-handle-bl,.vdr-handle-bm {
    display: none !important;
}
</style>

<style lang="scss" scoped>

.reservoir-wrap {
    width: 100%;
    max-width: 250px;
    height: 250px;
    border-radius: 50%;
    background: white;
    position: relative;
    overflow: hidden;

    .reservoir {
        border: 8px solid white;
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow: hidden;
        border-radius: 50%;
        position: absolute;

        .wave {
            width: 300px;
            height: 150px;
            position: absolute;
            background: rgb(23, 139, 202);

            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
        }

        .reservoir-percentage {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 50px;
            transform: translate(-50%, -50%);
        }
    }

    &.normal {
        border: 10px solid rgb(23, 139, 202);

        .wave {
            background: rgb(23, 139, 202);
        }

        .reservoir-percentage {
            color: rgb(164, 219, 248);
        }
    }

    &.warning {
        border: 10px solid rgb(255, 160, 119);

        .wave {
            background: rgba(245, 151, 111, 0.48);
        }

        .reservoir-percentage {
            color: rgb(255, 160, 119);
        }
    }

    &.danger {
        border: 10px solid rgb(255, 119, 119);

        .wave {
            background: rgb(255, 119, 119, 0.5);
        }

        .reservoir-percentage {
            color: rgb(255, 68, 68);
        }
    }
}

.reservoir-info {
    max-width: 250px;
    margin: 0 auto;

    @media (max-width: 767px) {
        max-width: 100%;
    }
}

@keyframes wave {
    from {
        transform: rotate(0deg);
    }

    from {
        transform: rotate(360deg);
    }
}
</style>
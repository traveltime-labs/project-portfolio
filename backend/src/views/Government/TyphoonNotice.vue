<script lang="ts" setup>
import type { TyphoonInfo } from '@/types/Government'
const useGovernmentStore = useGovernmentData()
const strGroup:string[] = ['明天停止上班、停止上課', '已達停止上班及上課標準', '今天停止上班、停止上課']

const isTaichung = (list: TyphoonInfo[]) => {
    if (list.length > 0) {
        const r = list.filter((a:TyphoonInfo) => {
            if (a.地區 == '臺中市') {
                const s = a.資訊.find(b => strGroup.some(c => b.includes(c)))
                if (s) return a
            }
        })
        return r && r.length > 0 ? true : false
    }
}

onMounted(async () => {
    await useGovernmentStore.颱風天放假公布()
})
</script>

<template>
    <AdminLayout>
        <!-- 麵包屑 -->
        <PageBreadcrumb pageTitle="停班停課公告" />
        <ComponentCard :isShowHeader="false" title="" class="relative overflow-hidden">
            <Loading/>
            <div class="mx-auto">
                <div class="w-full mb-2">
                    <div class="bg-danger text-black dark:text-white px-2.5 py-1.5 mb-2.5" v-if="isTaichung(useGovernmentStore.颱風天放假公布資訊?.詳細資訊 ?? [])"> 
                        台中市：
                        {{ useGovernmentStore.颱風天放假公布資訊!.詳細資訊.find(a => a.地區 === '臺中市')?.資訊?.toString() ?? '' }}
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-3">
                    <div class="col-span-12 lg:col-span-7" >
                        <iframe class=" mb-4" src="https://embed.windy.com/embed2.html?lat=26.037&lon=122.344&zoom=4&level=surface&overlay=wind&menu=&message=&marker=&forecast=12&calendar=now&location=coordinates&type=map&actualGrid=&metricWind=kt&metricTemp=%C2%B0C" frameborder="0"></iframe>
                        <iframe class="typhoon-news" src="https://www.cwa.gov.tw/V8/C/P/Typhoon/TY_WARN.html" frameborder="0"></iframe>
                    </div>

                    <div class="bg-danger" v-if="useGovernmentStore.颱風天放假公布資訊 && useGovernmentStore.颱風天放假公布資訊.詳細資訊.length == 0">
                        {{useGovernmentStore.颱風天放假公布資訊.颱風名稱}}
                    </div>
                    <div class="col-span-12 lg:col-span-5" v-else>
                        <table class="min-w-full" >
                            <thead>
                                <tr class="border-b border-gray-200 dark:border-gray-700">
                                    <th class="px-5 py-3 text-left sm:px-6">
                                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                            地區
                                        </p>
                                    </th>
                                    <th class="px-5 py-3 text-left sm:px-6">
                                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                                            資訊
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="(item, index) in useGovernmentStore.颱風天放假公布資訊?.詳細資訊 || []" :key="index" 
                                    class="border-t border-gray-100 dark:border-gray-800">
                                    <td class="px-5 py-4 sm:px-6 text-gray-500 dark:text-gray-400">
                                        {{item.地區}}
                                    </td>
                                    <td class="px-5 py-4 sm:px-6 text-gray-500 dark:text-gray-400 ">
                                        <div :class="strGroup.some(b => a.includes(b)) ? 'text-red-400' : ''" v-for="a in item.資訊">
                                            {{a}}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </ComponentCard>
    </AdminLayout>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    height: calc(100vh/1.8);
    &.typhoon-news {
        height: 800px;
    }
}
.bg-danger {
    background: rgba(255, 119, 119, 0.3);
}
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
            // top: 50%;
            // left: -35%;
            // margin-left: 0px;
            // margin-top: 0px;
            // border-radius: 35%;
            // background: blue;
            // animation: wave 15s infinite linear;
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
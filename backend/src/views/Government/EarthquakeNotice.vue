<script lang="ts" setup>
import { useGovernmentData } from '@/stores/Government'
import { useScrollTo } from '@/composables/useCommon'
import 'leaflet/dist/leaflet.css';
import { useUIStore } from '@/stores/UIStore'
import L, { Map as LeafletMap } from 'leaflet'

const ui = useUIStore()
const useGovernmentStore = useGovernmentData()
const activeTab = ref('world')
const tabs = ref([
    {
        label: '台灣',
        value: 'tw'
    },
    {
        label: '全球',
        value: 'world'
    }
])

// 地圖相關
let map: LeafletMap
let markers = ref<{ [key: string]: L.Marker }>({})
let getPosition = ref<(location: any) => void | null | undefined>();

const clickHandlerPos = (item: any) => {
    if (getPosition.value) getPosition.value(item);
};


// 定位點跑掉了 需要修正
const getMapInfo = () => {
    import('leaflet').then(L => {

        // 初始化地圖
        const map = L.map("map", { renderer: L.canvas() });

        // 添加 Thunderforest 地圖圖層
        L.tileLayer(`https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=77e58df3130b4566b8f762f4cc16022b`, {
            attribution: 'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
            minZoom: 2,
            maxZoom: 18
        }).addTo(map);

        // 收集所有標記的位置, 並初始化對象為空值
        const bounds = L.latLngBounds([]);

        useGovernmentStore.全球地震?.forEach((item: any) => {
            // 解析經緯度
            let latitude = parseFloat(item.緯度.replace(/[^\d.-]/g, ''));
            let longitude = parseFloat(item.經度.replace(/[^\d.-]/g, ''));

            // 若資料有方向（N/S/E/W），也要處理方向符號（南緯與西經為負數）
            if (item.緯度.includes('S')) latitude = -latitude;
            if (item.經度.includes('W')) longitude = -longitude;

            console.log('解析後座標:', {
                原始緯度: item.緯度,
                原始經度: item.經度,
                latitude,
                longitude
            });

            // 定位點位置
            const popup = `
                <div>
                    <strong>地震時間:</strong> ${item.地震時間}<br>
                    <strong>地震位置:</strong> ${item.地震位置}<br>
                    <strong>深度(公里):</strong> ${item.深度_公里}<br>
                    <strong>經度:</strong> ${item.經度}<br>
                    <strong>緯度:</strong> ${item.緯度}<br>
                    <strong>規模:</strong> ${item.規模}<br>
                </div>
            `;

            // 添加標記到地圖
            const customIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div class='icon-mark'></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15], // 設定錨點
            })

            const marker = L.marker([latitude, longitude], {
                //icon: customIcon
            }).addTo(map)
                .bindTooltip(popup, {
                    permanent: false,
                    direction: 'top'
                })
                .bindPopup(popup);

            // 將標記的位置加入邊界計算
            bounds.extend([latitude, longitude]);

            // 儲存標記
            markers.value[item.地震位置] = marker
        });

        // 根據邊界調整地圖視圖
        map.fitBounds(bounds);

        // 處理點選連結標示網址資訊
        getPosition.value = (location: any) => {
            const marker = markers.value[location.地震位置];
            if (marker) {
                marker.openPopup();
                map.panTo(marker.getLatLng());
            } else {
                console.error('Marker not found:', location.地震位置);
            }
        }

    }).catch(err => console.error('Leaflet import failed:', err));
}


onMounted(async () => {
    ui.showLoading(true)
    await useGovernmentStore.台灣地震資訊()
    await useGovernmentStore.getEarthQuackWorldInfo()
    getMapInfo()
})
</script>

<template>
    <AdminLayout class="earthquakeNotice">
        <!-- 麵包屑 -->
        <PageBreadcrumb pageTitle="地震公告" />
        <ComponentCard :isShowHeader="false" title="test" className="card relative overflow-hidden">
            <Loading />
            <GoTopup />
            <TabSwitcher class=" ml-6 mb-3.5" :tabs="tabs" v-model:active="activeTab" />

            <div class="rounded-b-xl border-gray-200 dark:border-gray-800 overflow-hidden">
                <div v-show="activeTab === 'tw'" style="">
                    <!-- <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
                        台灣
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ useGovernmentStore.台灣地震 }}
                    </p> -->

                    <!--- 手風琴 --->
                    <div class="ml-10 my-4">
                        <div class="flex text-white items-center">
                            <div class=" rounded-2xl w-5 h-5 bg-emerald-700 mr-3"></div>未達下列標準之地震。
                        </div>
                        <div class="flex text-white items-center">
                            <div class=" rounded-2xl w-5 h-5 bg-amber-300 mr-3"></div>
                            芮氏規模5.5以上，最大震度4級以上。
                        </div>
                        <div class="flex text-white items-center">
                            <div class=" rounded-2xl w-5 h-5 bg-amber-600 mr-3"></div>
                            芮氏規模6.0以上，最大震度5弱以上。
                        </div>
                        <div class="flex text-white items-center">
                            <div class=" rounded-2xl w-5 h-5 bg-error-600 mr-3"></div>
                            芮氏規模6.5以上，最大震度6弱以上。
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <div class="mx-6 mb-3.5 overflow-hidden rounded-xl "
                            v-for="(item, index) of useGovernmentStore.台灣地震" :key="index"
                            :class="item.active ? ' bg-brand-50 dark:bg-brand-100 ' : ' text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.03]'">
                            <div class="flex w-full items-center justify-between px-6 py-4 cursor-pointer"
                                @click="item.active = !item.active">
                                <ul>
                                    <li>
                                        地震時間：{{ item.地震時間 }}<br />
                                    </li>
                                    <li>
                                        震央位置：{{ item.震央位置 }}<br />
                                    </li>
                                    <li>
                                        地震深度：{{ item.地震深度 }}<br />
                                    </li>
                                    <li class="flex items-center">
                                        <div class="mr-3">規模：{{ item.規模 }}</div>
                                        <div class=" rounded-2xl w-3 h-3 bg-emerald-700 mr-3"  v-if="parseFloat(item.規模) < 4"></div>
                                        <div class=" rounded-2xl w-3 h-3 bg-amber-300 mr-3" v-if="parseFloat(item.規模) >= 4 && parseFloat(item.規模) < 5.5"></div>
                                        <div class=" rounded-2xl w-3 h-3 bg-amber-600 mr-3" v-if="parseFloat(item.規模) >= 5.6 && parseFloat(item.規模) < 6"></div>
                                        <div class=" rounded-2xl w-3 h-3 bg-error-600 mr-3" v-if="parseFloat(item.規模) > 6"></div>
                                    </li>
                                    <li>
                                        相對位置：{{ item.相對位置 }}<br />
                                    </li>
                                </ul>
                                <Icon icon="mynaui:plus" width="24" height="24" />
                            </div>
                            <div class="p-6 border-t border-brand-100 dark:border-brand-200" v-show="item.active">
                                <img :src="item.圖片" />
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="activeTab === 'world'">
                    <div class="max-w-full overflow-x-auto max-h-[300px] overflow-y-auto custom-scrollbar ">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b border-t border-gray-200 dark:border-gray-700">
                                    <th class="text-left py-3.5 sm:px-4">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            地震時間
                                        </p>
                                    </th>
                                    <th class="text-left py-3.5 sm:px-4">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            地震位置</p>
                                    </th>
                                    <th class="text-left py-3.5 sm:px-4 hidden md:table-cell">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            經度</p>
                                    </th>
                                    <th class="text-left py-3.5 sm:px-4 hidden md:table-cell">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            緯度</p>
                                    </th>
                                    <th class="text-left py-3.5 sm:px-4">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            規模</p>
                                    </th>
                                    <th class="text-left py-3.5 sm:px-4">
                                        <p
                                            class="font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-nowrap">
                                            深度（公里）</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="item in useGovernmentStore.全球地震"
                                    class="border-t border-gray-100 dark:border-gray-800">
                                    <td class="text-left py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {{ item.地震時間 }}
                                        </span>
                                    </td>
                                    <td class="text-left py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90"
                                            @click="clickHandlerPos(item)">
                                            {{ item.地震位置 }}
                                        </span>
                                    </td>
                                    <td class="hidden md:table-cell py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {{ item.經度 }}
                                        </span>
                                    </td>
                                    <td class="hidden md:table-cell py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {{ item.緯度 }}
                                        </span>
                                    </td>
                                    <td class="py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {{ item.規模 }}
                                        </span>
                                    </td>
                                    <td class="py-3.5 sm:px-4">
                                        <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {{ item.深度_公里 }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div id="map" style="height: 45vh"></div>
                    </div>
                </div>
            </div>
        </ComponentCard>
    </AdminLayout>
</template>

<style lang="scss">
.earthquakeNotice {
    .card {
        .card-body {
            padding-left: 0px !important;
            padding-right: 0px !important;
            padding-bottom: 0px !important;
        }
    }
}
</style>
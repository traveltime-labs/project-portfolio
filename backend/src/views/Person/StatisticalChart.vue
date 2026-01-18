<script setup lang="ts">
import * as echarts from 'echarts/core';
import { LineChart, PieChart, BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    LineChart,
    PieChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    CanvasRenderer,
]);

const ui = useUIStore()
ui.showLoading(false)

// 圖表類型
const chartType = [
    {
        type: 'bar',
        name: '長條圖'
    },
    // {
    //     type: 'pie',
    //     name: '圓餅圖'
    // },
    {
        type: 'line',
        name: '折線圖'
    }
]

// 圖表篩選
const sortType = [
    {
        type: 'default',
        name: '預設'
    },
    {
        type: 'height to low',
        name: '由高至低'
    },
    {
        type: 'low to height',
        name: '由低至高'
    }
]

// 圖表時間
const chartTimeOptions = [
    {
        type: 'day',
        name: '日'
    },
    {
        type: 'week',
        name: '週'
    },
    {
        type: 'month',
        name: '月'
    }
]

const selectType = ref({ // 使用者選擇
    chart: 'bar',
    sort: 'default',
    time: 'day',
    record: {
        isChange: false,
        start: 0,
        end: 50,
    }
})

const chart = ref(null)
const option = ref(null)

// 時間隨便抓 先做一個感覺
const _data = [
    {
        功能: 'IPS金流平台介面優化',
        專案分類: 'IPS',
        開始時間: '2021/02/01',
        結束時間: '2021/06/01',
        狀態: '未完成'
    },
    {
        功能: '官網新增會員登入整併QPP登入',
        專案分類: 'Yoe',
        開始時間: '2024/07/21',
        結束時間: '2024/07/31',
        狀態: '已完成'
    },
    {
        功能: '官網改版 v3',
        專案分類: 'Yoe',
        開始時間: '2024/03/21',
        結束時間: '2024/06/31',
        狀態: '已完成'
    },
    {
        功能: 'MID功能製作、官網一系列改版',
        專案分類: 'Yoe',
        開始時間: '2023/09/12',
        結束時間: '2023/12/31',
        狀態: '已完成'
    },
    {
        功能: 'ips訂單爭議款',
        專案分類: 'OMP',
        開始時間: '2024/08/21',
        結束時間: '2024/12/26',
        狀態: '已完成'
    }
]

// const init = (action: string) => {
//     if (action == 'record') {
//         selectType.record.value.start = 0
//         selectType.record.value.end = 50
//     } else {
//         data = []
//         selectType.value = { // 使用者選擇
//             chart: 'bar',
//             sort: 'default',
//             time: 'day',
//             record: {
//                 isChange: false,
//                 start: 0,
//                 end: 50
//             }
//         }
//         chart.value = null
//         option.value = null
//     }
// }

type ChartType = {
    name: string;
    days: number;
    category: string;
    status: string;
    start: string;
    end: string;
}

// 資料處理
const data = _data.map(a => {
    const s:Date = new Date(a.開始時間)
    const e:Date = new Date(a.結束時間)
    const days:number = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
    return {
        name: a.功能,
        days,
        category: a.專案分類,
        status: a.狀態,
        start: a.開始時間,
        end: a.結束時間
    }
})

const setChartOption = (data: ChartType[], el:string) => {
    const option = {
      title: {
        text: '專案時長統計（天）',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params: any) {
          const data = params[0];
          return `<b>${data.name}</b><br/>
          時長：${data.value} 天`
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLabel: {
          rotate: 30,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: '天數'
      },
      series: [
        {
          name: '專案天數',
          type: 'bar',
          data: data.map(d => d.days),
          encode: {
            x: 'name',
            y: 'days'
          },
          itemStyle: {
            color: '#73C0DE'
          }
        }
      ]
    };
    renderChart('chart-bar', option, false)
}

const renderChart = async (el: string, options: any, cb: void | boolean) => {
    try {
        await nextTick()
        const ctx = document.querySelector(`.${el}`) as HTMLElement
        if (ctx) {
            let chart = echarts.init(ctx, null, {
                renderer: "svg"
            });

            chart.setOption(options, true);

            // event
            // if (cb) cb(chart)
            // const childDiv = document.querySelector(`.${el} > div`);
            // if (childDiv && childDiv.style.height == '0px') chart.resize();

            window.addEventListener("resize", () => chart.resize());
        }
    } catch (e) {
        console.error(`渲染圖表異常: ${e}`)
    }
}

onMounted(() => setChartOption(data, '.chart-bar'))



// const setChartOption = (_data: ChartType[],selectType,el: string) => {
//     try {
//         const { chart } = selectType.value
//         let x = []
//         let y = []
//         let series = []
//         let isRange = false
//         let options = {}

//         if (chart == 'bar' || chart == 'line') {
//             x = _data.map(a => a.日期)
//             y = _data.map(a => a.總筆數)

//             if (x.length > 15) {
//                 isRange = true
//                 if (this.selectType.record.isChange == false) this.selectType.record.end = (15 / x.length) * 100;
//             }
//             options = {
//                 tooltip: {
//                     trigger: 'axis',
//                     axisPointer: {
//                         type: chart == 'bar' ? 'shadow' : 'line',
//                     },
//                     formatter: (params) => {
//                         if (!params.length) return '';
//                         return `<b>日期：</b>${params[0].axisValue}<br/><b>數量：</b>${params[0].data}`
//                     }
//                 },
//                 xAxis: {
//                     type: 'category',
//                     data: x,
//                     name: '日期',
//                 },
//                 yAxis: {
//                     type: 'value',
//                     name: '數量'
//                 },
//                 emphasis: {
//                     show: true,
//                     focus: 'self',
//                     itemStyle: {
//                         opacity: 1,
//                     },
//                 },
//                 blur: {
//                     itemStyle: {
//                         opacity: 0.3
//                     }
//                 },
//                 series: [{
//                     name: '日期',
//                     type: chart,
//                     data: y,
//                     large: isRange ? true : false,
//                     lineStyle: {
//                         type: 'solid'  // 或 'dotted'
//                     },
//                     itemStyle: {
//                         color: '#5470C6'
//                     },
//                     label: {
//                         // show: true,
//                         // position: 'top'
//                     },
//                 }]
//             };

//             if (isRange) {
//                 options.dataZoom = [
//                     {
//                         type: 'slider',
//                         start: this.selectType.record.start,
//                         end: this.selectType.record.end,
//                     },
//                     {
//                         type: 'inside'
//                     }
//                 ]
//             } else {
//                 options.dataZoom = [];
//             }
//         }

//         if (chart == 'pie') {
//             options = {
//                 tooltip: {},
//                 label: {
//                     fontSize: 14,
//                     lineHeight: 16,
//                     fontWeight: 'bold',
//                 },
//                 legend: {
//                     bottom: 10
//                 },
//                 emphasis: {
//                     show: true,
//                     focus: 'self',
//                     itemStyle: {
//                         opacity: 1,
//                     },
//                 },
//                 blur: {
//                     itemStyle: {
//                         opacity: 0.3
//                     }
//                 },
//                 series: [
//                     {
//                         name: '筆數',
//                         type: 'pie',
//                         label: {
//                             // position: 'inside',
//                             overflow: 'break',
//                             formatter: function (params) {
//                                 return `${params.value}筆\n${params.percent}%`;
//                             }
//                         },
//                         data: _data.map(a => ({
//                             value: a.總筆數,
//                             name: a.狀態
//                         }))
//                     }
//                 ]
//             }
//         }

//         let vm = this
//         renderChart(el, options, (chart) => {
//             chart.on('dataZoom', (params) => {
//                 const zoomInfo = params.batch ? params.batch[0] : params;
//                 vm.selectType.record = {
//                     start: zoomInfo.start,
//                     end: zoomInfo.end
//                 }
//             })
//         })
//     } catch (e) {
//         console.error(`設定圖表異常: ${e}`)
//     }
// }




</script>

<template>
    <AdminLayout>
        <PageBreadcrumb pageTitle="作品集統計圖" />
        <ComponentCard :isShowHeader=false title="">

            <div class="grid grid-cols-12 gap-4 md:gap-6 text-white">
                <div class="col-span-12 space-y-6 xl:col-span-6">
                    <!-- <div class="chart" :class="`chart-${statusType}-bar`" v-if="selectType.chart == 'bar'"></div> -->
                    <div class="chart" :class="`chart-bar`"></div>
                    test
                </div>
                <div class="col-span-12 space-y-6 xl:col-span-6">
                    <div class="chart" :class="`chart-pie`"></div>
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


.chart {
    width: 100%;
    max-height: 400px;
    aspect-ratio: 16 / 9;

    div,
    svg {
        width: 100%;
        height: 100%;
    }

    .chart-content {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        div{
            height: auto;
        }
    }
}
</style>
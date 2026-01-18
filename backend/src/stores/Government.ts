import { defineStore } from 'pinia'
import { api } from '@/assets/ts/app-api.ts'
import 台灣水庫分類 from '@/assets/ts/台灣水庫列表.ts'
import { useUIStore } from '@/stores/UIStore.ts'
import type { TyphoonItem, EarthquakeTWItem, EarthquakeWorldItem } from '@/types/Government'

// twse
// https://openapi.twse.com.tw/#/

// 中央氣象署
// https://opendata.cwa.gov.tw/dist/opendata-swagger.html

export const useGovernmentData = defineStore('Government', () => {

    const ui = useUIStore()

    // state
    const water = ref({
        水庫即時水情: [
            {
                地區: '',
                水庫: [
                    {
                        名稱: '',
                        縣市: '',
                        資訊: {
                            baseAvailable: '',
                            id: '',
                            updateAt: '',
                            volumn: '',
                            percentage: 0,
                            daliyOverflow: '',
                            daliyInflow: '',
                            daliyNetflow: '',
                            name: '',
                            昨日水量變化: 0,
                            剩餘天數: 0
                        }
                    }
                ]
            }
        ]
    })

    // 預設空值
    const 颱風天放假公布資訊 = ref<TyphoonItem>()

    const 全球地震 = ref<EarthquakeWorldItem[]>()

    const 台灣地震 = ref<EarthquakeTWItem[]>()

    // action
    // 全球地震資訊
    const getEarthQuackWorldInfo = async () => {
        try {
            ui.showLoading(true)
            const res = await api.Government.全球地震資訊()
            if (res.status === 'success') {
                console.log(res.content)
                全球地震.value = res.content.data
            } else {
                console.log('取得全球地震資訊異常')
            }
        } catch (e) {
            console.error('撈取 全球地震資訊異常')
        } finally {
            ui.showLoading(false)
        }
    }

    const 台灣地震資訊 = async () => {
        try {
            ui.showLoading(true)
            const res = await api.Government.台灣地震資訊()
            if (res.status === 'success') {
                res.content.data.forEach((a:EarthquakeTWItem) => a.active = false)
                台灣地震.value = res.content.data
            } else {
                console.log('台灣地震資訊撈取異常')
            }
        } catch (e) {
            console.error('撈取 台灣地震資訊 api 異常', e)
        } finally {
            ui.showLoading(false)
        }
    }

    const 台灣水庫即時水情 = async () => {
        try {
            ui.showLoading(true)
            const res = await api.Government.台灣水庫即時水情()
            if (res && res.length > 0) {
                const result = 台灣水庫分類.map((r: { 地區: string; 水庫: { 名稱: string; 縣市: string }[] }) => ({
                    地區: r.地區,
                    水庫: r.水庫.map((w: { 名稱: string; 縣市: string }) => {
                        const info = res[0][w.名稱] || {}

                        // 調整 percentage 小數點
                        const 小數 = info.percentage?.toString().split('.')[1]
                        if (小數 && 小數.length > 2) {
                            info.percentage = parseFloat(info.percentage).toFixed(1)
                        }

                        // 昨日水量變化
                        const currentVolumn = parseFloat(info.volumn?.replace(/,/g, '') || '0')
                        const netflow = parseFloat(info.daliyNetflow || '0')
                        const 昨日水量 = currentVolumn - netflow
                        const 變化百分比 = ((currentVolumn - 昨日水量) / 昨日水量) * 100
                        info.昨日水量變化 = parseFloat(變化百分比.toFixed(2))

                        // 剩餘天數
                        info.剩餘天數 = Math.ceil(currentVolumn / Math.abs(netflow || 1))

                        return {
                            ...w,
                            資訊: info
                        }
                    })
                }))
                water.value.水庫即時水情 = result
            }
        } catch (e) {
            console.error('台灣水庫即時水情資訊撈取異常:', e)
        } finally {
            ui.showLoading(false)
        }
    }

    const 颱風天放假公布 = async () => {
        try {
            ui.showLoading(true)
            const res = await api.Government.颱風天放假公布()
            if (res.status === 'success') {
                颱風天放假公布資訊.value = res.content.data
            } else {
                console.log('颱風天放假公布撈取異常')
            }
        } catch (e) {
            console.error('颱風天放假公布資訊撈取異常', e)
        } finally {
            ui.showLoading(false)
        }
    }

    // 取得一週天氣預報
    const getWeatherWeekly = async () => {
        try {
            ui.showLoading(true)
            const res = await api.Government.GetWeatherWeekly(['台中市'])
            if (res) {
                console.log(res)
            } else {
                console.log('u4t;6')
            }
        } catch (e) {
            console.error(`取得一週天氣預報異常: ${e}`)
        }
    }

    return {
        // state
        water,
        颱風天放假公布資訊,
        全球地震,
        台灣地震,

        // actions
        getEarthQuackWorldInfo,
        台灣地震資訊,
        台灣水庫即時水情,
        颱風天放假公布,
        getWeatherWeekly
    }
})



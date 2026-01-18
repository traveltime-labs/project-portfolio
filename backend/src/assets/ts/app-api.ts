

const callGetAPI = async (path: string, timeout = 20000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}${path}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "GET",
            signal: controller.signal
        });

        clearTimeout(id);
        return await res.json();
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('API 請求逾時（timeout）');
        } else {
            console.error('API 錯誤:', error);
        }
        return null;
    }
};

const getTwseAPI = (path: string) => {
    return fetch(`${import.meta.env.VITE_API_TAIWANSTAT}${path}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "GET"
    }).then((res) => res.json().catch((e) => console.log(`異常錯誤:${e}`)))
}

const callPostAPI = (path: string, param: any) => {
    return fetch(`${import.meta.env.VITE_ENV}${path}`, {
        body: JSON.stringify(param),
        headers: {
            "content-type": "application/json"
        },
        method: "POST"
    }).then((res) => res.json())
}

export const api = {
    Government: {
        台灣水庫即時水情: () => getTwseAPI(`/waters/latest`),
        颱風天放假公布: () => callGetAPI(`/api/crawler/spider_typhoon_info`),
        台灣地震資訊: () => callGetAPI(`/api/crawler/spider_earthquake_info_tw`),
        全球地震資訊: () => callGetAPI(`/api/crawler/spider_earthquake_world`),
        GetWeatherWeekly: (location: string[]) => callGetAPI(`/api/Weather/Weekly?city=${location}`)
    },
    Person: {
        stocks: {
            GetStocks: () => callGetAPI('/api/Stock'),
            GetHoldingStocks: () => callGetAPI('/api/GetHoldingStocks'),
            AddHoldingStock: (param: any) => callPostAPI('/api/Stock/AddHoldingStock', param),
            RemoveHoldingStock: (param: any) => callPostAPI('/api/Stock/RemoveHoldingStock', param),
            UpdateHoldingStock: (param: any) => callPostAPI('/api/Stock/UpdateHoldingStock', param),
        }
    },
    
}
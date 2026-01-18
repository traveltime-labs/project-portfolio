// 水庫即時水情
export interface ReservoirInfo {
    baseAvailable: string;
    id: string;
    updateAt: string;
    volumn: string;
    percentage: number;
    daliyOverflow: string;
    daliyInflow: string;
    daliyNetflow: string;
    name: string;
    昨日水量變化: number;
    剩餘天數: number;
}

export interface Reservoir {
    名稱: string;
    縣市: string;
    資訊: ReservoirInfo;
}

export interface Region {
    地區: string;
    水庫: Reservoir[];
}

export interface RealTimeReservoirData {
    水庫即時水情: Region[];
    isLoading: boolean;
}

// 颱風天放假公布資訊
export type TyphoonItem = {
    颱風名稱: string;
    更新時間: string;
    詳細資訊: TyphoonInfo[];
}

export type TyphoonInfo = {
    地區: string;
    資訊: string[];
}

// 台灣颱風地震水庫資訊資料
export interface TyphoonEarthquakeData {
    waterData: Region | any;
    typhoonData: TyphoonDataItem | any;
}

// 台灣地震資訊
export type EarthquakeTWItem = {
    id: string;
    地震時間: string;
    震央位置: string;
    地震深度: string;
    規模: string;
    相對位置: string;
    圖片: string;
    active: boolean;
}

// 全球地震資訊
export type EarthquakeWorldItem = {
    地震時間: string;
    地震位置: string;
    深度_公里: string;
    經度: string;
    緯度: string;
    規模: string;
}
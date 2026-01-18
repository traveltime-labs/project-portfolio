"use client"
import {useGeneratePasswordState} from "@/hooks/frontend/tools/useGeneratePasswordState";
import Content from '@/components/frontend/content';
import InnerSideBar from "@/components/frontend/innerSidebar";
import { FaRegCopy } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import {Button} from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

const generatePasswordPage = () => {

    const { len, setLength, code, handleGenerate } = useGeneratePasswordState();
    /**
     * 後續調整可選：
     * 包含大寫字母
     * 包含數字
     * 包含小寫字母
     * 包含特殊符號
     * 
     * 密碼長度 捲動
     * 
     * 密碼強度顯示
     * 密碼歷程紀錄
     */
    const description = {
        "title":"功能特點",
        "features":[
        {
            "title":"即時統計",
            "description":"輸入文字即時顯示統計結果"
        },
        {
            "title":"多維度分析",
            "description":"提供字數、行數、單詞等多項數據"
        },
        {
            "title":"簡潔直觀使用介面",
            "description":"方便快速取得所需資訊"
        }
        ],
        "instructionsTitle": "使用說明",
        "instructions":[
        "在下方的文字輸入區域輸入或貼上您想要分析的文字內容",
        "系統會自動計算並顯示相關的文字統計資訊",
        "您可以根據需要調整輸入的文字內容，統計資訊會即時更新"
        ]
    }

    const copyResult = () => {
        if (code) {
            navigator.clipboard.writeText(code)
            toast.success("已複製")    
        } else {
            toast.error("尚未生成密碼")
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1600px] mx-4 lg:mx-auto my-8">
            <InnerSideBar description={description}/>
            <Content title="隨機密碼產生器" className="col-span-1 lg:col-span-2">
                <div className="border-2 bg-gray-100 dark:bg-gray-900 rounded-2xl p-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">生成的密碼</span>
                                <span className="text-sm text-gray-600">幾位數: {code.length}</span>
                            </div>
                            <div className="bg-black/80 rounded-lg p-4 text-gray-200 mt-2 font-bold text-xl"> {code ? code : "尚未生成"} </div>
                        </div>

                        <div className="my-5">
                            <div className="grid grid-cols-2 my-2">
                                <b className="text-sm text-gray-600">密碼長度</b>
                                <span className="text-right text-blue-500">{len}</span>
                            </div>
                            <Slider defaultValue={[33]}
                                value={[len]}
                                min={1}
                                max={100}
                                step={1}
                                onValueChange={(value) => setLength(value[0])}
                            />
                            <div className="grid grid-cols-2 my-2">
                                <small className="text-xs text-gray-400">8</small>
                                <small className="text-xs text-right text-gray-400">100</small>
                            </div>
                        </div>

                        <div className="flex justify-between my-3">
                            <Button size="lg" className="p-4 w-1/2 mr-2" onClick={handleGenerate}>
                                {/* <Spinner /> */}
                                <AiFillProduct />
                                <span>生成新密碼</span>
                            </Button>
                            <Button size="lg" className=" w-1/2 ml-2" onClick={copyResult}>
                                {/* <Spinner /> */}
                                <FaRegCopy />
                                <span>複製密碼</span>
                            </Button>
                        </div>
            </Content>
        </div>
    )
}

export default generatePasswordPage;
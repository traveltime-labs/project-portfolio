"use client"
import { useJsonState } from "@/hooks/frontend/tools/useJsonState";
import Content from '@/components/frontend/content';
import {Button} from '@/components/ui/button';
import InnerSideBar from "@/components/frontend/innerSidebar";
import Textarea from "@/components/frontend/textarea"

const randomPwd = () => {
    const { input,
        setInput,
        output,
        setOutput,
        vaildate,
        setValidate,
        copyJSON,
        formtJSON,
        minifyJSON,
        validateJSON } = useJsonState();
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1600px] mx-4 lg:mx-auto my-8">
            <InnerSideBar description={description}/>
            <Content title="JSON 格式化/壓縮" className="col-span-1 lg:col-span-2">
                <div>
                    <div className="my-2">
                        輸入:<br />
                        <Textarea placeholder="輸入JSON"
                            value={input} 
                            onChange={setInput}/>
                    </div>
                    處理選項
                    <div className="grid gap-2 grid-cols-2">
                        <Button size="lg" onClick={minifyJSON}>壓縮</Button>
                        <Button size="lg" onClick={formtJSON}>格式化</Button>
                        <Button size="lg" onClick={validateJSON}>驗證</Button>
                        <Button size="lg" onClick={copyJSON}>複製結果</Button>
                    </div>
                    {/* <div>
                        縮排空格
                    </div> */}
                    <div className="my-2"> {vaildate} </div>
                    <div className="my-8">
                        輸出結果：
                        <pre className=" bg-black/80 dark:bg-gray-900 rounded-xl p-4 text-white">
                            {output ? output : "結果顯示區域"}
                        </pre>
                    </div>
                </div>
            </Content>
        </div>
       
    )
}

export default randomPwd;



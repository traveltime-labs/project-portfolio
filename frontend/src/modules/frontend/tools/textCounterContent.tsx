"use client"

import { useTextStats } from "@/hooks/frontend/tools/useTextStats";
import Textarea from "@/components/frontend/textarea"
import Content from "@/components/frontend/content";
import InnerSideBar from "@/components/frontend/innerSidebar";
// 列表內頁
/**
 * 功能特點
    即時統計: 輸入文字即時顯示統計結果
    多維度分析: 提供字數、行數、單詞等多項數據
    快速清空: 一鍵清空所有輸入內容
    精準計算: 準確識別中英文字符和標點
    使用說明
      1.文字框中輸入或貼上需要統計的文字
      2.統計結果會自動更新顯示
      3.點擊清空按鈕可以重置內容
 */
// 可再擴充 即時統計功能
const textCounter = () => {
  const { text, setText, charCount, lineCount, wordCount, punctuationCount, avgLineLength, longestLine } = useTextStats();
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

      <Content title="文字統計小工具" className="col-span-1 lg:col-span-2">
        <Textarea
          placeholder="輸入文字..."
          value={text}
          onChange={setText}
        />

        <h3 className="font-bold mb-4 text-xl">統計結果</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-3xl text-blue-500 my-2">{charCount}</b>
            字數（中文字符）
          </div>
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-3xl text-purple-500 my-2">{lineCount}</b>
            行數
          </div>
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-3xl text-green-500 my-2">{wordCount}</b>
            英文單詞數
          </div>
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-3xl text-orange-500 my-2">{punctuationCount}</b>
            點符號數
          </div>
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-3xl text-purple-500 my-2">{avgLineLength}</b>
            平均行長
          </div>
          <div className="border rounded-xl p-4 flex flex-col justify-between">
            <b className="block text-2xl text-gray-600 break-normal my-2 wrap-break-word">{longestLine ? longestLine : '目前沒有資料'}</b>
            最多字的行
          </div>
        </div>
      </Content>
    </div>
  );
};

export default textCounter;

"use client"

import  { useTextStats }  from "@/hooks/frontend/tools/useTextStats";

// 列表內頁
const timestampChange = () => {
  console.clear()
  
  return (
    <div>
    <h2>timestamp 轉換</h2>
      <textarea 
        id="inputText" 
        placeholder="輸入文字..." >
        </textarea>
  </div>
  );
};

export default timestampChange;

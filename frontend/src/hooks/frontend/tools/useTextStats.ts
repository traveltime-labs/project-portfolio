"use client"

import { useState } from "react";

// 邏輯
export function useTextStats() {
    const [text, setText] = useState("");
    // 字數（中文字符，不含空白）
    const charCount = text.replace(/\s/g, "").length;

    // 行數統計
    const lines = text.split(/\r?\n/);
    const lineCount = lines.length;

    // 英文單詞數
    const wordCount = (text.match(/\b[a-zA-Z]+\b/g) || []).length;

    // 標點符號
    const punctuationCount = (text.match(/[.,!?;:"'，。！？；：「」]/g) || []).length;

    // 平均長
    const avgLineLength = lineCount ? (charCount / lineCount).toFixed(2) : "0";
    
    // 最長的一行
    const longestLine = lines.reduce(
        (max, line) =>
          line.replace(/\s/g, "").length > max.replace(/\s/g, "").length
            ? line
            : max,
        ""
      );

    return {
        text,
        setText,
        charCount,
        lineCount,
        wordCount,
        punctuationCount,
        longestLine,
        avgLineLength
    }
}
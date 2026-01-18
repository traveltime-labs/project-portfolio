"use client"

import { useState } from "react";

export function useGeneratePasswordState() {
    const [len, setLength] = useState(12);
    const [code, setCode] = useState("");

    // 隨機取得
    const genCode = (len = 6) => {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return Array.from(
        crypto.getRandomValues(new Uint8Array(len))
        ).map(x => chars[x % chars.length]).join('')
    }
    
    // 產生
    const handleGenerate = () => {
        if (!len || len <= 0) return alert('請輸入正確位數')
        const newCode = genCode(len)
        setCode(newCode)
    }

    return {
        len,
        setLength,
        code,
        handleGenerate
    }
}
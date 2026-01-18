"use client"

import { toast } from "sonner"
import { useState } from "react"

export function useJsonState () {
    let [input, setInput] = useState('')
    let [output, setOutput] = useState('')
    let [vaildate, setValidate] = useState('')
    
    // 拷貝
    const copyJSON = () => {
      try {
        navigator.clipboard.writeText(output)
        toast.success("複製成功")
      } catch (e) {
        console.error(`e: ${e}`)
      }
    }
    
    // 格式化
    const formtJSON = () => {
      try {
          if (input) {
            const obj = JSON.parse(input)
            setOutput(JSON.stringify(obj, null, 2))
          }
      } catch (e) {
        console.error(`e: ${e}`)
      }
    }
    
    // 壓縮
    const minifyJSON = () => {
      try {
        if (input) {
          console.log(input)
          setOutput(JSON.stringify(JSON.parse(input)))
        }
      } catch(e) {
        console.error(`e: ${e}`)
      }
    }
    
    // 驗證
    const validateJSON = () => {
      try {
        JSON.parse(input)
        const val = JSON.parse(input);
        if (typeof val === 'object' && val !== null) {
          setValidate('✅ JSON 格式正確')
        } else {
          setValidate(`❌ JSON 格式錯誤`)
        }
      } catch (e: any) {
        setValidate(`❌ JSON 格式錯誤：${e.message}`)
      }
    }

    return {
        input,
        setInput,
        output,
        setOutput,
        vaildate,
        setValidate,
        copyJSON,
        formtJSON,
        minifyJSON,
        validateJSON
    }
}
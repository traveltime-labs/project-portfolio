
/**
 * UI 佈局層 (Client)
 * 處理 useState (側邊欄開關) 和 ThemeProvider (深色模式)。
 * 只保留「狀態 (State)」和「Provider」。
 * 不要在這裡寫死 HTML 結構，而是透過 props 把 Header 和 Sidebar 傳進去。
 */

"use client"

import { useState, useEffect, useRef } from 'react'
import { ThemeProvider } from 'next-themes'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import SideTools from "@/components/SideTools"
import AIChat from "@/components/AIChat"
import InnerSidebar from "@/components/InnerSidebar"


import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import type { ImperativePanelHandle } from "react-resizable-panels"

export default function FrontendUIWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 手機板 sideBar, 預設關閉
  const [isChatOpen, setIsChatOpen] = useState(false) // ai chat, 預設關閉
  const chatPanelRef = useRef<ImperativePanelHandle>(null)
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleChat = () => {
    const chatPanel = chatPanelRef.current
    if (chatPanel) {
      if (isChatOpen) {
        // 1. 先摺疊面板
        chatPanel.collapse()
        // 2. 稍微延遲再隱藏 Handle，避免計算中的 Handle 突然消失
        setTimeout(() => setIsChatOpen(false), 100)
      } else {
        // 展開則反過來，先顯示 Handle 再展開
        setIsChatOpen(true)
        setTimeout(() => chatPanel.expand(), 10)
      }
    }
  }


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border"
      id="main-layout-group" // 手動指定 ID
    >
      <ResizablePanel 
        defaultSize={75} 
        minSize={30} 
        order={1}
        id="main-content"
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
         <div >
              {isSidebarOpen && <Sidebar />}
              <div className="flex flex-col-reverse lg:flex-row">
                <main className="w-full lg:mx-auto h-auto min-h-screen max-w-[1600px] p-4">
                  {children}
                </main>
                <div className="min-w-[300px]">
                  <InnerSidebar/>
                </div>

              </div>
              <SideTools toggleChat={toggleChat}/>
          </div>
          <Footer />
      </ResizablePanel>

      <ResizableHandle 
        id="main-handle"
        withHandle 
        // 使用 style 進行「物理存在但視覺隱藏」
        style={{ 
          width: isChatOpen ? '8px' : '0px', // 縮小寬度但不消失
          opacity: isChatOpen ? 1 : 0,       // 透明度控制
          pointerEvents: isChatOpen ? 'auto' : 'none', // 關閉時防止滑鼠觸發拖拽
          transition: 'all 0.2s ease',       // 增加平滑感
          overflow: 'hidden'
        }}
        // 移除 hidden class，改用自訂樣式
        className="border-1 bg-transparent hover:bg-accent transition-colors"
      />

      <ResizablePanel 
        id="chat-panel"
        order={2}
        defaultSize={0}        // 預設關閉
        collapsedSize={0}         // 摺疊時的大小
        ref={chatPanelRef}
        collapsible={true}      // 必須開啟此屬性
        minSize={25}            // 展開時的最小寬度
        maxSize={40}
        onCollapse={() => setIsChatOpen(false)} // 處理手動拉到消失的情況
        onExpand={() => setIsChatOpen(true)}    // 處理手動拉開的情況
        >
        <AIChat/>
      </ResizablePanel>

    </ResizablePanelGroup>
    </ThemeProvider>
  );
}


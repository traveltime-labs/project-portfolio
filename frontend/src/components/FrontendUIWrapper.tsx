

/**
 * UI 佈局層 (Client)
 * 處理 useState (側邊欄開關) 和 ThemeProvider (深色模式)。
 * 只保留「狀態 (State)」和「Provider」。
 * 不要在這裡寫死 HTML 結構，而是透過 props 把 Header 和 Sidebar 傳進去。
 */
"use client"
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function FrontendUIWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col items-center bg-gray-200/35 dark:bg-black min-h-screen">
        {/* 在這裡把狀態傳給 Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <div className="flex w-full">
            {isSidebarOpen && <Sidebar />}
            <main className="w-full lg:mx-auto h-auto min-h-80 max-w-[1600px] p-4">
              {children}
            </main>
        </div>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}
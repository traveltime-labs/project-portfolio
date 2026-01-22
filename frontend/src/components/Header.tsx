"use client"
import { FaMoon } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineWbSunny } from "react-icons/md";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Link, usePathname } from "@/i18n/routing"; // 注意要用我們自定義的 Link
import { useTranslations } from "next-intl";

import Breadcrumb from "@/components/Breadcrumb";
import IconButton from "@/components/IconButton";

type HeaderProps = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    const pathname = usePathname(); // 取得路徑
    const t = useTranslations("HomePage");

    const [keyword, setKeyword] = useState('')
    const serachKeyword = () => {
        console.log('搜尋關鍵字')
    }
    
    return (
        <header className=" sticky top-0 left-0 right-0  bg-white dark:bg-black/50 backdrop-blur-sm z-50 w-full">
            <div className=" py-3 px-4 lg:px-0 lg:max-w-[1600px] w-full flex items-center justify-between mx-auto">
                <h1 className=" font-bold text-dark dark:text-white transition-colors">
                    <Link href="/">{t("title")}</Link>
                </h1>


                <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">

                    <div className="hidden md:block mr-10">
                        <Link href="/">page0 {/* 首頁: 最新文章*/}</Link>
                        <Link href="/category">page1 {/* 分類: 一堆標籤*/}</Link>
                        <Link href="/about">page2 {/* 關於我: 介紹及作品集連結*/}</Link>
                        <Link href="/articles">page3 {/* 文章列表: 歷史線性呈現 */}</Link> 
                        {/*<Link href="/Clander">page4  日立: 發文軌跡(不一定要做) </Link> */}
                    </div>


                    <div className='hidden md:flex items-center gap-2 border rounded-4xl px-2 py-1.5'>
                        <input type="text" className="w-40"
                            placeholder="Search..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown = {(e) => { if (e.key === 'Enter') serachKeyword() }}
                        />
                        <IconButton className=" flex justify-end">
                            <IoIosSearch />
                        </IconButton>
                    </div>

                    
                   
                    
                    <div className="block md:hidden">
                        <IoIosSearch />
                    </div>
                    
                        {/*<div data-orientation="vertical" className="bg-border w-0.5 h-4 hidden lg:block"></div>*/}
                        <IconButton onClick={toggleTheme}>
                            {theme === 'light' ? <FaMoon /> : <MdOutlineWbSunny />}
                        </IconButton>
                        
                        {/* <div data-orientation="vertical" className="bg-border w-0.5 h-4 hidden lg:block"></div> */}

                        <IconButton>
                        <Link 
                            href={pathname} 
                            locale="zh" 
                            className={`px-2 py-1 text-sm ${pathname.includes('/zh') ? 'font-bold' : ''}`}
                            >
                                中
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link 
                            href={pathname} 
                            locale="en" 
                            className={`px-2 py-1 text-sm ${pathname.includes('/en') ? 'font-bold' : ''}`}
                            >
                                EN
                            </Link>
                        </IconButton>
                    
                    <div className=" lg:hidden" onClick={toggleSidebar}>
                        {!isSidebarOpen ? <RxHamburgerMenu className="btn-sidebar" /> : <IoClose className="btn-sidebar" />}
                    </div>
                </div>
            </div>
            <Breadcrumb/>
        </header>
    );
}


export default header;
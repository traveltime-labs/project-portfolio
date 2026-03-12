"use client"
import { FaMoon } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineWbSunny } from "react-icons/md";

// import { useState } from "react";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing"; // 注意要用我們自定義的 Link
import { useTranslations } from "next-intl";
// import { IoLanguage } from "react-icons/io5";

import Breadcrumb from "@/components/Breadcrumb";
// import IconButton from "@/components/IconButton";

import {Button} from "@/components/ui/button";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

type HeaderProps = {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    // const pathname = usePathname(); // 取得路徑
    const t = useTranslations();

    return (
        <header className="fixed top-0 left-0 right-0  bg-white dark:bg-black/50 backdrop-blur-sm z-50 w-full" data-testid="header-root">
            <div className=" py-3 px-4 lg:max-w-400 w-full flex items-center justify-between mx-auto" data-testid="header-container">
                <h1 className=" font-bold text-dark dark:text-white transition-colors">
                    <Link href="/" data-testid="header-title-link">{t("HomePage.title")}</Link>
                </h1>


                <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end" data-testid="header-actions">

                    <div className="hidden lg:block" data-testid="header-nav">
                        <Link className="mx-2" href="/" data-testid="header-nav-home">{t("Menu.Home")} {/* 首頁: 最新文章*/}</Link>
                        <Link className="mx-2" href="/category" data-testid="header-nav-category">
                            {t("Menu.Category")} {/* 分類 */}
                        </Link>
                        <Link className="mx-2" href="/tags" data-testid="header-nav-tags">
                            {t("Menu.Tags")} {/* 標籤*/}
                        </Link>
                        <Link className="mx-2" href="/about" data-testid="header-nav-about">
                            {t("Menu.About")} {/* 關於我: 介紹及作品集連結*/}
                        </Link>
                        <Link className="mx-2" href="/articles" data-testid="header-nav-articles">
                            {t("Menu.List")} {/* 文章列表: 歷史線性呈現 */}
                        </Link>
                        {/*<Link href="/Clander">page4  日立: 發文軌跡(不一定要做) </Link> */}
                    </div>

                    {/* 
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
                    </div> */}

                    {/* 主題切換 */}
                    <Button variant="ghost" onClick={toggleTheme} data-testid="header-theme-toggle">
                        {theme === 'light' ? <FaMoon /> : <MdOutlineWbSunny />}
                    </Button>

                    {/* 語系選單 */}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <IoLanguage/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link
                                    href={pathname}
                                    locale="zh"
                                    className={`px-2 py-1 text-sm ${pathname.includes('/zh') ? 'font-bold' : ''}`}
                                >
                                    中
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link
                                    href={pathname}
                                    locale="en"
                                    className={`px-2 py-1 text-sm ${pathname.includes('/en') ? 'font-bold' : ''}`}
                                >
                                    EN
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                    <div className=" lg:hidden" onClick={toggleSidebar} data-testid="header-sidebar-toggle">
                        {!isSidebarOpen ? <RxHamburgerMenu className="btn-sidebar" /> : <IoClose className="btn-sidebar" />}
                    </div>
                </div>
            </div>
            <div data-testid="header-breadcrumb">
                <Breadcrumb />
            </div>
        </header>
    );
}


export default header;
"use client";

//import { usePathname } from "next/navigation";
//import Link from "next/link";
import { Link, usePathname } from "@/i18n/routing";

const routeMap: Record<string, string> = {
    "": "首頁",
    tools: "小工具",
    text: "文字統計小工具",
    generatePassword: "隨機密碼產生器",
};
  
  export default function Breadcrumb() {
    const pathname = usePathname(); 
    const segments = pathname.split("/").filter(Boolean);
  
    return (
      <nav className=" border-y-1 py-3 px-4 lg:px-2 text-sm text-gray-500 w-full mx-auto bg-white dark:bg-black/20 ">
        <div className="max-w-400 mx-auto">
          <Link href="/">首頁</Link>
          {segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            return (
              <span key={href}>
                <span className="mx-2"> {" / "} </span>
                <span className="text-blue-400" >
                  {routeMap[seg] ?? seg}
                </span>
                {/* <Link className="text-blue-400" href={href}>
                  {routeMap[seg] ?? seg}
                </Link> */}
              </span>
            );
          })}
        </div>
      </nav>
    );
  }
  
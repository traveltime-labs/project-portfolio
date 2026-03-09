"use client";

//import { usePathname } from "next/navigation";
import { sidebarLink } from "@/config/sidebarLinkSetting";
import { Link, usePathname } from "@/i18n/routing";

  export default function Breadcrumb() {
    const pathname = usePathname(); 
    const segments = pathname.split("/").filter(Boolean);
    let route = [...sidebarLink.map(item => item.link)];
  
    return (
      <nav className=" border-y-1 py-3 px-4 text-sm text-gray-500 w-full mx-auto bg-white dark:bg-black/20 ">
        <div className="max-w-400 mx-auto px-0">
          <Link href="/">首頁</Link>
          {segments.map((seg, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            return (
              <span key={href}>
                <span className="mx-2"> {" / "} </span>
                <span className="text-blue-400" >
                  {route.includes(href) ? sidebarLink.find(item => item.link === href)?.name ?? seg : seg}
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
  
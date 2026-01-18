import { sidebarLink } from "@/config/sidebarLinkSetting";
import { Link, usePathname } from "@/i18n/routing"; 

const sidebar = () => {
    return (
        <div className="sideBar fixed bg-white dark:bg-black/50 w-full h-full z-10 flex flex-col gap-12 overflow-auto px-6 py-6 backdrop-blur-sm lg:hidden" >
            <div className="mt-30">
                
                <Link href="/login" className="mb-10">登入</Link>

                {sidebarLink.uiComponents?.length > 0 ? 
                <div className="flex flex-col gap-3">
                    <div className="text-muted-foreground text-sm font-medium">UI元件</div>
                    {sidebarLink.uiComponents.map((component: {name: string, link: string}, index) => (
                        component.name ? <a key={index} className="text-2xl font-medium" href={component.link}>{component.name}</a> : ''
                    ))}
                </div> : ''}

                <div className="flex flex-col gap-3">
                    <div className="text-muted-foreground text-sm font-medium">小工具</div>
                    {sidebarLink.tools.map((component, index) => (
                        component.name ? <a key={index} className="text-2xl font-medium" href={component.link}>{component.name}</a> : ''
                    ))}
                </div>

            </div>
        </div>
    )
}

export default sidebar;
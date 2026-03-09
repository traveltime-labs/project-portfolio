import { sidebarLink } from "@/config/sidebarLinkSetting";
import { Link } from "@/i18n/routing"; 

interface SidebarProps {
    isOpen: boolean;
    onClose?: () => void;
}

const sidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        <div className={`sideBar fixed bg-white dark:bg-black/50 w-full h-full z-10 flex flex-col gap-12 overflow-auto left-0 px-6 py-6 backdrop-blur-sm lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
        }`} >
            <div className="mt-30">  
                {/* <Link href="/login" className="mb-10">登入</Link> */}
                <div className="flex flex-col gap-3">
                    {sidebarLink.map((component, index) => (
                        component.name ? <Link key={index} className="text-2xl font-medium" href={component.link} onClick={onClose}>{component.name}</Link> : ''
                    ))}
                </div>

            </div>
        </div>
    )
}

export default sidebar;
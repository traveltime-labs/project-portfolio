import Link from "next/link";
import { Sidebar, useSidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar"
import { CiBoxList } from "react-icons/ci";

export default function AppSidebar () {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      } = useSidebar()

    const projects = [
        {
            name: '列表',
            url: '/admin/posts',
            icon: CiBoxList
        }
     ]
    return  (
        <Sidebar>
            <SidebarContent>
                <h1 className="p-4">
                    <b>Toolkit </b>
                </h1>
                {/* <SidebarTrigger /> */}
                <SidebarGroup>
                {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {projects.map((project) => (
                            <SidebarMenuItem key={project.name}>
                            <SidebarMenuButton asChild>
                                <a href={project.url}>
                                    <project.icon />
                                    <span>{project.name}</span>
                                </a>
                            </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}




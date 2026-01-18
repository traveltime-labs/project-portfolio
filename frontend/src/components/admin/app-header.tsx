import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { IoLogOutOutline } from "react-icons/io5";

import { useLogout } from "@/hooks/auth/logout";

function AppHeader() {
  const { handleLogout } = useLogout();
  return (
    <div className=" bg-white flex items-center justify-between p-4">
      <div>
        <SidebarTrigger className="p-4" />
      </div>
      <div>
        <div className="w-5">
          <IoLogOutOutline onClick={() => handleLogout()} />
        </div>
      </div>
    </div>
  )
}

export default AppHeader;
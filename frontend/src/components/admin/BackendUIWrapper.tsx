"use client"

import AppSidebar from "@/components/admin/app-sidebar"
import Footer from "@/components/Footer";
import { ThemeProvider } from 'next-themes'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppHeader from "@/components/admin/app-header";
import Breadcrumb from "@/components/Breadcrumb";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <AppHeader/>
          <Breadcrumb/>
          {children}
          <Footer/>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default Layout;

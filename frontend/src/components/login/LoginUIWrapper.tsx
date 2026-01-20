"use client"

import Footer from "@/components/Footer";
import { ThemeProvider } from 'next-themes'
import Breadcrumb from "@/components/Breadcrumb";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <main className="w-full">
          <Breadcrumb/>
          {children}
          <Footer/>
        </main>
    </ThemeProvider>
  )
}

export default Layout;

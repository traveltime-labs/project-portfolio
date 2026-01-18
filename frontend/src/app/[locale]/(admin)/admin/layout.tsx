

import type { Metadata } from "next";
import BackendUIWrapper from "@/components/admin/BackendUIWrapper";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <BackendUIWrapper>
        <main>
          {children}
        </main>
      </BackendUIWrapper>
    );
  }
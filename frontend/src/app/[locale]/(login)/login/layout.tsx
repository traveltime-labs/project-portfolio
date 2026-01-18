

import type { Metadata } from "next";
import LoginUIWrapper from "@/components/login/LoginUIWrapper";


export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <LoginUIWrapper>
        <main>
          {children}
        </main>
      </LoginUIWrapper>
    );
  }
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type BreadcrumbContextValue = {
  breadcrumbTitle: string | null;
  setBreadcrumbTitle: (title: string | null) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbTitle, setBreadcrumbTitle] = useState<string | null>(null);
  const value = useMemo(
    () => ({ breadcrumbTitle, setBreadcrumbTitle }),
    [breadcrumbTitle],
  );

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
}

export function useBreadcrumbTitle() {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error("useBreadcrumbTitle must be used within BreadcrumbProvider");
  }

  return context;
}
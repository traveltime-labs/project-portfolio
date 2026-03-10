"use client";

import { useEffect } from "react";
import { useBreadcrumbTitle } from "@/providers/breadcrumb-provider";

type BreadcrumbTitleSyncProps = {
  title?: string;
};

export default function BreadcrumbTitleSync({ title }: BreadcrumbTitleSyncProps) {
  const { setBreadcrumbTitle } = useBreadcrumbTitle();

  useEffect(() => {
    setBreadcrumbTitle(title ?? null);

    return () => {
      setBreadcrumbTitle(null);
    };
  }, [setBreadcrumbTitle, title]);

  return null;
}
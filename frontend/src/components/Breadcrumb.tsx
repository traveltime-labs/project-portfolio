"use client";

//import { usePathname } from "next/navigation";
import { sidebarLink } from "@/config/sidebarLinkSetting";
import { Link, usePathname } from "@/i18n/routing";
import { useBreadcrumbTitle } from "@/providers/breadcrumb-provider";

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const decodedSegments = segments.map(decodeSegment);
  const route = sidebarLink.map((item) => item.link);
  const { breadcrumbTitle } = useBreadcrumbTitle();
  const isBlogDetailPage = decodedSegments.length >= 2 && decodedSegments[0] === "blog";

  return (
    <nav className="border-y py-3 text-sm text-gray-500 w-full mx-auto bg-white dark:bg-black/20 ">
      <div className="lg:max-w-400 px-4 mx-auto">
        <Link href="/">首頁</Link>
        {segments.map((seg, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const decodedHref = "/" + decodedSegments.slice(0, idx + 1).join("/");
          const decodedSeg = decodedSegments[idx];
          const isLastSegment = idx === segments.length - 1;
          const displayLabel = isBlogDetailPage && isLastSegment && breadcrumbTitle
            ? breadcrumbTitle
            : route.includes(decodedHref)
              ? sidebarLink.find((item) => item.link === decodedHref)?.name ?? decodedSeg
              : decodedSeg;

          return (
            <span key={href}>
              <span className="mx-2"> {" / "} </span>
              <span className="text-blue-400">
                {displayLabel}
              </span>
              {/* <Link className="text-blue-400" href={href}>
                {routeMap[seg] ?? seg}
              </Link> */}
            </span>
          );
        })}
      </div>
    </nav>
  );
}

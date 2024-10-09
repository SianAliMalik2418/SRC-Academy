"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const SidebarItem = ({ label, href, icon: Icon }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const isActive = pathName === href || (pathName === "/" && href === "/");

  return (
    <button
      type="button"
      onClick={() => router.push(href)}
      className={cn(
        "flex items-center w-full gap-x-2 text-sm font-[500] pl-6 transition-all text-primary hover:bg-secondary",
        isActive &&
          "bg-sky-500/20 border-r-4 border-sky-400 text-white hover:bg-sky-500/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon />
        <p>{label}</p>
      </div>
    </button>
  );
};

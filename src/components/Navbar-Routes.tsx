"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import SearchInput from "@/app/(dashboard)/_components/SearchInput";

const NavbarRoutes = () => {
  const pathName = usePathname();

  const isTeacherMode = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/courses");
  const isSearchPage = pathName?.includes("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex flex-1 items-center justify-end gap-x-4">
        {isTeacherMode || isPlayerPage ? (
          <Link href={"/"} className="rounded-xl">
            <Button variant={"ghost"}>
              <LogOutIcon className="mr-1 text-sm" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"} className="rounded-xl">
            <Button variant={"ghost"}>Teacher Mode</Button>
          </Link>
        )}

        <UserButton />
      </div>
    </>
  );
};

export default NavbarRoutes;

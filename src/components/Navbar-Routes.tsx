"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

const NavbarRoutes = () => {
  const pathName = usePathname();

  const isTeacherMode = pathName?.startsWith("/teacher");
  const isPlayerPage = pathName?.includes("/courses");

  return (
    <div className="flex gap-x-4">
      {isTeacherMode || isPlayerPage ? (
        <Link href={"/"}>
          <Button variant={"ghost"} size={"sm"}>
            <LogOutIcon className="mr-1 text-sm" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button variant={"ghost"} size={"sm"}>
            Teacher Mode
          </Button>
        </Link>
      )}

      <UserButton />
    </div>
  );
};

export default NavbarRoutes;

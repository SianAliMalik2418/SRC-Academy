import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="z-[100] pr-4 hover:opacity-75 md:hidden">
        <Menu className="my-10" />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-background w-[80%] p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

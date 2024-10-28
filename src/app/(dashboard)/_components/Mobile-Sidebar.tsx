import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="z-[100] pr-4 hover:opacity-75 lg:hidden">
        <Menu className="my-10" />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[80%] bg-background p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 z-[100] ">
        <Menu className="my-10 " />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-background w-[90%] ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

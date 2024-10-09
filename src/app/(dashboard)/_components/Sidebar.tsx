import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SidebarRoutes from "./Sidebar-Routes";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-background py-10 md:border-r gap-10 w-56 flex flex-col shadow-sm h-full z-50 fixed inset-y-0",
        className
      )}
    >
      <Logo />
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;

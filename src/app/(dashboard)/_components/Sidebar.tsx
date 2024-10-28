import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SidebarRoutes from "./Sidebar-Routes";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "inset-y-0 z-50 flex h-full w-full flex-col gap-10 py-10 shadow-sm md:fixed md:w-56 md:border-r",
        className,
      )}
    >
      <Logo />
      <SidebarRoutes />
    </div>
  );
};

export default Sidebar;

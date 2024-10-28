import NavbarRoutes from "@/components/Navbar-Routes";
import MobileSidebar from "./Mobile-Sidebar";

const Navbar = () => {
  return (
    <nav className="z-50 flex h-full items-center justify-between border-b bg-background p-4 shadow-sm md:pl-60">
      <MobileSidebar />
      <NavbarRoutes />
    </nav>
  );
};

export default Navbar;

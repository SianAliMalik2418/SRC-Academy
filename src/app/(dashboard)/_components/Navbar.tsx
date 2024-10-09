import NavbarRoutes from "@/components/Navbar-Routes";
import MobileSidebar from "./Mobile-Sidebar";

const Navbar = () => {
  return (
    <nav className="h-full bg-background md:pl-60 border-b shadow-sm p-4 flex items-center justify-between md:justify-end z-50">
      <MobileSidebar />
      <NavbarRoutes />
    </nav>
  );
};

export default Navbar;

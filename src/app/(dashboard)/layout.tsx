import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DasboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex gap-5 py-10">
      <div className="h-[80px] md:pl-50 fixed w-full z-50 inset-y-0">
        <Navbar />
      </div>

      <div className="hidden md:flex flex-col fixed w-56 h-full z-50">
        <Sidebar />
      </div>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  );
};

export default DasboardLayout;

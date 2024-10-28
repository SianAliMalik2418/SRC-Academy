import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DasboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full gap-5 py-10">
      <div className="lg:pl-50 fixed inset-y-0 z-50 h-[80px] w-full">
        <Navbar />
      </div>

      <div className="fixed z-50 hidden h-full w-56 flex-col lg:flex">
        <Sidebar />
      </div>
      <main className="h-full pt-[47px] lg:pl-56">{children}</main>
    </div>
  );
};

export default DasboardLayout;

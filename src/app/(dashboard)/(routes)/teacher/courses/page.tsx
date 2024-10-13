import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <Link
      href={"/teacher/create"}
      className="flex h-full w-screen items-center justify-center md:w-[83vw]"
    >
      <Button>Create Course</Button>
    </Link>
  );
};

export default CoursesPage;

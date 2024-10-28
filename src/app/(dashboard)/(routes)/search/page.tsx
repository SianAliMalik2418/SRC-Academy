/* eslint-disable @typescript-eslint/no-explicit-any */
import Categories from "./_components/Categories";
import SearchInput from "../../_components/SearchInput";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { CourseModelType } from "@/types/types";
import CoursesList from "./_components/Courses-List";

const SearchPage = async ({
  searchParams: { title, category },
}: {
  searchParams: {
    title: string;
    category: string;
  };
}) => {
  const { userId } = auth();

  console.log(title, category);

  if (!userId) {
    redirect("/");
  }

  await connectDB();

  const query: any = {
    userId,
    isPublished: true,
  };

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const courses: CourseModelType[] = await CourseModel.find(query);

  return (
    <div className="max-w-screen flex w-screen flex-col overflow-x-hidden p-2 py-5 md:p-6 lg:w-[83vw]">
      <div className="mb-5 block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <Categories />

      {courses.length === 0 && (
        <span className="mt-10 text-sm font-semibold text-secondary-foreground">
          No courses found.
        </span>
      )}

      <div className="mt-7">
        <CoursesList courses={courses} />
      </div>
    </div>
  );
};

export default SearchPage;

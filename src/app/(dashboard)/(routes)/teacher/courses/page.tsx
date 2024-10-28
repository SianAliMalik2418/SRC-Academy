/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTable } from "./_components/data-table";
import { CourseModel } from "@/db/models/CourseModel";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "@/db/dbconfig";
import { CourseModelType } from "@/types/types";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  async function getData(): Promise<CourseModelType[]> {
    await connectDB();
    const courses: CourseModelType[] = await CourseModel.find({ userId });

    return courses.map((course) => ({
      _id: course._id.toString(),
      userId: course._id.toString(),
      title: course.title,
      price: course.price,
      isPublished: course.isPublished,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));
  }

  const courses = await getData();

  return (
    <div className="max-w-screen p-1 md:w-[83vw] md:p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;

import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { courseId: string } },
) => {
  const { courseId } = params;

  try {
    await connectDB();

    const { userId } = auth();

    const values = await request.json();

    console.log(values);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to update course" },
        { status: 401 },
      );
    }

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      values,
      {
        new: true,
      },
    );

    return NextResponse.json(
      { success: true, message: "Course updated", updatedCourse },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating course" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { courseId: string } },
) => {
  const { courseId } = params;

  try {
    await connectDB();

    const { userId } = auth();

    const values = await request.json();

    console.log(values);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to delete course" },
        { status: 401 },
      );
    }

    const deletedCourse = await CourseModel.findByIdAndDelete(courseId);

    return NextResponse.json(
      { success: true, message: "Course deleted", deletedCourse },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while deleting course" },
      { status: 500 },
    );
  }
};

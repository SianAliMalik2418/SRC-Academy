import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { courseId: string } },
) => {
  const { courseId } = params;

  try {
    await connectDB();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to reorder chapters." },
        { status: 401 },
      );
    }

    const { list } = await request.json();

    // Find the course by ID
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 },
      );
    }

    if (course.userId !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this course.",
        },
        { status: 403 },
      );
    }

    // Loop through the list of chapters and update their positions in the database
    for (const item of list) {
      const { id, position } = item;
      await CourseModel.updateOne(
        { _id: courseId, "chapters._id": id },
        {
          $set: { "chapters.$.position": position },
        },
      );
    }

    return NextResponse.json(
      { success: true, message: "Chapters reordered successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while reordering chapters.",
      },
      { status: 500 },
    );
  }
};

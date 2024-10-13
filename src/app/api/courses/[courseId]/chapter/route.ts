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
    const { chapterTitle } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to create chapter." },
        { status: 401 },
      );
    }

    // Fetch the course by ID
    const course = await CourseModel.findOne({ _id: courseId });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found." },
        { status: 404 },
      );
    }

    // Find the latest chapter by sorting based on position
    const latestChapter = course.chapters.sort(
      (a: { position: number }, b: { position: number }) =>
        b.position - a.position,
    )[0];

    // Determine the new position
    const newPosition = latestChapter ? latestChapter.position + 1 : 1;

    // Update the course by adding the new chapter
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $push: {
          chapters: {
            chapterTitle: chapterTitle,
            position: newPosition, // Set the new position
          },
        },
      },
      { new: true }, // Return the updated course
    );

    return NextResponse.json(
      { success: true, message: "Chapter created", updatedCourse },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating course.",
      },
      { status: 500 },
    );
  }
};

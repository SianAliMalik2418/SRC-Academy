/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { Chapter } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { chapterId: string; courseId: string } },
) => {
  const { chapterId, courseId } = params;

  try {
    await connectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to update course" },
        { status: 401 },
      );
    }

    const { isPublished } = await request.json();

    console.log(isPublished);

    // Find the course and ensure the chapter exists
    const course = await CourseModel.findOne({
      _id: courseId,
      userId: userId,
      "chapters._id": chapterId,
    });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course or chapter not found" },
        { status: 404 },
      );
    }

    // Find the chapter index
    const chapterIndex = course.chapters.findIndex(
      (chapter: Chapter) => chapter._id.toString() === chapterId,
    );

    if (chapterIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Chapter not found" },
        { status: 404 },
      );
    }

    // Update chapter's published status
    course.chapters[chapterIndex].isPublished = isPublished; // Set the published status

    // Save the updated course
    await course.save();
    console.log("Course saved successfully", isPublished);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: isPublished
          ? "Chapter published successfully"
          : "Chapter unpublished successfully",
        updatedChapter: course.chapters[chapterIndex],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH handler error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while publishing",
      },
      { status: 500 },
    );
  }
};

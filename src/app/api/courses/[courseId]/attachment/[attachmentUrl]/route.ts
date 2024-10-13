import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { courseId: string; attachmentUrl: string } },
) => {
  const { courseId, attachmentUrl } = params;
  try {
    await connectDB();
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authorized to delete attachments",
        },
        { status: 401 },
      );
    }

    // Find the course and remove the specific attachment
    const updatedCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId, userId },
      {
        $pull: {
          attachments: { attachmentUrl: decodeURIComponent(attachmentUrl) },
        },
      },
      { new: true },
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { success: false, message: "Course not found or user not authorized" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Attachment deleted", updatedCourse },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while deleting attachment",
      },
      { status: 500 },
    );
  }
};

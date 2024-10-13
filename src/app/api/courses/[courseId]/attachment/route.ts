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
    const { attachmentUrl } = await request.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authorized to update course attachments",
        },
        { status: 401 },
      );
    }

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { _id: courseId, userId },
      {
        $push: {
          attachments: {
            attachmentName: attachmentUrl.split("/").pop(),
            attachmentUrl,
          },
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
      { success: true, message: "Attachment added", updatedCourse },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while adding attachment",
      },
      { status: 500 },
    );
  }
};

import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { userId } = auth();

    const { title } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to create course" },
        { status: 401 },
      );
    }

    const course = new CourseModel({
      userId,
      title,
    });

    await course.save();

    return NextResponse.json(
      { success: true, message: "Course created", course: course.toObject() },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while creating course" },
      { status: 500 },
    );
  }
};

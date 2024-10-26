/* eslint-disable @typescript-eslint/no-unused-vars */
import Mux from "@mux/mux-node";
import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { Chapter } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Check if Mux credentials are configured
const tokenId = process.env.MUX_TOKEN_ID;
const tokenSecret = process.env.MUX_TOKEN_SECRET;

if (!tokenId || !tokenSecret) {
  throw new Error("MUX credentials are not properly configured");
}

// Initialize Mux client
const muxClient = new Mux({
  tokenId,
  tokenSecret,
});

const video = muxClient.video;

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

    const { isPublished, ...values } = await request.json();

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

    // Handle video upload if a new video URL is provided
    if (values.videoUrl) {
      const existingMuxData = course.chapters[chapterIndex].muxData;

      // Delete existing Mux asset if it exists
      if (existingMuxData?.assetId) {
        try {
          await video.assets.delete(existingMuxData.assetId);
          console.log("Deleted existing Mux asset:", existingMuxData.assetId);
        } catch (deleteError) {
          console.error("Error deleting existing Mux asset:", deleteError);
        }
      }

      try {
        // Create new Mux asset
        const asset = await video.assets.create({
          input: values.videoUrl,
          playback_policy: ["public"],
          test: false,
        });

        console.log("Created new Mux asset:", asset.id);

        // Update chapter with new Mux data
        if (asset.playback_ids && asset.playback_ids.length > 0) {
          course.chapters[chapterIndex].muxData = {
            assetId: asset.id,
            playbackId: asset.playback_ids[0].id,
          };
          console.log("Updated chapter with new Mux data");
        } else {
          throw new Error("No playback IDs received from Mux");
        }
      } catch (muxError) {
        console.error("Mux processing error:", muxError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to process video with Mux",
            error:
              muxError instanceof Error
                ? muxError.message
                : "Unknown Mux error",
          },
          { status: 500 },
        );
      }
    }

    // Update other chapter fields
    course.chapters[chapterIndex] = {
      ...course.chapters[chapterIndex].toObject(),
      ...values,
    };

    // Save the updated course
    await course.save();
    console.log("Course saved successfully");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Chapter updated successfully",
        updatedChapter: course.chapters[chapterIndex],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH handler error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the chapter",
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { chapterId: string; courseId: string } },
) => {
  const { chapterId, courseId } = params;

  try {
    await connectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authorized to delete chapter" },
        { status: 401 },
      );
    }

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

    course.chapters = course.chapters.filter(
      (chapter: Chapter) => chapter._id.toString() !== chapterId,
    );

    await course.save();

    return NextResponse.json(
      { success: true, message: "Chapter deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE handler error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while deleting the chapter",
      },
      { status: 500 },
    );
  }
};

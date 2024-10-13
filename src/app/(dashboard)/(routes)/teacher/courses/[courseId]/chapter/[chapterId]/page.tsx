import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { Chapter } from "@/types/types";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

const SingleChapterPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { chapterId, courseId } = params;

  if (!chapterId || !courseId) {
    return redirect("/");
  }

  connectDB();
  const result = await CourseModel.aggregate([
    { $match: { _id: new ObjectId(courseId) } },
    { $unwind: "$chapters" },
    { $match: { "chapters._id": new ObjectId(chapterId) } },
    { $replaceRoot: { newRoot: "$chapters" } },
  ]);

  const chapter: Chapter = result[0];

  const requiredFields = [
    chapter.chapterTitle,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return <div>{completionText}</div>;
};

export default SingleChapterPage;

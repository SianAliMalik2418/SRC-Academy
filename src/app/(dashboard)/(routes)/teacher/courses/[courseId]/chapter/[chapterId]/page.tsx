import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import { Chapter } from "@/types/types";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/Icon-Badge";
import ChapterTitleForm from "@/forms/chapter-forms/ChapterTitleForm";
import ChapterDescriptionForm from "@/forms/chapter-forms/ChapterDescriptionForm";
import ChapterAcessForm from "@/forms/chapter-forms/ChapterAcessForm";
import ChapterVideoForm from "@/forms/chapter-forms/ChapterVideoForm";
import Banner from "@/components/ui/banner";
import ChapterActions from "@/components/Chapter-Actions";

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

  const chapterData: Chapter = JSON.parse(JSON.stringify(chapter));

  const requiredFields = [
    chapter.chapterTitle,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isRequiredFieldsCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant={"warning"}
          label="This chapter is unpublished, It will not be visible in the course."
        />
      )}

      <div className="flex w-screen flex-col gap-2 overflow-hidden p-6 md:ml-2 md:w-[80vw]">
        <Button variant={"ghost"} className="w-fit p-0 px-1">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center gap-3"
          >
            <ArrowLeft className="md:size-4" />
            <span className="text-sm md:text-base">Back to course setup.</span>
          </Link>
        </Button>

        <div className="flex w-full items-center justify-between px-2">
          <div className="flex flex-col gap-2">
            <h1 className="mt-10 text-2xl font-semibold md:mt-7">
              Chapter Creation
            </h1>
            <span className="text-xs text-muted-foreground">
              Complete all fields {completionText}
            </span>
          </div>
          <ChapterActions
            disabled={!isRequiredFieldsCompleted}
            isPublished={chapter.isPublished!}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>

        <div className="mt-12 flex flex-col gap-14 md:flex-row">
          {/* 1 row */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center gap-2">
              <IconBadge icon={LayoutDashboard} />
              <h1 className="text-xl font-normal">Customize your chapter</h1>
            </div>

            <ChapterTitleForm initialData={chapterData} courseId={courseId} />
            <ChapterDescriptionForm
              initialData={chapterData}
              courseId={courseId}
            />

            <div className="mt-7 flex items-center gap-2">
              <IconBadge icon={Eye} />
              <h1 className="text-xl font-normal">Access Settings</h1>
            </div>
            <ChapterAcessForm initialData={chapterData} courseId={courseId} />
          </div>

          {/* 2 row */}

          <div className="flex h-full flex-1 flex-col gap-6">
            <div className="flex items-center gap-2">
              <IconBadge icon={Video} />
              <h1 className="text-xl font-normal">Add a Video</h1>
            </div>
            <div className="min-h-72 rounded-md bg-slate-900">
              <ChapterVideoForm initialData={chapterData} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleChapterPage;

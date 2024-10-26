import CourseActions from "@/components/Course-Actions";
import { IconBadge } from "@/components/Icon-Badge";
import Banner from "@/components/ui/banner";
import { connectDB } from "@/db/dbconfig";
import { CourseModel } from "@/db/models/CourseModel";
import CourseAttachmentForm from "@/forms/course-forms/CourseAttachmentForm";
import CourseCategoryForm from "@/forms/course-forms/CourseCategoryForm";
import CourseChapterForm from "@/forms/course-forms/CourseChapterForm";
import CourseDescriptionForm from "@/forms/course-forms/CourseDescriptionForm";
import CourseImageForm from "@/forms/course-forms/CourseImageForm";
import CoursePriceForm from "@/forms/course-forms/CoursePriceForm";
import CourseTitleForm from "@/forms/course-forms/CourseTitleForm";
import { CourseModelType } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListCheck,
} from "lucide-react";
import { redirect } from "next/navigation";

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  await connectDB();
  const course: CourseModelType | null = await CourseModel.findById(
    params.courseId,
  );

  // Convert Mongoose document to a plain JavaScript object
  const courseData: CourseModelType = JSON.parse(JSON.stringify(course));

  if (!courseData || !course || !userId || course.userId !== userId) {
    return redirect("/");
  }

  const requiredFields = [
    courseData.title,
    courseData.description,
    courseData.imageUrl,
    courseData.price,
    courseData.category,
    courseData?.chapters?.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isRequiredFieldsCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant={"warning"}
          label="This course is unpublished, It will not be visible to the students."
        />
      )}
      <div className="flex w-screen flex-col gap-2 p-6 md:ml-2 md:w-[80vw]">
        <div className="flex w-full items-center justify-between px-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium">Course Setup </h1>
            <span className="text-sm text-muted-foreground">
              Complete all fields {completionText}
            </span>
          </div>
          <CourseActions
            disabled={!isRequiredFieldsCompleted}
            isPublished={course.isPublished!}
            courseId={course._id}
          />
        </div>

        <div className="mt-12 flex flex-col gap-14 md:flex-row">
          {/* 1 row */}
          <div className="flex w-[55%] flex-col gap-6">
            <div className="flex items-center gap-2">
              <IconBadge icon={LayoutDashboard} />
              <h1 className="text-xl font-normal">Customize your course</h1>
            </div>

            <CourseTitleForm initialData={courseData} />
            <CourseDescriptionForm initialData={courseData} />

            <div className="min-h-72 w-full rounded-md bg-slate-900">
              <CourseImageForm initialData={courseData} />
            </div>
            <CourseCategoryForm initialData={courseData} />
          </div>

          {/* 2 row */}

          <div className="flex w-[45%] flex-col gap-6">
            <div className="flex items-center gap-2">
              <IconBadge icon={ListCheck} />
              <h1 className="text-xl font-normal">Course Chapters</h1>
            </div>
            <CourseChapterForm initialData={courseData} />

            {/* Price Section */}
            <div className="mt-5 flex flex-col space-y-7">
              <div className="flex items-center gap-2">
                <IconBadge icon={CircleDollarSign} />
                <h1 className="text-xl font-normal">Sell your Course</h1>
              </div>

              <CoursePriceForm initialData={courseData} />
            </div>

            {/* Attachment Section */}

            <div className="mt-5 flex flex-col space-y-7">
              <div className="flex items-center gap-2">
                <IconBadge icon={File} />
                <h1 className="text-xl font-normal">
                  Resources and Attachments
                </h1>
              </div>

              <CourseAttachmentForm initialData={courseData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;

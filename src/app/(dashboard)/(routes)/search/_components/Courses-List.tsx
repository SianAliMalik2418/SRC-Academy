import { CourseModelType } from "@/types/types";
import CourseCard from "./CourseCard";

const CoursesList = ({ courses }: { courses: CourseModelType[] }) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            _id={course._id}
            title={course.title}
            imageUrl={course.imageUrl || ""}
            chaptersLength={course.chapters?.length || 0}
            price={course.price || 0}
            progress={course.userProgress || []}
            category={course.category || "Uncategorized"}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;

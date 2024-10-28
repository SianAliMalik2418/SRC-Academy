import { IconBadge } from "@/components/Icon-Badge";
import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CourseCardPropsType = {
  _id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: {
    userId: string;
    isCompleted?: boolean;
  }[];
  category: string;
};

const CourseCard = ({
  _id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardPropsType) => {
  return (
    <Link href={`/courses/${_id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm md:hover:scale-[1.05]">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>

        <div className="flex flex-col pt-2">
          <div className="line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base">
            {title}
          </div>

          <p className="text-xs text-muted-foreground">{category}</p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size={"sm"} icon={BookOpen} />

              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>

          {progress !== null ? (
            <div>TODO : progress component</div>
          ) : (
            <p className="text-md font-medium text-slate-700 md:text-sm">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

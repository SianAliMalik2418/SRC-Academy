"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";

import qs from "query-string";

type CategoryItemPropsType = {
  value: string;
  label: string;
  icon?: IconType;
};

const CategoryItem = ({ value, label, icon: Icon }: CategoryItemPropsType) => {
  const router = useRouter();
  const pathName = usePathname();

  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const title = searchParams.get("title");

  const isSelectedCategory = category === value;

  const onCategoryClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          title: title,
          category: isSelectedCategory ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };
  return (
    <button
      onClick={onCategoryClick}
      className={cn(
        "flex items-center gap-x-1 rounded-full border-2 border-slate-700 px-3 py-2 text-sm transition hover:border-sky-700",
        isSelectedCategory && "border-sky-500 bg-sky-700",
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoryItem;

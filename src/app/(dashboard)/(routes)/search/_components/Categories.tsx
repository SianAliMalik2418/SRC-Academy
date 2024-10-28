"use client";

import { COURSE_CATEGORIES } from "@/lib/utils";
import CategoryItem from "./Category-Item";

export type CategoriesPropsType = {};

const Categories = () => {
  return (
    <div className="scrollbar-thumb scrollbar-track flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-thin">
      {COURSE_CATEGORIES.map((category) => (
        <CategoryItem
          key={category.value}
          value={category.value}
          label={category.label}
          icon={category.icon && category.icon}
        />
      ))}
    </div>
  );
};

export default Categories;

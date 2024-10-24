import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COURSE_CATEGORIES = [
  {
    value: "Computer Science",
    label: "Computer Science",
  },

  {
    value: "Physics",
    label: "Physics",
  },
  {
    value: "Mathematics",
    label: "Mathematics",
  },
  {
    value: "Language",
    label: "Language",
  },
  {
    value: "Online Business",
    label: "Online Business",
  },
  {
    value: "Photography",
    label: "Photography",
  },
  {
    value: "Filming",
    label: "Filming",
  },
  {
    value: "Other Education field..",
    label: "Other Education field..",
  },
];

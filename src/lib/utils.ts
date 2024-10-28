import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  FcMultipleDevices,
  FcBriefcase,
  FcOldTimeCamera,
  FcGraduationCap,
  FcFilmReel,
  FcCalculator,
} from "react-icons/fc";

import { FaLanguage } from "react-icons/fa6";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COURSE_CATEGORIES = [
  {
    value: "Computer Science",
    label: "Computer Science",
    icon: FcMultipleDevices,
  },

  {
    value: "Mathematics",
    label: "Mathematics",
    icon: FcCalculator,
  },
  {
    value: "Filming",
    label: "Filming",
    icon: FcFilmReel,
  },
  {
    value: "Language",
    label: "Language",
    icon: FaLanguage,
  },
  {
    value: "Online Business",
    label: "Online Business",
    icon: FcBriefcase,
  },
  {
    value: "Photography",
    label: "Photography",
    icon: FcOldTimeCamera,
  },

  {
    value: "Other Education field..",
    label: "Other Education field..",
    icon: FcGraduationCap,
  },
];

import { z } from "zod";

export const courseTitleSchema = z.object({
  title: z.string().min(1, "Title is required!"),
});

export const courseDescriptionSchema = z.object({
  description: z.string().min(1, "Description is required!"),
});

export const courseImageSchema = z.object({
  imageUrl: z.string().min(1, "Image is required!"),
});

export const courseCategorySchema = z.object({
  category: z.string().min(1, "Category is required!"),
});

export const coursePriceSchema = z.object({
  price: z.coerce.number(),
});

export const courseAttachmentSchema = z.object({
  attachmentUrl: z.string().min(1, "Attachment is required!"),
});

export const courseChapterSchema = z.object({
  chapterTitle: z.string().min(1, "Chapter Title is required!"),
});

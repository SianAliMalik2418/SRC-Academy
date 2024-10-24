import { z } from "zod";

export const TitleSchema = z.object({
  title: z.string().min(1, "Title is required!"),
});

export const DescriptionSchema = z.object({
  description: z.string().min(1, "Description is required!"),
});

export const ImageSchema = z.object({
  imageUrl: z.string().min(1, "Image is required!"),
});

export const CategorySchema = z.object({
  category: z.string().min(1, "Category is required!"),
});

export const PriceSchema = z.object({
  price: z.coerce.number(),
});

export const AttachmentSchema = z.object({
  attachmentUrl: z.string().min(1, "Attachment is required!"),
});

export const ChapterSchema = z.object({
  chapterTitle: z.string().min(1, "Chapter Title is required!"),
});

export const ChapterTitleSchema = z.object({
  chapterTitle: z.string().min(1, "Title is required!"),
});

export const ChapterAcessSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterVideoSchema = z.object({
  videoUrl: z.string().min(1, "Image is required!"),
});

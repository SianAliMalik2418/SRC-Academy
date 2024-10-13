import mongoose from "mongoose";
import { PurchaseSchema } from "./PurchaseModel";

const AttachmentSchema = new mongoose.Schema(
  {
    attachmentName: {
      type: String,
      required: [true, "Attachment Name is required!"],
    },

    attachmentUrl: {
      type: String,
      required: [true, "Attachment URL is required!"],
    },
  },
  { timestamps: true },
);

const MuxDataSchema = new mongoose.Schema(
  {
    assetId: String,
    playbackId: String,
  },
  { timestamps: true },
);

const UserProgressSchema = new mongoose.Schema(
  {
    userId: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ChapterSchema = new mongoose.Schema(
  {
    chapterTitle: {
      type: String,
      required: [true, "Course title is required!"],
    },

    description: {
      type: String,
    },

    position: {
      type: Number,
    },

    videoUrl: {
      type: String,
    },

    muxData: MuxDataSchema,

    userProgress: [UserProgressSchema],

    isFree: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required!"],
    },

    userId: {
      type: String,
      required: [true, "User Id is required"],
    },

    description: {
      type: String,
    },

    category: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    price: {
      type: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    attachments: [AttachmentSchema],
    chapters: [ChapterSchema],
    purchases: [PurchaseSchema],
  },
  { timestamps: true },
);

export const CourseModel =
  mongoose.models.course || mongoose.model("course", courseSchema);

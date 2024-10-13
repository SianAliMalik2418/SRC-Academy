import mongoose from "mongoose";

export const PurchaseSchema = new mongoose.Schema(
  {
    userId: String,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  },
  { timestamps: true },
);

export const PurchaseModel =
  mongoose.models.purchase || mongoose.model("purchase", PurchaseSchema);

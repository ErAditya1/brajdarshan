import mongoose, { Schema, Document } from "mongoose";

export interface UploadedImageDocument extends Document {
  imageUrl: string;
  imageFileId: string;

  uploadedBy?: mongoose.Types.ObjectId; // admin / user
  usedIn?: "blog" | "gallery" | "place" | "other";

  status: "temp" | "published"| "unused";

  createdAt: Date;
  publishedAt?: Date;
}

const UploadedImageSchema = new Schema<UploadedImageDocument>(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    imageFileId: {
      type: String,
      required: true,
      index: true,
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    

    status: {
      type: String,
      enum: ["temp", "published", "unused"],
      default: "temp",
      index: true,
    },

    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.UploadedImage ||
  mongoose.model<UploadedImageDocument>(
    "UploadedImage",
    UploadedImageSchema
  );

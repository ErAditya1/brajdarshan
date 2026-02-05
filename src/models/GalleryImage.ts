import mongoose, { Schema, Document } from "mongoose";
import UploadedImage from "./UploadedImage";

/* ---------------- TYPES ---------------- */

export type GalleryCategory =
  | "Temple"
  | "Festival"
  | "Ghat"
  | "Nature"
  | "Other";

export interface GalleryImageDocument extends Document {
  title: string;
  slug: string;

  author?: mongoose.Types.ObjectId;

  imageUrl: string;
  imageFileId?: string;

  caption?: string;
  location?: string;

  category: GalleryCategory;

  featured: boolean;
  status: "draft" | "published";

  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------- SCHEMA ---------------- */

const GalleryImageSchema = new Schema<GalleryImageDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imageFileId: {
      type: String, // ImageKit fileId (for delete / cleanup)
    },

    caption: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      enum: ["Temple", "Festival", "Ghat", "Nature", "Other"],
      default: "Other",
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------- PRE-SAVE HOOK ---------------- */

GalleryImageSchema.pre(
  "save",
  async function (this: GalleryImageDocument) {
    if (this.status === "published") {
      if (!this.publishedAt) {
        this.publishedAt = new Date();
      }

    }
  }
);


/* ---------------- EXPORT MODEL ---------------- */

const GalleryImage =
  mongoose.models.GalleryImage ||
  mongoose.model<GalleryImageDocument>(
    "GalleryImage",
    GalleryImageSchema
  );

export default GalleryImage;

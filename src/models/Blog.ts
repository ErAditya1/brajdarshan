import mongoose, { Schema, Document } from "mongoose";

/* ---------------- BLOCK SCHEMA ---------------- */

const BlogBlockSchema = new Schema(
    {
        id: { type: String, required: true },

        type: {
            type: String,
            enum: ["heading", "paragraph", "image", "callout", "quote"],
            required: true,
        },

        value: String,

        level: {
            type: String,
            enum: ["h1", "h2", "h3", "h4"],
        },

        color: String,

        /* IMAGE BLOCK */
        image: {
            url: String,
            imageFileId: String,

        },
        caption: String,
        alt: String,
        aspectRatio: String,
        width: Number,
        height: Number,

        bgColor: String,
        textColor: String,
    },
    { _id: false }
);

/* ---------------- BLOG DOCUMENT TYPE ---------------- */

export interface BlogDocument extends Document {
    title: string;
    slug: string;
    excerpt?: string;
    author?: string;
    coverImage?: {

        imageFileId: string
        url: String
    };

    blocks: any;

    tags: string[];
    category?: string;
    location?: string;

    language: "English" | "Hindi" | "Bengluru";
    readingTime?: string;

    seo?: {
        title?: string;
        description?: string;
    };

    featured: boolean;
    status: "draft" | "published";

    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/* ---------------- BLOG SCHEMA ---------------- */

const BlogSchema = new Schema<BlogDocument>(
    {
        title: { type: String, required: true, trim: true },

        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        excerpt: String,
        
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        coverImage: {
            url: String,
            imageFileId: {
                type: String, // ImageKit fileId (for delete / cleanup)
            },
        },


        blocks: {
            type: [BlogBlockSchema],
            default: [],
        },

        tags: [{ type: String }],
        category: String,
        location: String,

        language: {
            type: String,
            enum: ["English", "Hindi", "Bengluru"],
            default: "English",
        },

        readingTime: String,

        seo: {
            title: String,
            description: String,
        },

        featured: { type: Boolean, default: false },

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
            index: true,
        },

        publishedAt: Date,
    },
    { timestamps: true }
);

/* ---------------- PRE-SAVE HOOK (FIXED) ---------------- */

BlogSchema.pre("save", function (this: BlogDocument) {
    if (this.status === "published" && !this.publishedAt) {
        this.publishedAt = new Date();
    }
});


/* ---------------- EXPORT MODEL ---------------- */

const Blog =
    mongoose.models.Blog ||
    mongoose.model<BlogDocument>("Blog", BlogSchema);

export default Blog;

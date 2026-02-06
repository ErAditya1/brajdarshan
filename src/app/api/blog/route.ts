import { NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { connectToDatabase } from "@/lib/db";
import UploadedImage from "@/models/UploadedImage";
import { getCurrentUser } from "@/lib/getCurrentUser";



export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      author,
      coverImage,
      blocks,
      tags,
      category,
      location,
      language,
      readingTime,
      seo,
      featured,
      status,
    } = body;


    const user = await getCurrentUser()



    /* ---------- Validation ---------- */
    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and slug are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(blocks)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog blocks" },
        { status: 400 }
      );
    }

    /* ---------- Normalize blocks (IMPORTANT) ---------- */
    const normalizedBlocks = blocks.map((block: any) => {
      if (block.type === "image") {
        if (!block.image?.url) {
          throw new Error("Image block missing image URL");
        }

        return {
          ...block,
          image: {
            url: block.image.url,
            imageFileId: block.image.imageFileId,

          },

        };
      }
      return block;
    });

    /* ---------- Slug uniqueness ---------- */
    const exists = await Blog.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    /* ---------- Create blog ---------- */
    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      author: user?.id,
      coverImage,
      blocks: normalizedBlocks,
      tags,
      category,
      location,
      language,
      readingTime,
      seo,
      featured,
      status: status ?? "draft",

    });


    await UploadedImage.findOneAndUpdate(
      { imageFileId: blog.coverImage.imageFileId },
      { status: "published" },
    );

    blog.blocks.map(async (block: any) => {
      if (block.type === 'image' && block.image.imageFileId) {
        await UploadedImage.findOneAndUpdate(
          { imageFileId: block.image.imageFileId },
          { status: "published" },
        );
      }
    })

    return NextResponse.json(
      { success: true, data: blog },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Create blog error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ status: "published" }).lean()
    return NextResponse.json(
      { success: true, data: blogs },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Fetch blog error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

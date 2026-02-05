import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { getCurrentUser } from "@/lib/getCurrentUser";
import UploadedImage from "@/models/UploadedImage";

/* ================= UPDATE BLOG ================= */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    /* ---------- FIND BLOG ---------- */
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    /* ---------- OWNER CHECK ---------- */
    if (blog.author.toString() !== user.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    /* ---------- SLUG UNIQUE CHECK ---------- */
    if (body.slug && body.slug !== blog.slug) {
      const slugExists = await Blog.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    /* ---------- UPDATE ---------- */
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        blocks: body.blocks,
        tags: body.tags,
        category: body.category,
        location: body.location,
        readingTime: body.readingTime,
        language: body.language,
        seo: body.seo,
        featured: body.featured,
        status: body.status,
      },
      { new: true }
    );

    /* ---------- IMAGE STATUS UPDATE ---------- */
    if (body.coverImage?.imageFileId) {
      await UploadedImage.findOneAndUpdate(
        { imageFileId: body.coverImage.imageFileId },
        { status: "published" }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update blog error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// app/api/gallery/route.ts
import { NextResponse } from "next/server";

import GalleryImage from "@/models/GalleryImage";
import { connectToDatabase } from "@/lib/db";
import UploadedImage from "@/models/UploadedImage";
import { getCurrentUser } from "@/lib/getCurrentUser";

/* ===============================
   CREATE GALLERY IMAGE
================================ */
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      title,
      slug,
      imageUrl,
      imageFileId,
      caption,
      location,
      category,
      featured = false,
      status = "draft",
    } = body;

    /* -------- Validation -------- */
    if (!title || !slug || !imageUrl) {
      return NextResponse.json(
        { message: "Title, slug and imageUrl are required" },
        { status: 400 }
      );
    }

    /* -------- Slug uniqueness -------- */
    const existing = await GalleryImage.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "Slug already exists" },
        { status: 409 }
      );
    }

    /* -------- Create document -------- */
    const image = await GalleryImage.create({
      author: user?.id,
      title,
      slug,
      imageUrl,
      imageFileId,
      caption,
      location,
      category,
      featured,
      status,
      publishedAt: status === "published" ? new Date() : undefined,
    });

    await UploadedImage.findOneAndUpdate(
      { imageFileId: image.imageFileId },
      { status: "published" },
    );


    return NextResponse.json(
      {
        message: "Gallery image saved successfully",
        data: image,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Gallery POST Error:", error);

    return NextResponse.json(
      {
        message: "Failed to save gallery image",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/* ===============================
   GET GALLERY IMAGES
================================ */
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      GalleryImage.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      GalleryImage.countDocuments({ isActive: true }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Load gallery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load gallery",
      },
      { status: 500 }
    );
  }
}
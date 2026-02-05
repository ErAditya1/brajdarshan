import { NextResponse } from "next/server";

import Place from "@/models/Place";
import { connectToDatabase } from "@/lib/db";
import UploadedImage from "@/models/UploadedImage";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      name,
      slug,
      type,
      location,
      geo,
      image,
      description,
      history,
      timings,
      importantTips,
      howToReach,
      status,
      imageFileId
    } = body;

    const user = await getCurrentUser()

    if(!user ) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    
    // return
    /* ---------------- Validation ---------------- */
    if (!name || !slug || !type || !location || !geo || !image || !imageFileId|| !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof geo.lat !== "number" || typeof geo.lng !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid geo coordinates" },
        { status: 400 }
      );
    }

    /* ---------------- Slug uniqueness ---------------- */
    const exists = await Place.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 409 }
      );
    }

    /* ---------------- Create ---------------- */
    const place = await Place.create({
      author: user.id,
      name,
      slug,
      type,
      location,
      geo,
      image:{
        url:image,
        imageFileId:imageFileId
      },
      description,
      history,
      timings,
      importantTips,
      howToReach,
      status, // draft | published
    });

    await UploadedImage.findOneAndUpdate(
            { imageFileId: place.image.imageFileId },
            {  status: "published" },
    );
          

    return NextResponse.json(
      { success: true, data: place },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create place error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create place" },
      { status: 500 }
    );
  }
}

/* ---------------- LIST PLACES ---------------- */

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy") || "Popularity";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);

    const query: any = { status: "published" };

    if (category && category !== "All") {
      query.type = category;
    }

    let sort: any = { reviews: -1 }; // Popularity

    if (sortBy === "Rating") sort = { rating: -1 };
    if (sortBy === "Newest") sort = { createdAt: -1 };

    const places = await Place.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Place.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: places,
      pagination: {
        page,
        total,
        hasMore: page * limit < total,
      },
    });
  } catch (err) {
    console.error("Fetch places error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load places" },
      { status: 500 }
    );
  }
}

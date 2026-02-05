import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Place from "@/models/Place";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import UploadedImage from "@/models/UploadedImage";
import { getCurrentUser } from "@/lib/getCurrentUser";


function canEditPlace(user: any, place: any) {
  if (!user) return false;
  if (user.role === "admin" || user.role === "editor") return true;
  if (place.author.toString() === user.id)
    return true;
  return false;
}

function canDeletePlace(user: any , place:any) {
  return user?.role === "admin" || place.author.toString() === user.id;
}


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const {slug}= await params
    await connectToDatabase();

    const place = await Place.findOne({
      slug: slug,
      status: "published",
    })
      .populate({
        path: "author",
        select: "name avatar role",
        model: User,
      })
      .lean();

    if (!place) {
      return NextResponse.json(
        { success: false, message: "Place not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: place });
  } catch (err) {
    console.error("Place fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load place" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  

  const { slug } = await params;

  await connectToDatabase();
  const place = await Place.findById(slug);

  if (!place) {
    return NextResponse.json(
      { success: false, message: "Place not found" },
      { status: 404 }
    );
  }

  if (!canDeletePlace(token, place )) {
    return NextResponse.json(
      { success: false, message: "Admin only action" },
      { status: 403 }
    );
  }

  place.status = "archived"; // soft delete
  await place.save();

  return NextResponse.json({
    success: true,
    message: "Place archived successfully",
  });
}


export async function PATCH(
  req: Request,
  { params }:  { params: Promise<{ slug: string }> }
) {
  try {
    const te = await params
    const id = te.slug
    
    await connectToDatabase();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      name,
      slug,
      type,
      location,
      geo,
      image,
      imageFileId,
      description,
      history,
      timings,
      importantTips,
      howToReach,
      status,
    } = body;

    const place = await Place.findById(id);
    if (!place) {
      return NextResponse.json(
        { success: false, message: "Place not found" },
        { status: 404 }
      );
    }

    /* ---------------- Permission ---------------- */
    const isOwner = place.author.toString() === user.id;
    const isAdmin = user.role === "admin" || user.role === "editor";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    /* ---------------- Slug uniqueness ---------------- */
    if (slug && slug !== place.slug) {
      const exists = await Place.findOne({ slug });
      if (exists) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 409 }
        );
      }
      place.slug = slug;
    }

    /* ---------------- Update fields ---------------- */
    if (name !== undefined) place.name = name;
    if (type !== undefined) place.type = type;
    if (location !== undefined) place.location = location;
    if (geo?.lat !== undefined && geo?.lng !== undefined) {
      place.geo = {
        lat: Number(geo.lat),
        lng: Number(geo.lng),
      };
    }

    if (description !== undefined) place.description = description;
    if (history !== undefined) place.history = history;
    if (timings !== undefined) place.timings = timings;
    if (importantTips !== undefined) place.importantTips = importantTips;
    if (howToReach !== undefined) place.howToReach = howToReach;
    if (status !== undefined) place.status = status;

    /* ---------------- Image update ---------------- */
    if (image && imageFileId) {
      // mark old image as unused (optional but recommended)
      if (place.image?.imageFileId && place.image.imageFileId !== imageFileId) {
        await UploadedImage.findOneAndUpdate(
          { imageFileId: place.image.imageFileId },
          { status: "unused" }
        );
      }

      place.image = {
        url: image,
        imageFileId,
      };

      await UploadedImage.findOneAndUpdate(
        { imageFileId },
        { status: "published" }
      );
    }

    await place.save();

    return NextResponse.json({
      success: true,
      message: "Place updated successfully",
      data: place,
    });
  } catch (error) {
    console.error("Update place error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update place" },
      { status: 500 }
    );
  }
}


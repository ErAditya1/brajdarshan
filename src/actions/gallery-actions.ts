"use server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectToDatabase } from "@/lib/db";
import GalleryImage from "@/models/GalleryImage";
import UploadedImage from "@/models/UploadedImage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteGalleryImageAction(imageId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();

  const image = await GalleryImage.findById(imageId);
  if (!image) {
    throw new Error("Gallery image not found");
  }

  const isOwner = image.author?.toString() === currentUser.id;
  const isAdmin = currentUser.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new Error("Unauthorized");
  }

  if (image.imageFileId) {
    await UploadedImage.findOneAndUpdate(
      { imageFileId: image.imageFileId },
      { status: "unused" }
    );
  }

  await image.deleteOne();

  revalidatePath("/gallery");
  redirect("/gallery");
}

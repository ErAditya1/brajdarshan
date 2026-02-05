"use server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectToDatabase } from "@/lib/db";
import Place from "@/models/Place";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePlaceAction(placeId: string) {
  const currentUser = await getCurrentUser();

 

  await connectToDatabase();

  const place = await Place.findById(placeId);
  if (!place) {
    throw new Error("Place not found");
  }

   if (!currentUser  || currentUser.id.toString()!== place.author.toString()) {
    throw new Error("Unauthorized");
  }

  // ✅ Soft delete
  place.status = "archived";
  await place.save();

  // Revalidate listing pages
  revalidatePath("/places");
  redirect("/places");
}

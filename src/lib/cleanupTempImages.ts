import { connectToDatabase } from "@/lib/db";
import UploadedImage from "@/models/UploadedImage";
import { imagekit } from "./imagekit";



export async function cleanupTempImages() {
  await connectToDatabase();

  // ⏱ older than 1 hour
  const expiry = new Date(Date.now() - 60 * 60 * 1000);

  const expiredImages = await UploadedImage.find({
    createdAt: { $lt: expiry },
    status: "temp",
  });

  for (const img of expiredImages) {
    try {
      await imagekit.deleteFile(img.imageFileId);
      await img.deleteOne();
    } catch (err) {
      console.error("Failed to delete image:", img.imageFileId);
    }
  }

  console.log(`🧹 Cleaned ${expiredImages.length} temp images`);
}

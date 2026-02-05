"use server";

import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBlogAction(blogId: string) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }

  // ✅ Soft delete recommended
  blog.status = "archived";
  await blog.save();

  revalidatePath("/blog");
  redirect("/blog");
}

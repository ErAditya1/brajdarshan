import Blog from "@/models/Blog";
import { connectToDatabase } from "@/lib/db";

export async function getPublishedBlogs() {
  await connectToDatabase();

  const blogs = await Blog.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .select(
      "title slug excerpt coverImage readingTime tags author publishedAt"
    ).populate("author","name avatar role")
    .lean();

  return blogs.map((blog) => ({
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    image: blog.coverImage?.url || null,
    readingTime: blog.readingTime,
    tags: blog.tags || [],
    author: blog.author || "Braj Darshan",
    date: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "",
  }));
}

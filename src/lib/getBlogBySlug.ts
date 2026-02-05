import Blog from "@/models/Blog";
import { connectToDatabase } from "@/lib/db";

export async function getBlogBySlug(slug: string) {
  await connectToDatabase();

  const blog = await Blog.findOne({
    slug,
    status: "published",
  }).populate("author","name avatar role").lean();

  if (!blog) return null;

  return {
    id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    author: blog.author || "Braj Darshan",
    image: blog.coverImage?.url || "",
    imageAlt: blog.title,
    readingTime: blog.readingTime,
    tags: blog.tags || [],
    blocks: blog.blocks || [],
    seo: blog.seo,
    date: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
  };
}

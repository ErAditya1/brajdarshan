import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog";
import EditBlogFrorm from "./EditBlogForm";


async function getBlogById(id: string) {
  await connectToDatabase();
  return Blog.findById(id).lean();
}

export default async function EditBlogPage({
  params,
}: {
  params: { slug: string };
}) {
    const {slug}= await params
  const blog = await getBlogById(slug);

  if (!blog) notFound();

  return (
    <main>
      <EditBlogFrorm blog={JSON.parse(JSON.stringify(blog))} />
    </main>
  );
}

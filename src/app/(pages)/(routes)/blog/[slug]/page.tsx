import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, User, Clock, Share2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogBlocksRenderer from "@/components/BlogBlocksRenderer";
import { getBlogBySlug } from "@/lib/getBlogBySlug";

import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import { canDeletePerform, canEditPerform } from "@/utils/utils";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import { AvatarButton } from "@/components/ui/avatar-button";

/* ================= SEO ================= */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Not Found | Braj Darshan" };
  }

  return {
    title: blog.seo?.title || `${blog.title} | Braj Darshan`,
    description: blog.seo?.description || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

/* ================= PAGE ================= */

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const currentUser = await getCurrentUser();

  const shareUrl = `https://brajdarshan.com/blog/${blog.slug}`;
  // console.log(blog);
  return (
    <article className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <header
        className="relative   overflow-hidden top-10"
        style={{ height: "60vh" }}
      >
        {/* IMAGE */}
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover z-0"
        />

        {/* OVERLAY (for contrast) */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

        {/* CONTENT */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container mx-auto px-4 pb-12 max-w-4xl text-white">
            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    className="bg-white/90 text-black backdrop-blur"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </span>

              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {blog.author.name}
              </span>

              {blog.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <section className="container mx-auto px-4 py-14 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ===== ARTICLE ===== */}
          <div className="lg:col-span-8">
            {blog.excerpt && (
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* 🔥 Dynamic Blog Content */}
            <BlogBlocksRenderer blocks={blog.blocks} />

            {/* ===== SHARE ===== */}
            <div className="mt-14 flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    blog.title,
                  )}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this article
                </a>
              </Button>
              {currentUser && (
                <div className="flex gap-2  my-4">
                  {/* Edit */}
                  {canEditPerform(currentUser, blog.author) && (
                    <Link href={`/blog/${blog.id}/edit`}>
                      <Button variant="outline" size="sm">
                        ✍️ Edit
                      </Button>
                    </Link>
                  )}

                  {/* Delete */}
                  {canDeletePerform(currentUser, blog?.author) && (
                    <DeleteBlogButton blogId={blog.id} />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              {/* About Author */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-serif font-bold text-lg mb-3">
                  About the Author
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    <AvatarButton name={blog.author.name} image={blog?.author?.avatar.url}/>
                  </div>

                  <div>
                    <p className="font-semibold">{blog.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Spiritual Writer
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {blog.author.name || "Priya Singh"} writes about spirituality,
                  sacred places, and devotional travel experiences across Braj
                  Bhoomi.
                </p>
              </div>

              {/* Related Topics */}
              {blog.tags?.length > 0 && (
                <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-lg mb-4">
                    Related Topics
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

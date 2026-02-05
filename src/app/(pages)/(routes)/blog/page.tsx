import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="container mx-auto px-4 py-12">
      {/* ================= Header ================= */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Spiritual Knowledge Hub
          </h1>
          <p className="text-muted-foreground">
            Stories, history, and travel guides from Braj.
          </p>
        </div>

        <Link href="/blog/new" className="hidden sm:block">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Blog
          </Button>
        </Link>
      </header>

      {/* ================= Blog Grid ================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog:any) => (
          <article key={blog.id} className="group">
            <Card className="overflow-hidden border border-border/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                {blog.readingTime && (
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                    {blog.readingTime}
                  </span>
                )}
              </div>

              {/* Content */}
              <CardContent className="p-6 flex flex-col h-full">
                {/* Meta */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <time>{blog.date}</time>
                  <span>•</span>
                  <span>{blog.author.name}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-1">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs rounded-full bg-primary/10 text-primary px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-auto"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          </article>
        ))}

        {blogs.length === 0 && (
          <p className="text-muted-foreground">
            No blogs published yet.
          </p>
        )}
      </section>
    </main>
  );
}

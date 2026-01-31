"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogs } from "@/lib/data";

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* ================= Header ================= */}
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          Spiritual Knowledge Hub
        </h1>
        <p className="text-muted-foreground">
          Stories, history, and travel guides from Braj.
        </p>
      </header>

      {/* ================= Blog Grid ================= */}
      <section
        aria-label="Blog articles"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogs.map((blog) => (
          <article key={blog.id} className="group">
            <Card
              className="
      h overflow-hidden border border-border/60
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
      focus-within:ring-2 focus-within:ring-primary/40
      h-fit
    "
            >
              {/* ================= Image ================= */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="
          object-cover transition-transform duration-700
          group-hover:scale-110
        "
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Soft overlay for spiritual mood */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                {/* Reading time badge */}
                {blog.readingTime && (
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                    {blog.readingTime}
                  </span>
                )}
              </div>

              {/* ================= Content ================= */}
              <CardContent className="p-6 flex flex-col h-full">
                {/* Meta */}
                <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground mb-3">
                  <time>{blog.date}</time>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>

                {/* Title */}
                <h3
                  className="
          text-xl font-serif font-bold mb-3
          leading-snug 
          group-hover:text-primary transition-colors
          line-clamp-1
        "
                >
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-5 ">
                  {blog.excerpt}
                </p>

                {/* Tags (optional but recommended) */}
                {blog.tags && (
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
                <div className="mt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Read more
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </section>
    </main>
  );
}

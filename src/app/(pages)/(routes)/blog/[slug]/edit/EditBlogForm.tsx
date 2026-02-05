"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { BlogBlock } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast-provider";
import ImageBlockEditor from "@/components/features/ImageBlockEditor";
import { useRouter } from "next/navigation";

/* ---------- COLORS ---------- */
const COLORS = [
  "#2B2B2B",
  "#4A4A4A",
  "#E65100",
  "#6A1B9A",
  "#1B5E20",
  "#0D47A1",
];

/* ---------- COLOR PICKER ---------- */
function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`w-6 h-6 rounded-full border ${
              value === c ? "ring-2 ring-primary" : ""
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- PREVIEW ---------- */
function BlogPreview({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="prose prose-neutral max-w-none">
      {blocks.map((block) => {
        if (block.type === "heading") {
          const Tag = block.level;
          return (
            <Tag key={block.id} style={{ color: block.color }}>
              {block.value}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={block.id} style={{ color: block.color }}>
              {block.value}
            </p>
          );
        }

        if (block.type === "image" && block.image.url) {
          return (
            <figure key={block.id} className="my-6">
              <div
                className="w-full overflow-hidden rounded-lg bg-muted"
                style={{
                  aspectRatio:
                    block.aspectRatio !== "auto"
                      ? block.aspectRatio.replace("/", " / ")
                      : undefined,
                }}
              >
                <img
                  src={block.image.url}
                  alt={block.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="text-sm text-center text-muted-foreground mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === "callout") {
          return (
            <div
              key={block.id}
              className="p-4 rounded-lg my-6"
              style={{
                backgroundColor: block.bgColor,
                color: block.textColor,
              }}
            >
              {block.value}
            </div>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={block.id}
              className="border-l-4 pl-4 italic my-6"
              style={{ color: block.color }}
            >
              {block.value}
            </blockquote>
          );
        }

        return null;
      })}
    </article>
  );
}

/* ---------- EDIT FORM ---------- */
export default function EditBlogForm({ blog }: { blog: any }) {
  const toast = useToast();
  const router = useRouter();

  /* ---------- STATE (ALL FIELDS) ---------- */
  const [title, setTitle] = useState(blog.title);
  const [slug, setSlug] = useState(blog.slug);
  const [excerpt, setExcerpt] = useState(blog.excerpt || "");
  const [blocks, setBlocks] = useState<BlogBlock[]>(blog.blocks || []);
  const [coverImage, setCoverImage] = useState(blog.coverImage || null);

  const [tags, setTags] = useState((blog.tags || []).join(", "));
  const [category, setCategory] = useState(blog.category || "");
  const [location, setLocation] = useState(blog.location || "");
  const [readingTime, setReadingTime] = useState(blog.readingTime || "");
  const [language, setLanguage] = useState(blog.language || "English");

  const [seoTitle, setSeoTitle] = useState(blog.seo?.title || "");
  const [seoDescription, setSeoDescription] =
    useState(blog.seo?.description || "");

  const [featured, setFeatured] = useState(blog.featured || false);

  /* ---------- BLOCK HELPERS ---------- */
  const addBlock = (block: BlogBlock) =>
    setBlocks((prev) => [...prev, block]);

  const updateBlock = (id: string, key: string, value: any) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)),
    );
  };

  const removeBlock = (id: string) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  /* ---------- UPDATE ---------- */
  const handleUpdate = async (status: "draft" | "published") => {
    try {
      const res = await fetch(`/api/blog/${blog._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          coverImage,
          blocks,
          tags: tags.split(",").map((t: string) => t.trim()),
          category,
          location,
          readingTime,
          language,
          seo: {
            title: seoTitle,
            description: seoDescription,
          },
          featured,
          status,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast({
        title: "Blog updated",
        description: "Changes saved successfully",
      });

      router.push(`/blog/${slug}`);
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: err.message,
      });
    }
  };

  /* ---------- UI ---------- */
  return (
    <main className="container max-w-7xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-serif font-bold">Edit Blog</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-10">
          {/* BLOG META */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />

              <FileUpload
                onSuccess={(url, meta) =>
                  setCoverImage({ url, imageFileId: meta?.fileId })
                }
              />

              {coverImage?.url && (
                <img
                  src={coverImage.url}
                  className="w-full h-48 object-cover rounded"
                />
              )}

              <Textarea
                placeholder="Excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />

              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Reading time"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                />

                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Bengluru">Bengluru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="SEO Title"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
              <Textarea
                placeholder="SEO Description"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured Blog
              </label>
            </CardContent>
          </Card>

          {/* TOOLBOX */}
          <div className="flex flex-wrap gap-2 bg-muted/40 p-3 rounded-lg">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                addBlock({
                  id: crypto.randomUUID(),
                  type: "heading",
                  value: "",
                  level: "h2",
                  color: "#2B2B2B",
                })
              }
            >
              + Heading
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                addBlock({
                  id: crypto.randomUUID(),
                  type: "paragraph",
                  value: "",
                  color: "#4A4A4A",
                })
              }
            >
              + Paragraph
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                addBlock({
                  id: crypto.randomUUID(),
                  type: "image",
                  image: { url: "", imageFileId: "" },
                  caption: "",
                  alt: "",
                  aspectRatio: "16/9",
                })
              }
            >
              + Image
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                addBlock({
                  id: crypto.randomUUID(),
                  type: "callout",
                  value: "",
                  bgColor: "#FFF3E0",
                  textColor: "#E65100",
                })
              }
            >
              + Callout
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                addBlock({
                  id: crypto.randomUUID(),
                  type: "quote",
                  value: "",
                  color: "#6A1B9A",
                })
              }
            >
              + Quote
            </Button>
          </div>

          {/* BLOCKS */}
          {blocks.map((block) => (
            <Card key={block.id} className="relative">
              <CardContent className="pt-6 space-y-4">
                <button
                  onClick={() => removeBlock(block.id)}
                  className="absolute top-3 right-3"
                >
                  <Trash2 size={16} />
                </button>

                {block.type === "heading" && (
                  <>
                    <Input
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(block.id, "value", e.target.value)
                      }
                      style={{ color: block.color }}
                    />
                    <ColorPicker
                      label="Text Color"
                      value={block.color!}
                      onChange={(v) =>
                        updateBlock(block.id, "color", v)
                      }
                    />
                  </>
                )}

                {block.type === "paragraph" && (
                  <>
                    <Textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(block.id, "value", e.target.value)
                      }
                      style={{ color: block.color }}
                    />
                    <ColorPicker
                      label="Text Color"
                      value={block.color!}
                      onChange={(v) =>
                        updateBlock(block.id, "color", v)
                      }
                    />
                  </>
                )}

                {block.type === "image" && (
                  <ImageBlockEditor
                    block={block}
                    onChange={(key, value) =>
                      updateBlock(block.id, key, value)
                    }
                    onRemove={() => removeBlock(block.id)}
                  />
                )}

                {block.type === "callout" && (
                  <>
                    <Textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(block.id, "value", e.target.value)
                      }
                      style={{
                        backgroundColor: block.bgColor,
                        color: block.textColor,
                      }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <ColorPicker
                        label="Background"
                        value={block.bgColor}
                        onChange={(v) =>
                          updateBlock(block.id, "bgColor", v)
                        }
                      />
                      <ColorPicker
                        label="Text"
                        value={block.textColor}
                        onChange={(v) =>
                          updateBlock(block.id, "textColor", v)
                        }
                      />
                    </div>
                  </>
                )}

                {block.type === "quote" && (
                  <>
                    <Textarea
                      value={block.value}
                      onChange={(e) =>
                        updateBlock(block.id, "value", e.target.value)
                      }
                      style={{ color: block.color }}
                    />
                    <ColorPicker
                      label="Text Color"
                      value={block.color!}
                      onChange={(v) =>
                        updateBlock(block.id, "color", v)
                      }
                    />
                  </>
                )}
              </CardContent>
            </Card>
          ))}

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => handleUpdate("draft")}>
              Save Draft
            </Button>
            <Button onClick={() => handleUpdate("published")}>
              Update Blog
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="sticky top-20">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogPreview blocks={blocks} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

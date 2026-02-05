"use client";

import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
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

/* ---------- COLOR PRESETS ---------- */
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
      <div className="flex gap-2 flex-wrap items-center">
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
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 border rounded"
        />
      </div>
    </div>
  );
}

function BlogPreview({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="prose prose-neutral max-w-none">
      {blocks.map((block) => {
        if (block.type === "heading") {
          const Tag = block.level;
          return (
            <Tag key={block.id} style={{ color: block.color }}>
              {block.value || "Heading preview"}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={block.id} style={{ color: block.color }}>
              {block.value || "Paragraph preview..."}
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
              className="rounded-lg p-4 my-6"
              style={{
                backgroundColor: block.bgColor,
                color: block.textColor,
              }}
            >
              {block.value || "Callout preview"}
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
              {block.value || "Quote preview"}
            </blockquote>
          );
        }

        return null;
      })}
    </article>
  );
}

export default function NewBlogPage() {
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState<{
    url: string;
    imageFileId?: string;
  } | null>(null);

  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [language, setLanguage] = useState("English");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const addBlock = (block: BlogBlock) => setBlocks((prev) => [...prev, block]);

  const updateBlock = (id: string, key: string, value: any) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)),
    );
  };

  const removeBlock = (id: string) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  const handleSubmit = async (submitStatus: "draft" | "published") => {
    if (!title || !slug) {
      toast({
        title: "Missing required fields",
        description: "Title and slug are required",
      });
      return;
    }

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          author,
          coverImage,
          blocks,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          category,
          location,
          language,
          readingTime,
          seo: {
            title: seoTitle,
            description: seoDescription,
          },
          featured,
          status: submitStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save blog");
      }

      toast({
        title: submitStatus === "published" ? "Blog published" : "Draft saved",
        description:
          submitStatus === "published"
            ? "Your blog is now live"
            : "You can publish it anytime later",
      });

      /* Optional reset */
      setTitle("");
      setSlug("");
      setCoverImage(null);
      setExcerpt("");
      setBlocks([]);
      setTags("");
      setCategory("");
      setLocation("");
      setReadingTime("");
      setSeoTitle("");
      setSeoDescription("");
      setFeatured(false);
      setStatus("draft");
    } catch (err: any) {
      toast({
        title: "Failed to save blog",
        description: err.message,
      });
      console.log(err);
    }
  };

  return (
    <main className="container max-w-7xl mx-auto py-10 space-y-10">
      <h1 className="text-3xl font-serif font-bold">
        Create Blog – Braj Darshan
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= LEFT: EDITOR ================= */}
        <div className="space-y-10">
          {/* 🔴 Keep ALL your existing editor code here */}
          {/* Blog meta + toolbox + blocks */}
          {/* BLOG META */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <Input
                placeholder="Blog title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSlug(
                    e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  );
                }}
              />

              {/* Slug */}
              <Input
                placeholder="Slug (auto-generated)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              {/* Cover Image */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Cover Image</p>
               <FileUpload
                      onSuccess={(url, meta) =>
                        setCoverImage({
                          url,
                          imageFileId: meta?.fileId,
                        })
                      }
                  />
                {coverImage?.url && (
                  <img
                    src={coverImage?.url}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                )}
              </div>

              {/* Excerpt */}
              <Textarea
                placeholder="Short excerpt (shown in blog cards & SEO)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />

              {/* Tags */}
              <Input
                placeholder="Tags (comma separated e.g. Temple, Vrindavan, Darshan)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              {/* Category & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Category (Temple Guide, Festival, History)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <Input
                  placeholder="Location (Vrindavan, Mathura)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Reading Time & Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Reading time (e.g. 5 min read)"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                />

                {/* Status Select */}
                <div className="space-y-1">
                  <Select
                    value={language}
                    onValueChange={(value) =>
                      setLanguage(value as "English" | "Hindi" | "Bengluru")
                    }
                  >
                    <SelectTrigger className="w-45">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="English">📝 English</SelectItem>

                      <SelectItem value="Hindi">🚀 Hindi</SelectItem>
                      <SelectItem value="Bengluru">🚀 Bengluru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-2">
                <Input
                  placeholder="SEO Title (optional)"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
                <Textarea
                  placeholder="SEO Description (optional)"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  Featured Blog
                </label>
              </div>
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
                  image: {
                    url: "",
                    imageFileId: "",
                    
                  },
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
              + Info Box
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
          <div className="space-y-6">
            {blocks.map((block) => (
              <Card
                key={block.id}
                className="relative border-l-4 hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6 space-y-4">
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* HEADING */}
                  {block.type === "heading" && (
                    <>
                      <Input
                        placeholder="Heading"
                        value={block.value}
                        onChange={(e) =>
                          updateBlock(block.id, "value", e.target.value)
                        }
                        className="text-xl font-bold"
                        style={{ color: block.color }}
                      />
                      <ColorPicker
                        label="Text Color"
                        value={block.color!}
                        onChange={(v) => updateBlock(block.id, "color", v)}
                      />
                    </>
                  )}

                  {/* PARAGRAPH */}
                  {block.type === "paragraph" && (
                    <>
                      <Textarea
                        placeholder="Write content..."
                        value={block.value}
                        onChange={(e) =>
                          updateBlock(block.id, "value", e.target.value)
                        }
                        style={{ color: block.color }}
                      />
                      <ColorPicker
                        label="Text Color"
                        value={block.color!}
                        onChange={(v) => updateBlock(block.id, "color", v)}
                      />
                    </>
                  )}

                  {/* IMAGE */}
                  {block.type === "image" && (
                    <ImageBlockEditor
                      block={block}
                      onChange={(key, value) =>
                        updateBlock(block.id, key, value)
                      }
                      onRemove={() => removeBlock(block.id)}
                    />
                  )}

                  {/* CALLOUT */}
                  {block.type === "callout" && (
                    <>
                      <Textarea
                        placeholder="Important darshan info"
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
                          onChange={(v) => updateBlock(block.id, "bgColor", v)}
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

                  {/* QUOTE */}
                  {block.type === "quote" && (
                    <>
                      <Textarea
                        placeholder="Shloka / Quote"
                        value={block.value}
                        onChange={(e) =>
                          updateBlock(block.id, "value", e.target.value)
                        }
                        className="italic"
                        style={{ color: block.color }}
                      />
                      <ColorPicker
                        label="Text Color"
                        value={block.color!}
                        onChange={(v) => updateBlock(block.id, "color", v)}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSubmit("draft")}
            >
              Save Draft
            </Button>

            <Button type="button" onClick={() => handleSubmit("published")}>
              Publish Blog
            </Button>
          </div>
        </div>

        {/* ================= RIGHT: PREVIEW ================= */}
        <div className="sticky top-20 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {blocks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Start adding content blocks to see preview.
                </p>
              ) : (
                <BlogPreview blocks={blocks} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

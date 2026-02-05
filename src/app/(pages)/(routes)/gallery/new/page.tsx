"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast-provider";

type Category = "Temple" | "Festival" | "Ghat" | "Nature" | "Other";
type Status = "draft" | "published";

export default function AddGalleryImagePage() {

  const toast = useToast()

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileId, setImageFileId] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<Category>("Temple");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<Status>("draft");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- SUBMIT ---------------- */
 const handleSubmit = async (submitStatus: Status) => {
  setError(null);

  if (!title || !slug || !imageUrl) {
    toast({
      title: "Missing required fields",
      description: "Title, slug and image are required",
    });
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        imageUrl,
        imageFileId,
        caption,
        location,
        category,
        featured,
        status: submitStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to save image");
    }

    toast({
      title:
        submitStatus === "published"
          ? "Image published"
          : "Draft saved",
      description:
        submitStatus === "published"
          ? "This image is now visible in the gallery"
          : "You can publish it anytime later",
    });

    // Optional: reset form
    setTitle("");
    setSlug("");
    setImageUrl("");
    setImageFileId("");
    setCaption("");
    setLocation("");
    setFeatured(false);
    setStatus("draft");
  } catch (err: any) {
    setError(err.message);

    toast({
      title: "Failed to save image",
      description: err.message,
    });
  } finally {
    setLoading(false);
  }
};


  /* ---------------- UI ---------------- */
  return (
    <main className="container max-w-4xl mx-auto py-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-serif font-bold">
          Add Gallery Image
        </h1>
        <p className="text-muted-foreground">
          Upload sacred moments from Braj Bhoomi
        </p>
      </div>

      {/* IMAGE UPLOAD */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Image Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FileUpload
            accept="image/*"
            onSuccess={(url, meta) => {
              setImageUrl(url);
              setImageFileId(meta?.fileId || "");
            }}
          />

          {imageUrl && (
            <div className="relative rounded-lg overflow-hidden border">
              <Image
                src={imageUrl}
                alt="Preview"
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* IMAGE DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Image Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Image title (e.g. Banke Bihari Aarti)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(
                e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
              );
            }}
          />

          <Input
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <Textarea
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <Input
            placeholder="Location (Vrindavan, Mathura...)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Temple">Temple</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Ghat">Ghat</SelectItem>
                <SelectItem value="Nature">Nature</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Image (show on homepage)
          </label>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          disabled={loading}
          onClick={() => handleSubmit("draft")}
        >
          {loading ? "Saving..." : "Save Draft"}
        </Button>

        <Button
          disabled={loading}
          onClick={() => handleSubmit("published")}
        >
          {loading ? "Publishing..." : "Publish Image"}
        </Button>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import GalleryImage from "@/models/GalleryImage";
import { connectToDatabase } from "@/lib/db";

export default async function GalleryPage() {
  // ✅ Server-side DB call
  await connectToDatabase();

  const images = await GalleryImage.find({
    status: "published",
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12 w-full">
        {/* ================= Header ================= */}
        <div className="flex justify-between w-full">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Photo Gallery
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Glimpses of the divine land — temples, ghats, festivals, and
              sacred moments from Braj Bhoomi.
            </p>
          </div>

          <div>
            <Link href="/gallery/new">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </Link>
          </div>
        </div>

        {/* ================= Grid ================= */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
            auto-rows-[180px]
          "
        >
          {images.map((img, index) => (
            <div
              key={img._id.toString()}
              className={`
                relative group overflow-hidden rounded-xl bg-muted
                ${index % 5 === 0 ? "row-span-2" : ""}
                ${index % 7 === 0 ? "row-span-3" : ""}
              `}
            >
              <Image
                src={img.imageUrl}
                alt={img.title+" "+img.caption+" "+img.location}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 3}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm md:text-base font-medium text-center px-4">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {images.length === 0 && (
          <p className="text-center text-muted-foreground mt-20">
            No images published yet.
          </p>
        )}
      </section>
    </main>
  );
}

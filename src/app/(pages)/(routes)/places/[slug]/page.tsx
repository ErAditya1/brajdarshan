import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Star, Trash } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BookingWidget from "@/components/features/BookingWidget";
import PlaceMap from "@/components/maps/Map";
import { connectToDatabase } from "@/lib/db";
import Place from "@/models/Place";
import User from "@/models/User";
import type { Metadata } from "next";
import { AvatarButton } from "@/components/ui/avatar-button";
import { canDeletePerform, canEditPerform } from "@/utils/utils";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import DeletePlaceButton from "@/components/DeletePlaceButton";

async function getPlaceBySlug(slug: string) {
  await connectToDatabase();

  return Place.findOne({ slug, status: "published" })
    .populate({
      path: "author",
      select: "name avatar role",
      model: User,
    })
    .lean();
}


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    return {
      title: "Place Not Found | Braj Darshan",
      description:
        "Explore sacred temples and pilgrimage places across Braj Bhoomi.",
    };
  }

  const title = `${place.name}, ${place.location} | Braj Darshan`;
  const description = `${place.name} in ${place.location}. Darshan timings, history, travel tips, and reviews.`;

  return {
    title,
    description,
    keywords: [
      "Braj Darshan",
      place.name,
      place.location,
      place.type,
      "Vrindavan temples",
      "Krishna pilgrimage",
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: place.image.url,
          width: 1200,
          height: 630,
          alt: place.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [place.image.url],
    },
  };
}

export default async function PlaceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);
  if (!place) notFound();
 
  const currentUser = await getCurrentUser();



  return (
    <div className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <header className="relative " style={{ height: "60vh" }}>
        <Image
          src={place.image.url}
          alt={place.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

        <div className="absolute bottom-0 w-full">
          <div className="container mx-auto px-4 pb-8">
            <Badge className="mb-3">{place.type}</Badge>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">
              {place.name}
            </h1>

            <div className="flex flex-wrap gap-4 text-white/90 text-sm">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {place.location}
              </span>

              <span className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                {place.rating} ({place.reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===== MAIN ===== */}
          <section className="lg:col-span-2 space-y-10">
            <Tabs.Root defaultValue="overview">
              <Tabs.List className="flex border-b overflow-x-auto">
                {["overview", "timings", "history", "reach"].map((t) => (
                  <Tabs.Trigger
                    key={t}
                    value={t}
                    className="px-5 py-3 font-medium border-b-2 data-[state=active]:border-primary"
                  >
                    {t.toUpperCase()}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {/* Overview */}
              <Tabs.Content value="overview" className="mt-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {place.description}
                </p>

                {place.importantTips?.length > 0 && (
                  <div className="rounded-xl border bg-accent/10 p-5">
                    <h3 className="font-semibold mb-2">Important Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {place.importantTips.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Tabs.Content>

              {/* Timings */}
              <Tabs.Content value="timings" className="mt-6 space-y-4">
                {place.timings.map((t: any, i: number) => (
                  <div key={i}>
                    <h4 className="font-semibold">{t.season}</h4>
                    <ul className="text-sm text-muted-foreground">
                      {t.rows.map((r: string, j: number) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Tabs.Content>

              {/* History */}
              <Tabs.Content value="history" className="mt-6">
                {/* ===== HISTORY SECTION ===== */}
                <section className="space-y-6">
                  <div className="space-y-5">
                    {place.history
                      .split("\n")
                      .map((para: string, i: number) => (
                        <p
                          key={i}
                          className="text-muted-foreground leading-relaxed text-base md:text-lg"
                        >
                          {para}
                        </p>
                      ))}
                  </div>
                </section>
              </Tabs.Content>

              {/* Reach */}
              <Tabs.Content value="reach" className="mt-6 space-y-3">
                <p>🚗 {place.howToReach.byRoad}</p>
                <p>🚆 {place.howToReach.byRail}</p>
                <p>✈️ {place.howToReach.byAir}</p>
                <p>🛺 {place.howToReach.localTransport}</p>
              </Tabs.Content>
            </Tabs.Root>

            <div className="rounded-xl overflow-hidden h-72 border">
              <PlaceMap
                lat={place.geo.lat}
                lng={place.geo.lng}
                name={place.name}
              />
            </div>
          </section>

          {/* ===== SIDEBAR ===== */}
          <aside className="hidden lg:block space-y-6">
            <BookingWidget />

            <div className="border rounded-xl p-6">
              <h3 className="font-bold mb-3">About the Author</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <AvatarButton
                    name={place.author?.name}
                    image={place.author?.avatar.url}
                  />
                </div>
                <div>
                  <p className="font-medium">{place.author?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {place.author?.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Writes about sacred places and devotional travel across Braj
                Bhoomi.
              </p>
            </div>
            {currentUser && (
              <div className="flex gap-2  my-4">
                {/* Edit */}
                {canEditPerform(currentUser, place.author) && (
                 <Link href={`/places/${place._id}/edit`}>
                     <Button
                    variant="outline"
                    size="sm"
                    
                  >
                    ✍️ Edit
                  </Button>
                 </Link>
                )}

                {/* Delete */}
                {canDeletePerform(currentUser, place?.author) && (
                 <DeletePlaceButton placeId={place._id}/>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

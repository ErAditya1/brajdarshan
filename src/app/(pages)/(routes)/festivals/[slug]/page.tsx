import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  MapPin,
  Star,
  Info,
  Clock,
  Navigation,
} from 'lucide-react';

import { festivals } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FestivalDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FestivalDetailPage({
  params,
}: FestivalDetailPageProps) {
  const { slug } = await params;

  const festival = festivals.find((f) => f.slug === slug);

  if (!festival) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* ================= HERO ================= */}
      <section className="relative h-80 md:h-105">
        <Image
          src={festival.image}
          alt={festival.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-10">
            <Badge className="mb-3">{festival.type ?? 'Festival'}</Badge>

            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">
              {festival.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {festival.date}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {festival.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ===== MAIN CONTENT ===== */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-3">
                About {festival.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {festival.description}
              </p>
            </section>

            {/* Spiritual Significance */}
            <section className="rounded-xl border bg-primary/5 p-6">
              <h3 className="font-serif font-bold text-xl mb-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-primary" />
                Spiritual Significance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {festival.significance ??
                  `This festival holds immense importance in Braj Bhoomi and is deeply connected with the divine pastimes of Lord Krishna.`}
              </p>
            </section>

            {/* Rituals */}
            <section>
              <h3 className="text-xl font-serif font-bold mb-4">
                Key Rituals & Celebrations
              </h3>
              <ul className="space-y-3">
                {(festival.rituals ?? []).map((ritual: string) => (
                  <li
                    key={ritual}
                    className="flex items-start gap-3"
                  >
                    <div className="bg-primary/10 p-2 rounded">
                      <Info className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      {ritual}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Travel Tips */}
            <section className="rounded-xl border bg-accent/10 p-6">
              <h3 className="font-serif font-bold text-xl mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Tips for Devotees
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {(festival.tips ?? [
                  'Arrive early to avoid heavy crowds',
                  'Dress modestly and comfortably',
                  'Follow temple security guidelines',
                ]).map((tip: string) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>

            {/* Map */}
            <section className="relative h-64 rounded-xl overflow-hidden border">
              <Image
                src="https://images.unsplash.com/photo-1646303297330-17073f7823c3"
                alt="Festival Map"
                fill
                className="object-cover opacity-60"
              />
              <Button className="absolute inset-0 m-auto w-fit h-fit shadow-lg">
                <Navigation className="w-4 h-4 mr-2" />
                View Locations
              </Button>
            </section>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="space-y-8">
            <div className="border rounded-xl p-6 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                Plan Your Visit
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                This festival attracts thousands of devotees. Plan your stay
                and darshan in advance for a smooth experience.
              </p>
              <Button className="w-full">
                Plan Trip for {festival.name}
              </Button>
            </div>

            <div className="border rounded-xl p-6 bg-card">
              <h3 className="font-serif font-bold text-lg mb-3">
                Related Festivals
              </h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {festivals
                  .filter((f) => f.slug !== festival.slug)
                  .slice(0, 3)
                  .map((f) => (
                    <li key={f.slug}>
                      → {f.name}
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

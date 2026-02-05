import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

import FestivalCard from '@/components/features/FestivalCard';
import { festivals } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UpcomingFestivalCard from '@/components/features/UpcommingFestivalCard';

export default function FestivalsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section className="relative h-65 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1702943545400-ea5b75e3d32c"
          alt="Braj Festivals"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Festivals of Braj
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Experience divine celebrations where devotion, culture, and
              Krishna’s leela come alive throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED FESTIVALS ================= */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-1">
              Major Celebrations
            </h2>
            <p className="text-muted-foreground text-sm">
              Don’t miss these sacred festivals in Braj Bhoomi
            </p>
          </div>

          <Button variant="outline" size="sm">
            Export Calendar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.filter(f => f.isMajor).map((festival) => (
            <FestivalCard key={festival.id} {...festival} />
          ))}
        </div>
      </section>

      {/* ================= UPCOMING EVENTS LIST ================= */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl border bg-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground text-sm">
                Plan your yatra around these auspicious dates
              </p>
            </div>
          </div>

          <div className="space-y-4">
            
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {festivals.filter(f => f.status === 'upcoming').map((festival) => (
    <UpcomingFestivalCard key={festival.id} {...festival} />
  ))}
</div>
          </div>
        </div>
      </section>
    </main>
  );
}

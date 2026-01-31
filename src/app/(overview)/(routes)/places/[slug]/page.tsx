import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Clock,
  Star,
  Share2,
  Heart,
  Info,
  Navigation,
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookingWidget from '@/components/features/BookingWidget';
import { places } from '@/lib/data';


import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PlaceMap from '@/components/maps/Map';





export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const place = places.find((p) => p.slug === slug);

  // 🔴 Fallback (404 or invalid slug)
  if (!place) {
    return {
      title: 'Place Not Found | Braj Darshan',
      description:
        'Braj Darshan helps you explore temples, ghats, and sacred places in Vrindavan and Mathura.',
      openGraph: {
        title: 'Place Not Found | Braj Darshan',
        description:
          'Discover sacred destinations across Braj Bhoomi with Braj Darshan.',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Place Not Found | Braj Darshan',
        description:
          'Explore temples and pilgrimage sites with Braj Darshan.',
      },
    };
  }

  // ✅ Brand-first SEO
  const title = `${place.name}, ${place.location} | Braj Darshan`;
  const description = `${place.name} in ${place.location} — darshan timings, history, travel tips, and reviews. Discover sacred places with Braj Darshan.`;

  return {
    title,
    description,

    keywords: [
      'Braj Darshan',
      place.name,
      place.location,
      'Vrindavan temples',
      'Mathura pilgrimage',
      'Krishna temples',
      place.type,
    ],

    openGraph: {
      title: `${place.name} | Braj Darshan`,
      description,
      siteName: 'Braj Darshan',
      images: [
        {
          url: place.image,
          width: 1200,
          height: 630,
          alt: `${place.name} - Braj Darshan`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${place.name} | Braj Darshan`,
      description,
      images: [place.image],
    },
  };
}



interface PlaceDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
 const { slug } = await params;

  const place = places.find((p) => p.slug === slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* ================= HERO ================= */}
      <div className="relative h-105 md:h-130">
        <Image
          src={place.image}
          alt={place.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
              <div>
                <Badge className="mb-2">{place.type}</Badge>

                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2">
                  {place.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {place.location}
                  </span>

                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {place.timingText}
                  </span>

                  <span className="flex items-center text-yellow-600 font-medium">
                    <Star className="w-4 h-4 mr-1 fill-yellow-500" />
                    {place.rating} ({place.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button className="md:hidden">Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== Main ===== */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs.Root defaultValue="overview">
              <Tabs.List className="flex border-b mb-6 overflow-x-auto">
                {['overview', 'timings', 'history', 'reach'].map((tab) => (
                  <Tabs.Trigger
                    key={tab}
                    value={tab}
                    className="
                      px-4 py-2 whitespace-nowrap font-medium
                      border-b-2 border-transparent
                      data-[state=active]:border-primary
                      data-[state=active]:text-primary
                    "
                  >
                    {tab === 'overview' && 'Overview'}
                    {tab === 'timings' && 'Timings & Aarti'}
                    {tab === 'history' && 'History'}
                    {tab === 'reach' && 'How to Reach'}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <Tabs.Content value="overview" className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">
                  About {place.name}
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {place.description}
                </p>

                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mt-6">
                  <h3 className="font-semibold flex items-center mb-2">
                    <Info className="w-4 h-4 mr-2" />
                    Important Tips
                  </h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                    <li>Best time to visit is during early morning Aarti.</li>
                    <li>Beware of monkeys; keep valuables safe.</li>
                    <li>Photography may be restricted inside.</li>
                  </ul>
                </div>
              </Tabs.Content>

              <Tabs.Content value="timings" className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">
                  Daily Schedule
                </h2>
                <p className="text-muted-foreground">
                  {place.timingText}
                </p>
              </Tabs.Content>

              <Tabs.Content value="history" className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">
                  History & Legend
                </h2>
                <p className="text-muted-foreground">
                  This sacred place holds immense importance in Vaishnava
                  tradition and is deeply associated with the divine pastimes
                  of Lord Krishna.
                </p>
              </Tabs.Content>

              <Tabs.Content value="reach" className="space-y-4">
                <h2 className="text-2xl font-serif font-bold">
                  Getting There
                </h2>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded mr-3">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    E-rickshaws are the most convenient way to reach this place
                    within Vrindavan. Fare approx ₹20–50.
                  </p>
                </div>
              </Tabs.Content>
            </Tabs.Root>

            <div className="rounded-xl overflow-hidden h-64 bg-muted border flex items-center justify-center relative">
              <Image
                src="https://images.unsplash.com/photo-1646303297330-17073f7823c3"
                alt="Map view"
                fill
                className="object-cover opacity-50"
              />
              <Button className="absolute shadow-lg">
                View on Map
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden h-64 bg-muted border flex items-center justify-center relative">
              <PlaceMap
                lat={38.8976763}
                lng={-77.0365298}
                name={place.name}
              />

              </div>

          </div>

          {/* ===== Sidebar ===== */}
          <aside className="hidden lg:block space-y-8">
            <BookingWidget />

            <div className="bg-cream border p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-4">Need a Guide?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Book a verified local guide for darshan and history.
              </p>
              <Button variant="outline" className="w-full">
                Contact Guide
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

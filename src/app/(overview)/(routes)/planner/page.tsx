'use client';

import { useState } from 'react';
import {
  Calendar,
  DollarSign,
  Sunrise,
  Sunset,
  MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { places } from '@/lib/data';

export default function PlannerPage() {
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState(5000);

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12">
        {/* ================= HEADER ================= */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            Yatra Planner
          </h1>
          <p className="text-muted-foreground">
            Create a peaceful and well-planned spiritual journey across
            Vrindavan & Mathura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= CONTROLS ================= */}
          <aside className="space-y-6">
            {/* Duration & Budget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Trip Preferences
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Days */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Duration
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDays((d) => Math.max(1, d - 1))}
                    >
                      −
                    </Button>

                    <span className="text-lg font-bold w-8 text-center">
                      {days}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDays((d) => Math.min(7, d + 1))}
                    >
                      +
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      days
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Budget (per person)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="range"
                      min={1000}
                      max={20000}
                      step={500}
                      value={budget}
                      onChange={(e) =>
                        setBudget(Number(e.target.value))
                      }
                      className="flex-1"
                    />
                    <span className="font-bold whitespace-nowrap">
                      ₹{budget}
                    </span>
                  </div>
                </div>

                <Button className="w-full">
                  Generate Itinerary
                </Button>
              </CardContent>
            </Card>

            {/* Spiritual Tip */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">
                  🌸 Darshan Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                  Begin your day before sunrise to attend Mangala
                  Aarti and experience temples without crowds.
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* ================= ITINERARY ================= */}
          <section className="lg:col-span-2 space-y-6">
            {Array.from({ length: days }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="bg-secondary/10 border-b flex flex-row items-center justify-between">
                  <CardTitle>
                    Day {i + 1}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Est. ₹{Math.round(budget / days)}
                  </span>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Morning */}
                  <TimelineItem
                    time="05:30"
                    icon={<Sunrise className="w-4 h-4" />}
                    title={`Darshan at ${
                      places[i % places.length]?.name
                    }`}
                    desc="Mangala Aarti, parikrama, and peaceful darshan."
                  />

                  {/* Midday */}
                  <TimelineItem
                    time="09:00"
                    icon={<MapPin className="w-4 h-4" />}
                    title="Breakfast & Local Walk"
                    desc="Enjoy Bedai, Jalebi, and explore local ghats."
                  />

                  {/* Evening */}
                  <TimelineItem
                    time="17:30"
                    icon={<Sunset className="w-4 h-4" />}
                    title="Yamuna Aarti & Boat Ride"
                    desc="Witness evening aarti with sunset views."
                  />
                </CardContent>
              </Card>
            ))}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <Button variant="outline">
                Email Itinerary
              </Button>
              <Button>
                Save to Profile
              </Button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

/* ================= Timeline Item ================= */

function TimelineItem({
  time,
  title,
  desc,
  icon,
}: {
  time: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 p-3 rounded-lg hover:bg-accent/40 transition">
      <div className="w-14 text-sm font-bold text-muted-foreground">
        {time}
      </div>

      <div className="flex items-start gap-3 flex-1">
        <div className="mt-1 text-primary">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

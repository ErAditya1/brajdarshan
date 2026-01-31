'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SearchBar from '@/components/features/SearchBar';
import PlaceCard from '@/components/features/PlaceCard';
import FestivalCard from '@/components/features/FestivalCard';
import { places, festivals } from '@/lib/data';

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const heroMotion = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: 'easeOut' } };

  // Newsletter state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function isValidEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Replace this with your real API call
      await new Promise((r) => setTimeout(r, 600));
      setStatus('success');
      setMessage('Thanks — you’re subscribed! Check your inbox.');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setTimeout(() => {
        // clear transient messages after a short period
        setStatus('idle');
        setMessage('');
      }, 4500);
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* ================= HERO ================= */}
      <section aria-labelledby="hero-heading" className="relative min-h-[70vh] md:min-h-[84vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1629639083646-9120347a4ff8"
          alt="Krishna flute and peacock feather - Vrindavan"
          fill
          priority
          className="object-cover brightness-60"
        />

        {/* subtle radial vignette + vertical gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

        <div className="relative z-10 container px-6">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
              Walk the land where Krishna lived
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
              Plan your spiritual journey to Vrindavan & Mathura — temples, festivals, and trusted guides.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/places">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8  backdrop-blur cursor-pointer">
                  Explore Places
                </Button>
              </Link>
              <Link href="/planner">
                <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer text-lg px-8 bg-white/10 backdrop-blur border-white/40 text-white hover:bg-white hover:text-black">
                  Plan Trip
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= Floating Search Bar (overlap) ================= */}
      <div className=" relative z-30">
       
            <div className="">
              <SearchBar />
            </div>
          </div>
      

      {/* ================= POPULAR PLACES ================= */}
      <section className="py-16 container px-6" aria-labelledby="places-heading">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <h2 id="places-heading" className="text-3xl font-serif font-bold text-foreground">Popular Temples & Ghats</h2>
            <p className="text-muted-foreground mt-2">Most visited spiritual destinations in Braj</p>
          </div>
          <div className="ml-auto hidden md:block">
            <Link href="/places" className="inline-flex items-center text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
              View all places <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {places.slice(0, 4).map((place) => (
            <article key={place.id} className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-saffron rounded-xl">
              {/* PlaceCard should already handle image lazy-loading & alt text; we add a small wrapper for hover/focus */}
              <div className="transform transition duration-300 hover:-translate-y-1 hover:scale-[1.01] focus-within:scale-[1.01]">
                <PlaceCard {...place} />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/places">
            <Button variant="outline">View all places</Button>
          </Link>
        </div>
      </section>

      {/* ================= FESTIVALS ================= */}
      <section className="py-16 bg-linear-to-b from-orange-50/40 to-transparent" aria-labelledby="festivals-heading">
        <div className="container px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 id="festivals-heading" className="text-3xl font-serif font-bold text-foreground">Upcoming Festivals</h2>
              <p className="text-muted-foreground mt-2">Celebrate with devotion and colors</p>
            </div>

            <Link href="/festivals" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View calendar <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {festivals.filter(f => f.isMajor).map((festival) => (
              <div key={festival.id} className="rounded-xl">
                <FestivalCard {...festival} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 container px-6 text-center" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-3xl font-serif font-bold mb-10">How BrajDarshan Works</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: 'Explore',
              desc: 'Discover ancient temples, hidden ghats, and spiritual events.',
              icon: <Star className="w-7 h-7 text-primary" aria-hidden />,
              step: 1,
            },
            {
              title: 'Plan',
              desc: 'Use our smart trip planner to create a customized itinerary.',
              step: 2,
            },
            {
              title: 'Book',
              desc: 'Book trusted guides, stays, and pooja services seamlessly.',
              step: 3,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl border bg-card hover:shadow-xl transition-shadow"
              role="region"
              aria-label={`${item.step}. ${item.title}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon ?? <span className="text-2xl font-bold text-primary">{item.step}</span>}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.step}. {item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container px-6 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay Connected</h2>
          <p className="mb-6 text-secondary-foreground/85">Join our newsletter for festival alerts, darshan timings, and travel tips.</p>

          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto" aria-live="polite" aria-describedby="newsletter-msg">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 h-11 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-invalid={status === 'error'}
            />
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p id="newsletter-msg" className={`mt-3 text-sm ${status === 'error' ? 'text-destructive' : 'text-foreground/80'}`}>
            {message}
          </p>
        </div>
      </section>
    </main>
  );
}

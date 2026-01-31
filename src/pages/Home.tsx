import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/features/SearchBar';
import PlaceCard from '@/components/features/PlaceCard';
import FestivalCard from '@/components/features/FestivalCard';
import { places, festivals } from '@/lib/data';
import { motion } from 'motion/react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1629639083646-9120347a4ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLcmlzaG5hJTIwZmx1dGUlMjBwZWFjb2NrJTIwZmVhdGhlcnxlbnwxfHx8fDE3Njk2ODE0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
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
              <Link to="/places">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Explore Places
                </Button>
              </Link>
              <Link to="/planner">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 bg-white/10 backdrop-blur border-white/40 text-white hover:bg-white hover:text-black">
                  Plan Trip
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar - Overlapping Hero */}
      <div className="container mx-auto px-4 mb-12">
        <SearchBar />
      </div>

      {/* Popular Places */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-foreground">Popular Temples & Ghats</h2>
            <p className="text-muted-foreground mt-2">Most visited spiritual destinations in Braj</p>
          </div>
          <Link to="/places" className="hidden md:flex items-center text-primary font-medium hover:underline">
            View all places <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.slice(0, 4).map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Link to="/places">
                <Button variant="outline">View all places</Button>
            </Link>
        </div>
      </section>

      {/* Featured Festivals */}
      <section className="py-12 md:py-16 bg-cream/50 bg-orange-50/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-foreground">Upcoming Festivals</h2>
              <p className="text-muted-foreground mt-2">Celebrate with devotion and colors</p>
            </div>
            <Link to="/festivals" className="hidden md:flex items-center text-primary font-medium hover:underline">
              View calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {festivals.map((festival) => (
               <FestivalCard key={festival.id} {...festival} />
            ))}
          </div>
        </div>
      </section>

       {/* How it Works */}
       <section className="py-16 container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">How BrajDarshan Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">1. Explore</h3>
                    <p className="text-muted-foreground">Discover ancient temples, hidden ghats, and spiritual events.</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <div className="font-bold text-2xl text-primary">2</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">2. Plan</h3>
                    <p className="text-muted-foreground">Use our smart trip planner to create a customized itinerary.</p>
                </div>
                <div className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <div className="font-bold text-2xl text-primary">3</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">3. Book</h3>
                    <p className="text-muted-foreground">Book trusted guides, stays, and pooja services seamlessly.</p>
                </div>
            </div>
       </section>

       {/* Newsletter */}
       <section className="py-16 bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <h2 className="text-3xl font-serif font-bold mb-4">Stay Connected</h2>
                <p className="mb-8 text-secondary-foreground/80">Join our newsletter for weekly spiritual insights and travel tips.</p>
                <div className="flex gap-2 max-w-md mx-auto">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button>Subscribe</Button>
                </div>
            </div>
       </section>
    </div>
  );
};

export default Home;

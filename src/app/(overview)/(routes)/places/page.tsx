"use client";

import { Filter, ChevronDown } from "lucide-react";
import PlaceCard from "@/components/features/PlaceCard";
import { Button } from "@/components/ui/button";
import { places } from "@/lib/data";
import PlacesHeader from "@/components/features/PlaceHeader";
import { useState } from "react";

export default function PlaceListingPage() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");

  const filteredPlaces = places
    .filter((p) => (category === "All" ? true : p.type === category))
    .sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Distance")
        return parseFloat(a.distance) - parseFloat(b.distance);
      return b.reviews - a.reviews; // Popularity
    });

  return (
    <main className="container mx-auto px-4 py-12">
      {/* ================= Header ================= */}
      <PlacesHeader onCategoryChange={setCategory} onSortChange={setSortBy} />;
      {/* ================= Grid ================= */}
      <section
        aria-label="Places in Braj"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} {...place} />
        ))}
      </section>
      {/* ================= Load More ================= */}
      <div className="mt-14 text-center">
        <Button variant="outline" size="lg">
          Load More
        </Button>
      </div>
    </main>
  );
}

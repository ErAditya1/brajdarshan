"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/features/PlaceCard";
import PlacesHeader from "@/components/features/PlaceHeader";

interface Place {
  _id: string;
  name: string;
  slug: string;
  type: string;
  location: string;
  image: {
    url: string;
  };
  rating: number;
  reviews: number;
  id:string;
  description:string;
  distance:string
}

export default function PlaceListingPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPlaces = async (reset = false) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `/api/places?category=${category}&sortBy=${sortBy}&page=${
        reset ? 1 : page
      }`
    );

    const json = await res.json();

    if (json.success) {
      setPlaces((prev) =>
        reset ? json.data : [...prev, ...json.data]
      );
      setHasMore(json.pagination.hasMore);
      setPage((p) => (reset ? 2 : p + 1));
    }

    setLoading(false);
  };

  // reload on filter change
  useEffect(() => {
    fetchPlaces(true);
  }, [category, sortBy]);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header */}
      <PlacesHeader
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
      />

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {places.map((place) => (
          <PlaceCard key={place._id} {...place} />
        ))}
      </section>

      {/* Load More */}
      {hasMore && (
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => fetchPlaces()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </main>
  );
}

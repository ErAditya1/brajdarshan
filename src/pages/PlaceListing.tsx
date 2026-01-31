import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import PlaceCard from '@/components/features/PlaceCard';
import { Button } from '@/components/ui/button';
import { places } from '@/lib/data';

const PlaceListing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Places in Braj</h1>
          <p className="text-muted-foreground mt-1">Explore temples, ghats, and sacred forests.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                Sort By <ChevronDown className="w-4 h-4" />
            </Button>
            <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" className="bg-primary/5 text-primary">All</Button>
                <Button variant="ghost" size="sm">Temples</Button>
                <Button variant="ghost" size="sm">Ghats</Button>
                <Button variant="ghost" size="sm">Forests</Button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {places.map((place) => (
          <PlaceCard key={place.id} {...place} />
        ))}
         {places.map((place) => (
          <PlaceCard key={`dup-${place.id}`} {...place} />
        ))}
      </div>
      
       <div className="mt-12 text-center">
            <Button variant="outline" size="lg">Load More</Button>
        </div>
    </div>
  );
};

export default PlaceListing;

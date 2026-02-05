import React from 'react';

import { Star, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PlaceCardProps {

  slug: string;
  name: string;
  type: string;
  image: {
    url:string
  };
  description: string;
  rating: number;
  distance: string;
  timing?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ slug, name, type, image, description, rating, distance, timing }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image.url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-primary hover:bg-white">
          {type}
        </Badge>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
            {rating}
        </div>
      </div>
      <CardContent className="p-4 grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-serif line-clamp-1">{name}</h3>
        </div>
        <div className="flex items-center text-muted-foreground text-xs mb-3 space-x-3">
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {distance} away</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {timing}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/places/${slug}`} className="w-full">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary">
            View Details
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;

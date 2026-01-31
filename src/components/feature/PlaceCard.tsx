import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Place } from '@/data/mockData';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link to={`/place/${place.id}`} className="block group h-full">
      <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 border-transparent hover:border-gray-200">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
             <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-charcoal-900">{place.rating}</span>
             </div>
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2">
             {place.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-peacock-700 shadow-sm">
                    {tag}
                </Badge>
             ))}
          </div>
        </div>
        
        <CardContent className="flex-1 p-5">
          <div className="flex justify-between items-start mb-2">
             <h3 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-saffron-600 transition-colors">
                {place.name}
             </h3>
          </div>
          
          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
             <MapPin className="h-3.5 w-3.5" />
             <span>{place.city} • {place.distance} from center</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {place.shortDescription}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 mt-auto border-t border-gray-50 bg-gray-50/50 flex justify-between items-center">
           <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{place.timings.open} - {place.timings.close}</span>
           </div>
           <Button variant="ghost" size="sm" className="text-saffron-600 hover:text-saffron-700 p-0 h-auto font-semibold">
              View Details →
           </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UpcomingFestivalCardProps {
  name: string;
  slug: string;
  month: string;
  day: string;
  location: string;
  type: string;
  image: string;
  description: string;
  importance: 'High' | 'Medium' | 'Low';
}

export default function UpcomingFestivalCard({
  name,
  slug,
  month,
  day,
  location,
  type,
  image,
  description,
  importance,
}: UpcomingFestivalCardProps) {
  return (
    <Link
      href={`/festivals/${slug}`}
      className="group rounded-xl border overflow-hidden bg-card hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="relative h-44">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white/90 rounded-lg px-3 py-1 text-center">
          <span className="block text-xs font-bold uppercase text-muted-foreground">
            {month}
          </span>
          <span className="block text-lg font-bold">
            {day}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{type}</Badge>

          <Badge
            className={
              importance === 'High'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }
          >
            {importance}
          </Badge>
        </div>

        <h3 className="font-serif font-bold text-lg line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          {location}
        </div>
      </div>
    </Link>
  );
}

import Image from 'next/image'
import Link from 'next/link'


import { MapPin, Clock, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface PlaceProps {
  id: string
  name: string
  image: string
  location: string
  rating: number
  tags: string[]
  timings?: string
  place?:string
}

export const PlaceCard = ({ place }: { place: PlaceProps }) => {
  return (
    <Card className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
          <Star className="w-3 h-3 text-(--color-saffron) fill-current" />
          <span>{place.rating}</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 grow">
        <div className="flex gap-2 mb-2 flex-wrap">
          {place.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] uppercase tracking-wider font-sans"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-serif text-lg font-bold text-(--color-charcoal) mb-2 group-hover:text-(--color-saffron) transition-colors">
          {place.name}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          <MapPin className="w-4 h-4" />
          <span>{place.location}</span>
        </div>

        {place.timings && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
            <Clock className="w-3 h-3" />
            <span>{place.timings}</span>
          </div>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0 mt-auto">
        <Link href={`/places/${place.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full hover:bg-(--color-peacock) hover:text-white hover:border-(--color-peacock) transition-colors"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'

interface FestivalProps {
  id: string
  name: string
  date: Date
  location: string
  image: string
}

export const FestivalCard = ({
  festival,
}: {
  festival: FestivalProps
}) => {
  return (
    <Link href={`/festivals/${festival.id}`} className="block group">
      <Card className="overflow-hidden border-none shadow-none bg-transparent hover:shadow-none">
        {/* Image */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />

          <Image
            src={festival.image}
            alt={festival.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Date Badge */}
          <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-center min-w-[3.5rem] shadow-sm">
            <div className="text-xs font-bold text-[var(--color-saffron)] uppercase">
              {format(festival.date, 'MMM')}
            </div>
            <div className="text-lg font-bold leading-none text-gray-900">
              {format(festival.date, 'dd')}
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0">
          <h3 className="font-serif font-bold text-lg text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-peacock)] transition-colors">
            {festival.name}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>{festival.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

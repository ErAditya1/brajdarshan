import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';


interface FestivalCardProps {
    id: string;
    name: string;
    date: string;
    image: string;
    slug:string
}

const FestivalCard: React.FC<FestivalCardProps> = ({ id,slug, name, date, image }) => {
    return (
        <Link href={`/festivals/${slug}`}>
            <Card className="overflow-hidden group  cursor-pointer hover:shadow-md transition-all">
                <div className="relative h-64">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                        <h3 className="text-lg font-bold font-serif">{name}</h3>
                        <div className="flex items-center text-sm text-white/80 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {date}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default FestivalCard;

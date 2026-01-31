import React from 'react';
import { Calendar } from 'lucide-react';
import FestivalCard from '@/components/features/FestivalCard';
import { festivals } from '@/lib/data';
import { Button } from '@/components/ui/button';

const Festivals = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Festivals of Braj</h1>
            <p className="text-muted-foreground mb-8">A calendar of divine celebrations.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {festivals.map((festival) => (
                    <FestivalCard key={festival.id} {...festival} />
                ))}
            </div>

            <div className="border rounded-xl p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Upcoming Events</h2>
                    <Button variant="outline" size="sm">Export Calendar</Button>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
                                <span className="text-xs font-bold uppercase">Oct</span>
                                <span className="text-xl font-bold">{10 + i}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Sharad Purnima</h3>
                                <p className="text-sm text-muted-foreground mb-2">The night when Lord Krishna performed Maha Raas.</p>
                                <div className="flex gap-2">
                                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">Major Festival</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button size="sm" variant="secondary">Details</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Festivals;

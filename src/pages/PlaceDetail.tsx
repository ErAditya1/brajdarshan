import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Clock, Star, Share2, Heart, Info, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookingWidget from '@/components/features/BookingWidget';
import { places } from '@/lib/data';
import * as Tabs from '@radix-ui/react-tabs';

const PlaceDetail = () => {
  const { id } = useParams();
  const place = places.find(p => p.id === id) || places[0];

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <Badge className="mb-2">{place.type}</Badge>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-2">{place.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground">
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {place.location}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {place.timing}</span>
                        <span className="flex items-center text-yellow-600 font-medium"><Star className="w-4 h-4 mr-1 fill-yellow-500" /> {place.rating} ({place.reviews} reviews)</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full"><Share2 className="w-5 h-5" /></Button>
                    <Button variant="secondary" size="icon" className="rounded-full"><Heart className="w-5 h-5" /></Button>
                    <Button className="md:hidden">Book Now</Button>
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {/* Tabs */}
                <Tabs.Root defaultValue="overview" className="flex flex-col">
                    <Tabs.List className="flex border-b mb-6 overflow-x-auto">
                        <Tabs.Trigger value="overview" className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium whitespace-nowrap">Overview</Tabs.Trigger>
                        <Tabs.Trigger value="timings" className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium whitespace-nowrap">Timings & Aarti</Tabs.Trigger>
                        <Tabs.Trigger value="history" className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium whitespace-nowrap">History</Tabs.Trigger>
                        <Tabs.Trigger value="reach" className="px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium whitespace-nowrap">How to Reach</Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="overview" className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold">About {place.name}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {place.description} This temple is one of the seven temples of Thakur of Vrindavan including Sri Radhavallabh ji, Shri Govind Dev ji and four others. The temple is built in Rajasthani style of architecture.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The image of Banke Bihari ji was installed in the temple by Swami Haridas ji. He submitted to the desire of his devotees and appeared in person with his divine consort.
                        </p>

                        <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 mt-6">
                            <h3 className="font-semibold flex items-center mb-2"><Info className="w-4 h-4 mr-2" /> Important Tips</h3>
                            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                                <li>Best time to visit is during early morning Aarti.</li>
                                <li>Beware of monkeys; keep your glasses and food hidden.</li>
                                <li>Photography is restricted inside the inner sanctum.</li>
                            </ul>
                        </div>
                    </Tabs.Content>
                    
                    <Tabs.Content value="timings" className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold mb-4">Daily Schedule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="border p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Summer</h4>
                                <ul className="text-sm space-y-2 text-muted-foreground">
                                    <li className="flex justify-between"><span>Mangala Aarti</span> <span>4:30 AM</span></li>
                                    <li className="flex justify-between"><span>Shringar Aarti</span> <span>7:00 AM</span></li>
                                    <li className="flex justify-between"><span>Rajbhog Aarti</span> <span>12:00 PM</span></li>
                                    <li className="flex justify-between"><span>Shayan Aarti</span> <span>9:30 PM</span></li>
                                </ul>
                             </div>
                              <div className="border p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Winter</h4>
                                <ul className="text-sm space-y-2 text-muted-foreground">
                                    <li className="flex justify-between"><span>Mangala Aarti</span> <span>5:30 AM</span></li>
                                    <li className="flex justify-between"><span>Shringar Aarti</span> <span>8:00 AM</span></li>
                                    <li className="flex justify-between"><span>Rajbhog Aarti</span> <span>12:30 PM</span></li>
                                    <li className="flex justify-between"><span>Shayan Aarti</span> <span>8:30 PM</span></li>
                                </ul>
                             </div>
                        </div>
                    </Tabs.Content>

                    <Tabs.Content value="history" className="space-y-4">
                         <h2 className="text-2xl font-serif font-bold">History & Legend</h2>
                         <p className="text-muted-foreground">
                             Established by Swami Haridas, the guru of the famous musician Tansen, this temple holds a special place in the hearts of Vaishnavites. The deity of Banke Bihari was originally worshipped at Nidhivan.
                         </p>
                    </Tabs.Content>

                    <Tabs.Content value="reach" className="space-y-4">
                         <h2 className="text-2xl font-serif font-bold">Getting There</h2>
                         <div className="space-y-4">
                             <div className="flex items-start">
                                 <div className="bg-primary/10 p-2 rounded mr-3">
                                     <Navigation className="w-5 h-5 text-primary" />
                                 </div>
                                 <div>
                                     <h4 className="font-semibold">By E-Rickshaw</h4>
                                     <p className="text-sm text-muted-foreground">E-rickshaws are the most convenient mode of transport within Vrindavan. Cost approx ₹20-50.</p>
                                 </div>
                             </div>
                         </div>
                    </Tabs.Content>
                </Tabs.Root>

                {/* Map Embed Placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden h-64 bg-gray-100 border flex items-center justify-center relative">
                    <img 
                        src="https://images.unsplash.com/photo-1646303297330-17073f7823c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBtYXAlMjBwbGFubmluZ3xlbnwxfHx8fDE3Njk2ODE0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                        alt="Map"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <Button variant="default" className="absolute shadow-lg">View on Map</Button>
                </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
                <BookingWidget />
                
                <div className="mt-8 bg-cream border p-6 rounded-xl">
                    <h3 className="font-bold text-lg mb-4">Need a Guide?</h3>
                    <p className="text-sm text-muted-foreground mb-4">Book a local verified guide to explain the history and help you with Darshan.</p>
                    <Button variant="outline" className="w-full">Contact Guide</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;

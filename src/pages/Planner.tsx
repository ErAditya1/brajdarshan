import React, { useState } from 'react';
import { Plus, Trash2, Calendar, DollarSign, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { places } from '@/lib/data';

const Planner = () => {
    const [days, setDays] = useState(2);
    const [budget, setBudget] = useState(5000);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Trip Planner</h1>
            <p className="text-muted-foreground mb-8">Customize your perfect spiritual itinerary.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h3 className="font-semibold text-lg flex items-center"><Calendar className="w-5 h-5 mr-2" /> Duration</h3>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => setDays(Math.max(1, days - 1))}>-</Button>
                                <span className="font-bold text-lg w-8 text-center">{days}</span>
                                <Button variant="outline" size="icon" onClick={() => setDays(Math.min(7, days + 1))}>+</Button>
                                <span>Days</span>
                            </div>

                            <h3 className="font-semibold text-lg flex items-center mt-6"><DollarSign className="w-5 h-5 mr-2" /> Budget (per person)</h3>
                            <div className="flex items-center gap-4">
                                <Input 
                                    type="range" 
                                    min="1000" 
                                    max="20000" 
                                    step="500" 
                                    value={budget} 
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="font-bold whitespace-nowrap">₹ {budget}</span>
                            </div>

                            <Button className="w-full mt-6">Generate Itinerary</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardContent className="pt-6">
                             <h4 className="font-bold mb-2">Pro Tip</h4>
                             <p className="text-sm text-muted-foreground">Start your day early (around 5 AM) to witness Mangala Aarti and avoid crowds.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Itinerary Display */}
                <div className="lg:col-span-2 space-y-6">
                    {Array.from({ length: days }).map((_, i) => (
                        <div key={i} className="border rounded-xl overflow-hidden bg-background">
                            <div className="bg-secondary/10 p-4 border-b flex justify-between items-center">
                                <h3 className="font-bold text-lg">Day {i + 1}</h3>
                                <span className="text-sm text-muted-foreground">Estimated cost: ₹{Math.round(budget / days)}</span>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <div className="w-12 text-sm font-bold text-muted-foreground pt-1">06:00</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Visit {places[i % places.length]?.name || 'Local Temple'}</h4>
                                        <p className="text-sm text-muted-foreground">Morning darshan and parikrama.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <div className="w-12 text-sm font-bold text-muted-foreground pt-1">09:00</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Breakfast at Kachori Gali</h4>
                                        <p className="text-sm text-muted-foreground">Try the famous Bedai and Jalebi.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <div className="w-12 text-sm font-bold text-muted-foreground pt-1">17:00</div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold">Evening Boat Ride at Yamuna</h4>
                                        <p className="text-sm text-muted-foreground">Witness the sunset and evening aarti.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-4 justify-end">
                        <Button variant="outline">Email Itinerary</Button>
                        <Button>Save to Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Planner;

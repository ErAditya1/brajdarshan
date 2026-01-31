import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
    return (
        
        <div className="bg-white/90 backdrop:blur-3xl  p-4 rounded-xl shadow-lg  max-w-4xl mx-auto -mt-8 relative z-10 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search places, temples..." className="pl-9" />
            </div>
            <div className="flex-1 relative">
                 <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                 <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>All Locations</option>
                    <option>Vrindavan</option>
                    <option>Mathura</option>
                    <option>Govardhan</option>
                    <option>Barsana</option>
                 </select>
            </div>
             <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="date" className="pl-9" />
            </div>
            <Button className="md:w-auto w-full">Search</Button>
        </div>
    );
};

export default SearchBar;

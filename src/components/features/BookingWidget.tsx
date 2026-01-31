import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const BookingWidget = () => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl">Book Your Yatra</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="Your Name" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Check In</label>
                <Input type="date" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Check Out</label>
                <Input type="date" />
            </div>
        </div>
        <div className="space-y-2">
             <label className="text-sm font-medium">Guests</label>
             <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
             </select>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg">Request Booking</Button>
      </CardFooter>
    </Card>
  );
};

export default BookingWidget;

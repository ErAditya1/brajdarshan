import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Booking = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Stepper */}
                <div className="flex justify-between items-center mb-12 relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                </div>

                <div className="space-y-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold">
                            {step === 1 && 'Select Your Package'}
                            {step === 2 && 'Enter Details'}
                            {step === 3 && 'Confirmation'}
                        </h1>
                    </div>

                    {step === 1 && (
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="border-2 border-transparent hover:border-primary cursor-pointer transition-all">
                                <CardHeader>
                                    <CardTitle>Basic Darshan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold mb-4">₹500 <span className="text-sm font-normal text-muted-foreground">/ person</span></p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> Hotel Pickup</li>
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> 3 Temples Visit</li>
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> E-Rickshaw</li>
                                    </ul>
                                    <Button className="w-full" onClick={nextStep}>Select</Button>
                                </CardContent>
                            </Card>
                             <Card className="border-2 border-primary cursor-pointer relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded">Recommended</div>
                                <CardHeader>
                                    <CardTitle>Premium Yatra</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold mb-4">₹1500 <span className="text-sm font-normal text-muted-foreground">/ person</span></p>
                                    <ul className="space-y-2 mb-6">
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> AC Cab Pickup</li>
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> 7 Temples Visit</li>
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> VIP Darshan Assistance</li>
                                        <li className="flex items-center text-sm"><Check className="w-4 h-4 mr-2 text-green-500" /> Local Guide Included</li>
                                    </ul>
                                    <Button className="w-full" onClick={nextStep}>Select</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {step === 2 && (
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">First Name</label>
                                        <Input placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Last Name</label>
                                        <Input placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <Input type="tel" placeholder="+91 9876543210" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date of Visit</label>
                                    <Input type="date" />
                                </div>
                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" onClick={prevStep}>Back</Button>
                                    <Button onClick={nextStep}>Proceed to Pay</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {step === 3 && (
                        <Card className="text-center py-12">
                            <CardContent>
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                                <p className="text-muted-foreground mb-6">Your booking ID is #BD-88219. We have sent the details to your email.</p>
                                <div className="flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => window.location.href = '/'}>Go Home</Button>
                                    <Button className="bg-green-600 hover:bg-green-700">Share on WhatsApp</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;

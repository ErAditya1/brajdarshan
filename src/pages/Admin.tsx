import React from 'react';
import { LayoutDashboard, Map, Calendar, Users, FileText, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-serif font-bold text-primary">BrajAdmin</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start bg-accent/20 text-accent-foreground"><LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard</Button>
                    <Button variant="ghost" className="w-full justify-start"><Map className="w-4 h-4 mr-3" /> Places</Button>
                    <Button variant="ghost" className="w-full justify-start"><Calendar className="w-4 h-4 mr-3" /> Bookings</Button>
                    <Button variant="ghost" className="w-full justify-start"><Users className="w-4 h-4 mr-3" /> Vendors</Button>
                    <Button variant="ghost" className="w-full justify-start"><FileText className="w-4 h-4 mr-3" /> Content</Button>
                    <Button variant="ghost" className="w-full justify-start"><Settings className="w-4 h-4 mr-3" /> Settings</Button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                            <p className="text-xs text-muted-foreground">+2 new this week</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                            <div className="font-bold text-xs">INR</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹8.4L</div>
                            <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium">Booking #BD-88{i}</p>
                                            <p className="text-sm text-muted-foreground">Premium Yatra • 2 Guests</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">₹3,000</p>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Confirmed</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Places</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                                            <div>
                                                <p className="font-medium">Banke Bihari Temple</p>
                                                <p className="text-sm text-muted-foreground">12k views this week</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-green-600">
                                            +8%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Admin;

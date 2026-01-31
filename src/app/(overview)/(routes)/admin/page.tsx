'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Map,
  Calendar,
  Users,
  FileText,
  Settings,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-muted/40">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-background border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-serif font-bold text-primary">
            BrajAdmin
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Braj Darshan Control Panel
          </p>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <Button
            variant="ghost"
            className="w-full justify-start bg-primary/10 text-primary"
          >
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </Button>

          <Link href="/admin/places">
            <Button variant="ghost" className="w-full justify-start">
              <Map className="w-4 h-4 mr-3" />
              Places
            </Button>
          </Link>

          <Link href="/admin/bookings">
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-3" />
              Bookings
            </Button>
          </Link>

          <Link href="/admin/vendors">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="w-4 h-4 mr-3" />
              Vendors
            </Button>
          </Link>

          <Link href="/admin/content">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-3" />
              Content
            </Button>
          </Link>

          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor bookings, vendors, and platform activity
          </p>
        </header>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Vendors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                +2 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue
              </CardTitle>
              <span className="text-xs font-bold">INR</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹8.4L</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ================= TABLES ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        Booking #BD-88{i}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Premium Yatra • 2 Guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹3,000</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Places */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Places</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-md" />
                      <div>
                        <p className="font-medium">
                          Banke Bihari Temple
                        </p>
                        <p className="text-sm text-muted-foreground">
                          12k views this week
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      +8%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

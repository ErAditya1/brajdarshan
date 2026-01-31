'use client';

import { useState } from 'react';
import { Check, Calendar, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export default function BookingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
 const next = () =>
  setStep((s): 1 | 2 | 3 => {
    if (s === 1) return 2;
    if (s === 2) return 3;
    return 3;
  });

const back = () =>
  setStep((s): 1 | 2 | 3 => {
    if (s === 3) return 2;
    if (s === 2) return 1;
    return 1;
  });

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-14">
        <div className="max-w-3xl mx-auto">
          {/* ================= STEPPER ================= */}
          <div className="relative flex justify-between items-center mb-14">
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-muted -z-10" />
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition
                  ${
                    step >= n
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {n}
              </div>
            ))}
          </div>

          {/* ================= TITLE ================= */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {step === 1 && 'Choose Your Yatra'}
              {step === 2 && 'Pilgrim Details'}
              {step === 3 && 'Darshan Confirmed'}
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              {step === 1 &&
                'Select a suitable darshan package for your spiritual journey.'}
              {step === 2 &&
                'Please enter your details carefully for smooth arrangements.'}
              {step === 3 &&
                'Your darshan has been successfully scheduled.'}
            </p>
          </div>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic */}
              <PackageCard
                title="Basic Darshan"
                price="₹500"
                features={[
                  'E-Rickshaw Travel',
                  '3 Major Temples',
                  'Hotel Pickup',
                ]}
                onSelect={next}
              />

              {/* Premium */}
              <PackageCard
                featured
                title="Premium Yatra"
                price="₹1500"
                features={[
                  'AC Cab Pickup',
                  '7 Major Temples',
                  'VIP Darshan Assistance',
                  'Local Guide Included',
                ]}
                onSelect={next}
              />
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Pilgrim Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <Field icon={<User />} label="First Name" />
                  <Field icon={<User />} label="Last Name" />
                </div>

                <Field icon={<Mail />} label="Email Address" type="email" />
                <Field icon={<Phone />} label="Phone Number" />
                <Field icon={<Calendar />} label="Date of Visit" type="date" />

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next}>
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <Card className="py-12 text-center">
              <CardContent>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold mb-2">
                  Booking Confirmed 🙏
                </h2>

                <p className="text-muted-foreground mb-6">
                  Your Booking ID is{' '}
                  <span className="font-semibold">BD-88219</span>.
                  <br />
                  Details have been sent to your email.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" asChild>
                    <a href="/">Go to Home</a>
                  </Button>

                  <Button className="bg-green-600 hover:bg-green-700">
                    Share on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}

/* ================= HELPER COMPONENTS ================= */

function PackageCard({
  title,
  price,
  features,
  onSelect,
  featured,
}: {
  title: string;
  price: string;
  features: string[];
  onSelect: () => void;
  featured?: boolean;
}) {
  return (
    <Card
      className={`relative transition border-2 ${
        featured
          ? 'border-primary shadow-lg'
          : 'hover:border-primary'
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
          Recommended
        </div>
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold mb-4">
          {price}
          <span className="text-sm text-muted-foreground">
            {' '}
            / person
          </span>
        </p>

        <ul className="space-y-2 mb-6 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {f}
            </li>
          ))}
        </ul>

        <Button className="w-full" onClick={onSelect}>
          Select Package
        </Button>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  type = 'text',
  icon,
}: {
  label: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <Input
          type={type}
          className={icon ? 'pl-10' : ''}
          placeholder={label}
        />
      </div>
    </div>
  );
}

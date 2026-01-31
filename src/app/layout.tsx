import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


import { Inter, Merriweather } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brajdarshan.vercel.app"),

  title: {
    default: "BrajDarshan | Vrindavan & Mathura Travel Guide, Temples, Booking",
    template: "%s | BrajDarshan",
  },

  description:
    "BrajDarshan is your complete travel guide to Vrindavan and Mathura. Explore temples, darshan timings, festivals, maps, itineraries, hotels, guides and book your spiritual yatra with ease.",

  keywords: [
    "Vrindavan travel",
    "Mathura travel",
    "Krishna temples",
    "Braj yatra",
    "Banke Bihari temple darshan",
    "Prem Mandir timings",
    "Vrindavan hotels",
    "Mathura tour packages",
    "Krishna Janmabhoomi",
  ],

  authors: [{ name: "BrajDarshan Team" }],
  creator: "BrajDarshan",
  publisher: "BrajDarshan",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },

  openGraph: {
    title: "BrajDarshan | Spiritual Journey to Vrindavan & Mathura",
    description:
      "Plan your spiritual journey to Vrindavan and Mathura with BrajDarshan. Temples, festivals, maps, darshan timings and trusted bookings.",
    url: "https://brajdarshan.vercel.app",
    siteName: "BrajDarshan",
    images: [
      {
        url: "/logo/logo2.png",
        width: 1200,
        height: 630,
        alt: "BrajDarshan - Vrindavan Mathura Travel",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BrajDarshan | Vrindavan & Mathura Travel",
    description:
      "Explore temples, darshan timings, festivals and book your Braj yatra with BrajDarshan.",
    images: ["/logo/logo2.png"],
  },

  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable} ${merriweather.variable} `}
      >
        {children}
      </body>
    </html>
  );
}

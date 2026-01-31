import { addDays, format } from 'date-fns';

export interface Place {
  id: string;
  name: string;
  type: 'temple' | 'ghat' | 'forest' | 'market';
  city: 'Vrindavan' | 'Mathura' | 'Govardhan';
  description: string;
  shortDescription: string;
  rating: number;
  reviewsCount: number;
  image: string;
  distance: string; // from center
  timings: {
    open: string;
    close: string;
    aarti?: string[];
    break?: string;
  };
  crowdLevel: 'low' | 'moderate' | 'high';
  tags: string[];
  location: {
    lat: number;
    lng: number;
  };
}

export interface Festival {
  id: string;
  name: string;
  date: string; // ISO
  description: string;
  image: string;
  crowdPrediction: 'low' | 'moderate' | 'high' | 'very high';
  type: 'major' | 'minor';
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  placeName: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  guests: number;
  type: 'darshan' | 'hotel' | 'guide';
}

export interface Vendor {
  id: string;
  name: string;
  type: 'hotel' | 'guide' | 'shop';
  rating: number;
  verified: boolean;
  priceStart: number;
  image: string;
  location: string;
}

export interface Itinerary {
    day: number;
    activities: {
        time: string;
        placeId: string;
        description: string;
    }[];
}


export const places: Place[] = [
  {
    id: '1',
    name: 'Banke Bihari Temple',
    type: 'temple',
    city: 'Vrindavan',
    shortDescription: 'The most revered temple in Vrindavan, dedicated to Lord Krishna.',
    description: 'Banke Bihari Temple is a Hindu temple dedicated to Lord Krishna, in the holy city of Vrindavan in the Mathura district of Uttar Pradesh, India. It is one of the 7 temples of Thakur of Vrindavan. The image of Bihariji installed in the temple is the one worshipped by Swami Haridas.',
    rating: 4.9,
    reviewsCount: 12540,
    image: 'https://images.unsplash.com/photo-1742406079212-2d71add4378a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWcmluZGF2YW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY5Njc4OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    distance: '0.5 km',
    timings: {
      open: '07:45 AM',
      close: '09:30 PM',
      break: '12:00 PM - 05:30 PM',
      aarti: ['08:00 AM', '09:00 PM']
    },
    crowdLevel: 'high',
    tags: ['Must Visit', 'Ancient', 'Aarti'],
    location: { lat: 27.5802, lng: 77.7025 }
  },
  {
    id: '2',
    name: 'Prem Mandir',
    type: 'temple',
    city: 'Vrindavan',
    shortDescription: 'A massive temple complex made of white marble, beautiful at night.',
    description: 'Prem Mandir is a Hindu temple in Vrindavan, Mathura, India. It is maintainedzp by Jagadguru Kripalu Parishat, an international non-profit, educational, spiritual, charitable trust.',
    rating: 4.8,
    reviewsCount: 8900,
    image: 'https://images.unsplash.com/photo-1681508401397-10f7504c4a05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmVtJTIwTWFuZGlyJTIwVnJpbmRhdmFuJTIwbmlnaHR8ZW58MXx8fHwxNzY5Njc4OTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    distance: '3.2 km',
    timings: {
      open: '05:30 AM',
      close: '08:30 PM',
      break: '12:00 PM - 04:30 PM',
      aarti: ['05:30 AM', '08:00 PM']
    },
    crowdLevel: 'moderate',
    tags: ['Architecture', 'Light Show', 'Gardens'],
    location: { lat: 27.5724, lng: 77.6748 }
  },
  {
    id: '3',
    name: 'ISKCON Vrindavan',
    type: 'temple',
    city: 'Vrindavan',
    shortDescription: 'Also known as Sri Sri Krishna Balaram Mandir.',
    description: 'One of the major ISKCON temples in the world, filled with international devotees and constant kirtan.',
    rating: 4.7,
    reviewsCount: 6500,
    image: 'https://images.unsplash.com/photo-1731704686012-12f5f6257b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLcmlzaG5hJTIwZGVpdHklMjBmbG93ZXIlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc2OTY3ODkxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    distance: '2.5 km',
    timings: {
      open: '04:10 AM',
      close: '08:45 PM',
      break: '12:45 PM - 04:15 PM',
      aarti: ['04:10 AM', '07:00 PM']
    },
    crowdLevel: 'moderate',
    tags: ['Kirtan', 'Clean', 'Food'],
    location: { lat: 27.5756, lng: 77.6836 }
  },
  {
    id: '4',
    name: 'Vishram Ghat',
    type: 'ghat',
    city: 'Mathura',
    shortDescription: 'The main ghat on the Yamuna river in Mathura.',
    description: 'Vishram Ghat is a ghat, a bath and worship place, on the banks of river Yamuna in Mathura, India. It is the main ghat of Mathura and is central to 25 other ghats.',
    rating: 4.6,
    reviewsCount: 3200,
    image: 'https://images.unsplash.com/photo-1743504440802-5fdea460cd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxZYW11bmElMjByaXZlciUyMGdoYXQlMjBib2F0c3xlbnwxfHx8fDE3Njk2Nzg5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    distance: '0 km',
    timings: {
      open: '24 Hours',
      close: '24 Hours',
      aarti: ['06:00 AM', '07:00 PM']
    },
    crowdLevel: 'moderate',
    tags: ['River', 'Boat Ride', 'History'],
    location: { lat: 27.4924, lng: 77.6737 }
  },
  {
    id: '5',
    name: 'Dwarkadhish Temple',
    type: 'temple',
    city: 'Mathura',
    shortDescription: 'Oldest and one of the most famous temples in Mathura.',
    description: 'Built in 1814, the Dwarkadhish Temple is one of the oldest and largest temples in Mathura.',
    rating: 4.5,
    reviewsCount: 4100,
    image: 'https://images.unsplash.com/photo-1759648106564-7111304284da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXRodXJhJTIwYW5jaWVudCUyMHN0cmVldHxlbnwxfHx8fDE3Njk2Nzg5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    distance: '0.8 km',
    timings: {
      open: '06:30 AM',
      close: '07:00 PM',
      break: '10:30 AM - 04:00 PM',
      aarti: ['07:00 AM', '06:30 PM']
    },
    crowdLevel: 'high',
    tags: ['Architecture', 'Holi'],
    location: { lat: 27.4965, lng: 77.6766 }
  }
];

export const festivals: Festival[] = [
  {
    id: '1',
    name: 'Janmashtami',
    date: '2026-09-04',
    description: 'The birth anniversary of Lord Krishna, celebrated with great pomp and show.',
    image: 'https://images.unsplash.com/photo-1731704686012-12f5f6257b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLcmlzaG5hJTIwZGVpdHklMjBmbG93ZXIlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc2OTY3ODkxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    crowdPrediction: 'very high',
    type: 'major'
  },
  {
    id: '2',
    name: 'Holi',
    date: '2026-03-04',
    description: 'The festival of colors, played uniquely in Braj with flowers and lathmar holi.',
    image: 'https://images.unsplash.com/photo-1756382616831-998e8baf9675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjbGFzc2ljYWwlMjBkYW5jZSUyMGZlc3RpdmFsfGVufDF8fHx8MTc2OTY3ODkxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    crowdPrediction: 'very high',
    type: 'major'
  },
  {
    id: '3',
    name: 'Radhashtami',
    date: '2026-09-18',
    description: 'Birth anniversary of Radha Rani, celebrated grandly in Barsana.',
    image: 'https://images.unsplash.com/photo-1730368575523-242432c3728a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwZmVhdGhlciUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY5NTc1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    crowdPrediction: 'high',
    type: 'major'
  }
];

export const bookings: Booking[] = [
  { id: 'BK-1001', userId: 'U1', userName: 'Rahul Sharma', placeName: 'Nidhivan Hotel', date: '2026-02-10', status: 'confirmed', amount: 4500, guests: 2, type: 'hotel' },
  { id: 'BK-1002', userId: 'U2', userName: 'Priya Singh', placeName: 'Banke Bihari Guide', date: '2026-02-12', status: 'pending', amount: 800, guests: 4, type: 'guide' },
  { id: 'BK-1003', userId: 'U3', userName: 'Amit Patel', placeName: 'Yamuna Aarti Boat', date: '2026-02-15', status: 'confirmed', amount: 1200, guests: 3, type: 'darshan' },
  { id: 'BK-1004', userId: 'U4', userName: 'Sneha Gupta', placeName: 'Hotel Kridha', date: '2026-02-18', status: 'cancelled', amount: 5500, guests: 2, type: 'hotel' },
  { id: 'BK-1005', userId: 'U5', userName: 'Vikram Malhotra', placeName: 'Vrindavan Parikrama', date: '2026-02-20', status: 'confirmed', amount: 2000, guests: 1, type: 'guide' },
];

export const vendors: Vendor[] = [
  { id: 'V1', name: 'Nidhivan Sarovar Portico', type: 'hotel', rating: 4.5, verified: true, priceStart: 4000, image: 'https://images.unsplash.com/photo-1759648106564-7111304284da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXRodXJhJTIwYW5jaWVudCUyMHN0cmVldHxlbnwxfHx8fDE3Njk2Nzg5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', location: 'Vrindavan' },
  { id: 'V2', name: 'Braj Yatra Guides', type: 'guide', rating: 4.8, verified: true, priceStart: 500, image: 'https://images.unsplash.com/photo-1764785314444-f6b6b4193bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWRodSUyMG1lZGl0YXRpbmclMjB2YXJhbmFzaXxlbnwxfHx8fDE3Njk2Nzg5MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', location: 'Mathura & Vrindavan' },
  { id: 'V3', name: 'Govinda\'s Restaurant', type: 'shop', rating: 4.6, verified: false, priceStart: 300, image: 'https://images.unsplash.com/photo-1727018792817-2dae98db2294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBzd2VldHMlMjBsYWRkb298ZW58MXx8fHwxNzY5Njc4OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', location: 'Vrindavan' }
];

export const adminStats = [
    { name: 'Mon', bookings: 40, revenue: 2400 },
    { name: 'Tue', bookings: 30, revenue: 1398 },
    { name: 'Wed', bookings: 20, revenue: 9800 },
    { name: 'Thu', bookings: 27, revenue: 3908 },
    { name: 'Fri', bookings: 18, revenue: 4800 },
    { name: 'Sat', bookings: 23, revenue: 3800 },
    { name: 'Sun', bookings: 34, revenue: 4300 },
];

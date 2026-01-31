export interface Place {
  id: string;
  name: string;
  type: 'Temple' | 'Ghat' | 'Historical' | 'Ashram';
  location: string; // Vrindavan, Mathura, Govardhan, Barsana, Nandgaon
  image: string;
  rating: number;
  reviews: number;
  description: string;
  timings: {
    open: string;
    close: string;
    aarti?: string[];
  };
  tags: string[];
}

export const places: Place[] = [
  {
    id: '1',
    name: 'Banke Bihari Temple',
    type: 'Temple',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1707938233687-47e61e5ad7c4',
    rating: 4.9,
    reviews: 15420,
    description: 'The most revered temple in Vrindavan, dedicated to Lord Krishna. The idol is believed to be the one granted to Swami Haridas by the celestial couple.',
    timings: { open: '07:45 AM', close: '09:30 PM', aarti: ['08:00 AM', '12:00 PM', '09:30 PM'] },
    tags: ['Must Visit', 'Crowded', 'Ancient']
  },
  {
    id: '2',
    name: 'Prem Mandir',
    type: 'Temple',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1561361058-c24ceafe5f23?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 22100,
    description: 'A massive temple complex dedicated to Radha Krishna and Sita Ram. Known for its exquisite marble architecture and musical fountain show.',
    timings: { open: '05:30 AM', close: '08:30 PM', aarti: ['05:30 AM', '08:30 PM'] },
    tags: ['Architecture', 'Light Show', 'Spacious']
  },
  {
    id: '3',
    name: 'ISKCON Temple (Krishna Balaram Mandir)',
    type: 'Temple',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviews: 18500,
    description: 'One of the major ISKCON temples in the world. It was the first temple to be constructed by ISKCON in India.',
    timings: { open: '04:10 AM', close: '08:45 PM', aarti: ['04:10 AM', '07:00 PM'] },
    tags: ['International', 'Bhajan', 'Food']
  },
  {
    id: '4',
    name: 'Vishram Ghat',
    type: 'Ghat',
    location: 'Mathura',
    image: 'https://images.unsplash.com/photo-1591523497127-60a6a0094942?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 8900,
    description: 'The main ghat in Mathura on the banks of the Yamuna River. It is where Lord Krishna is said to have rested after killing Kansa.',
    timings: { open: 'Open 24 Hours', close: 'Open 24 Hours', aarti: ['06:00 AM', '07:00 PM'] },
    tags: ['River', 'Boat Ride', 'Aarti']
  },
  {
    id: '5',
    name: 'Shri Krishna Janmasthan',
    type: 'Temple',
    location: 'Mathura',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 25000,
    description: 'The birthplace of Lord Krishna. The temple complex includes the prison cell where Krishna was born.',
    timings: { open: '05:00 AM', close: '09:30 PM' },
    tags: ['Birthplace', 'History', 'High Security']
  },
  {
    id: '6',
    name: 'Radha Raman Temple',
    type: 'Temple',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 5600,
    description: 'One of the 7 ancient temples of Vrindavan. The deity is self-manifested (Swayambhu) from a Saligram Shila.',
    timings: { open: '08:00 AM', close: '08:00 PM' },
    tags: ['Ancient', 'Peaceful', 'Intricate']
  },
  {
    id: '7',
    name: 'Nidhivan',
    type: 'Ashram',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1605628586395-97e3a35a1215?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviews: 11000,
    description: 'A mysterious grove where it is believed that Krishna performs Raas Leela with gopis every night. No one is allowed inside after sunset.',
    timings: { open: '05:00 AM', close: '07:00 PM' },
    tags: ['Mysterious', 'Nature', 'Monkeys']
  },
  {
    id: '8',
    name: 'Govardhan Hill',
    type: 'Historical',
    location: 'Govardhan',
    image: 'https://images.unsplash.com/photo-1674384860346-68194c7e2d93?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 14000,
    description: 'A sacred hill that Krishna lifted on his finger to protect villagers from torrential rain. Pilgrims perform a 21km parikrama around it.',
    timings: { open: 'Open 24 Hours', close: 'Open 24 Hours' },
    tags: ['Nature', 'Parikrama', 'Trekking']
  },
  {
    id: '9',
    name: 'Radha Rani Temple',
    type: 'Temple',
    location: 'Barsana',
    image: 'https://images.unsplash.com/photo-1604085608759-e24c5625b174?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 7800,
    description: 'Dedicated to Radha Rani, located on a hilltop in Barsana. Famous for Lathmar Holi.',
    timings: { open: '05:00 AM', close: '09:00 PM' },
    tags: ['Hilltop', 'Holi', 'Views']
  }
];

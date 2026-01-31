export const places = [
  {
    id: '1',
    slug: 'banke-bihari-temple',
    name: 'Banke Bihari Temple',
    type: 'Temple',
    image:
      'https://images.unsplash.com/photo-1718169538846-6c4e3a2c1fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description:
      'The holiest and most revered temple of Lord Krishna in Vrindavan, known for its unique darshan style.',
    rating: 4.9,
    reviews: 12500,
    distance: '0.5 km',
    isOpen: true,
    timingText: 'Mangala Aarti to Shayan Aarti',
    location: 'Vrindavan',
    tags: ['Must Visit', 'Crowded', 'Krishna'],
  },
  {
    id: '2',
    slug: 'prem-mandir',
    name: 'Prem Mandir',
    type: 'Temple',
    image:
      'https://images.unsplash.com/photo-1695445629716-068ff1c03060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description:
      'A grand marble temple dedicated to Radha Krishna and Sita Ram, famous for its evening light show.',
    rating: 4.8,
    reviews: 8900,
    distance: '2.0 km',
    isOpen: false,
    timingText: 'Morning & Evening Darshan',
    location: 'Vrindavan',
    tags: ['Light Show', 'Modern Architecture', 'Radha Krishna'],
  },
  {
    id: '3',
    slug: 'keshi-ghat',
    name: 'Keshi Ghat',
    type: 'Ghat',
    image:
      'https://images.unsplash.com/photo-1622811894490-5617d0ed4f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description:
      'The principal bathing ghat on the banks of the Yamuna River, especially beautiful during sunrise and sunset.',
    rating: 4.7,
    reviews: 3400,
    distance: '1.2 km',
    isOpen: true,
    timingText: 'Open All Day',
    location: 'Vrindavan',
    tags: ['Scenic', 'Peaceful', 'Yamuna'],
  },
  {
    id: '4',
    slug: 'iskcon-vrindavan',
    name: 'ISKCON Temple (Krishna Balaram Mandir)',
    type: 'Temple',
    image:
      'https://images.unsplash.com/photo-1637262873851-b64932face9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description:
      'An internationally renowned ISKCON temple known for vibrant kirtans and devotional atmosphere.',
    rating: 4.8,
    reviews: 10200,
    distance: '1.5 km',
    isOpen: true,
    timingText: 'Mangala Aarti to Evening Kirtan',
    location: 'Vrindavan',
    tags: ['International', 'Kirtan', 'ISKCON'],
  },
  {
    id: '5',
    slug: 'govardhan-hill',
    name: 'Govardhan Hill',
    type: 'Pilgrimage',
    image:
      'https://images.unsplash.com/photo-1629639083646-9120347a4ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description:
      'A sacred pilgrimage site associated with Lord Krishna, where devotees perform the Govardhan Parikrama.',
    rating: 4.9,
    reviews: 5600,
    distance: '22 km',
    isOpen: true,
    timingText: 'Open 24 Hours',
    location: 'Govardhan',
    tags: ['Parikrama', 'Hiking', 'Sacred Hill'],
  },
];


export type FestivalStatus = 'upcoming' | 'ongoing' | 'past';
export type ImportanceLevel = 'High' | 'Medium' | 'Low';

export interface Festival {
  id: string;
  name: string;
  slug: string;
  type: string;
  status: FestivalStatus;
  isMajor: boolean;

  date: string;
  month: string;
  day: string;
  location: string;

  image: string;
  description: string;
  significance: string;

  rituals: string[];
  tips: string[];

  importance: ImportanceLevel;
  tags: string[];
}

/* ====================================================== */
/* ================== FESTIVALS DATA ==================== */
/* ====================================================== */

export const festivals: Festival[] = [
  /* ================= MAJOR FESTIVALS ================= */

  {
    id: 'f-1',
    name: 'Janmashtami',
    slug: 'janmashtami',
    type: 'Major Festival',
    status: 'upcoming',
    isMajor: true,

    date: 'August 26, 2024',
    month: 'Aug',
    day: '26',
    location: 'Mathura & Vrindavan',

    image:
      'https://images.unsplash.com/photo-1702943545400-ea5b75e3d32c?q=80&w=1200',

    description:
      'Janmashtami marks the divine appearance of Lord Krishna and is one of the most sacred festivals in Braj Bhoomi.',

    significance:
      'Lord Krishna appeared at midnight in Mathura. Devotees observe fasting, sing bhajans, and participate in midnight aarti celebrating his divine birth.',

    rituals: [
      'Day-long fasting (Upvas)',
      'Midnight Abhishek',
      'Jhanki Darshan',
      'Bhajans & Kirtans',
      'Matki Phod',
    ],

    tips: [
      'Reach temples early due to heavy crowds',
      'Follow security guidelines strictly',
      'Prefer public transport or e-rickshaws',
    ],

    importance: 'High',
    tags: ['Krishna Janma', 'Midnight Aarti', 'Temple Festival'],
  },

  {
    id: 'f-2',
    name: 'Holi of Braj',
    slug: 'holi-of-braj',
    type: 'Cultural Festival',
    status: 'past',
    isMajor: true,

    date: 'March 25, 2024',
    month: 'Mar',
    day: '25',
    location: 'Vrindavan, Barsana, Nandgaon',

    image:
      'https://images.unsplash.com/photo-1617622163466-d1d56ec8b127?q=80&w=1200',

    description:
      'Braj Holi is a week-long celebration filled with colors, devotion, and unique traditions associated with Radha and Krishna.',

    significance:
      'Holi in Braj recreates the playful pastimes of Radha and Krishna and is spiritually and culturally unique.',

    rituals: [
      'Lathmar Holi',
      'Phoolon Ki Holi',
      'Widow Holi',
      'Traditional Color Play',
    ],

    tips: [
      'Wear old clothes',
      'Protect eyes and skin',
      'Respect local traditions',
    ],

    importance: 'High',
    tags: ['Lathmar Holi', 'Phool Holi', 'Braj Culture'],
  },

  /* ================= UPCOMING FESTIVALS ================= */

  {
    id: 'f-3',
    name: 'Sharad Purnima',
    slug: 'sharad-purnima',
    type: 'Vaishnav Festival',
    status: 'upcoming',
    isMajor: false,

    date: 'October 28, 2024',
    month: 'Oct',
    day: '28',
    location: 'Vrindavan',

    image:
      'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1200',

    description:
      'The divine full moon night when Lord Krishna performed Maha Raas Leela.',

    significance:
      'Sharad Purnima symbolizes divine love and devotion. Moonlight on this night is believed to be spiritually healing.',

    rituals: [
      'Raas Leela Performances',
      'Kheer offering under moonlight',
      'Night-long bhajans',
    ],

    tips: [
      'Attend temple events after sunset',
      'Carry light shawls',
    ],

    importance: 'Medium',
    tags: ['Raas Leela', 'Full Moon', 'Krishna Bhakti'],
  },

  {
    id: 'f-4',
    name: 'Govardhan Puja',
    slug: 'govardhan-puja',
    type: 'Vaishnav Festival',
    status: 'upcoming',
    isMajor: true,

    date: 'November 2, 2024',
    month: 'Nov',
    day: '2',
    location: 'Govardhan & Vrindavan',

    image:
      'https://images.unsplash.com/photo-1587135991058-8816b028691f?q=80&w=1200',

    description:
      'Govardhan Puja commemorates Lord Krishna lifting Govardhan Hill to protect Brajwasis.',

    significance:
      'Devotees worship Govardhan as a form of Krishna and offer Annakut.',

    rituals: [
      'Govardhan Parikrama',
      'Annakut Offering',
      'Temple Aartis',
    ],

    tips: [
      'Wear comfortable walking footwear',
      'Start parikrama early morning',
    ],

    importance: 'High',
    tags: ['Govardhan Hill', 'Annakut', 'Krishna Leela'],
  },

  
];


export const upcomingFestivals = [
  {
    id: 'uf-1',
    name: 'Sharad Purnima',
    slug: 'sharad-purnima',
    date: 'October 28, 2024',
    month: 'Oct',
    day: '28',
    location: 'Vrindavan',
    type: 'Major Festival',
    image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1200',
    description:
      'The divine full moon night when Lord Krishna performed Maha Raas Leela.',
    importance: 'High' as const,
    tags: ['Raas Leela', 'Full Moon', 'Krishna Bhakti'],
  },

  {
    id: 'uf-2',
    name: 'Govardhan Puja',
    slug: 'govardhan-puja',
    date: 'November 2, 2024',
    month: 'Nov',
    day: '2',
    location: 'Govardhan & Vrindavan',
    type: 'Vaishnav Festival',
    image: 'https://images.unsplash.com/photo-1587135991058-8816b028691f?q=80&w=1200',
    description:
      'Celebrates Lord Krishna lifting Govardhan Hill and the Annakut offering.',
    importance: 'High' as const,
    tags: ['Govardhan Hill', 'Annakut', 'Krishna Leela'],
  },

  {
    id: 'uf-3',
    name: 'Kartik Purnima',
    slug: 'kartik-purnima',
    date: 'November 15, 2024',
    month: 'Nov',
    day: '15',
    location: 'Yamuna Ghats, Vrindavan',
    type: 'Sacred Bath',
    image: 'https://images.unsplash.com/photo-1646303297330-17073f7823c3?q=80&w=1200',
    description:
      'Devotees take a holy dip in the Yamuna and light lamps.',
    importance: 'Medium' as const,
    tags: ['Yamuna Snan', 'Deepdaan', 'Kartik Maas'],
  },
];




export const blogs = [
  {
    id: 'banke-bihari-temple-guide',
    slug: 'banke-bihari-temple-guide',
    title: 'A Complete Guide to Banke Bihari Temple',
    author: 'Rahul Sharma',
    date: 'Jan 12, 2024',
    image:
      'https://images.unsplash.com/photo-1718169538846-6c4e3a2c1fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    excerpt:
      'Everything you need to know about Banke Bihari Temple — darshan timings, history, rituals, and essential tips for devotees.',
    tags: ['Temple', 'Vrindavan', 'Darshan'],
    readingTime: '5 min read',
  },
  {
    id: 'top-ashrams-vrindavan',
    slug: 'top-ashrams-vrindavan',
    title: 'Top 5 Ashrams to Stay in Vrindavan',
    author: 'Priya Singh',
    date: 'Feb 5, 2024',
    image:
      'https://images.unsplash.com/photo-1761472606347-bfebc5a3e546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    excerpt:
      'Experience spirituality with comfort. Here are the most peaceful and trusted ashrams to stay in Vrindavan.',
    tags: ['Stay', 'Ashram', 'Vrindavan'],
    readingTime: '4 min read',
  },
  {
    id: 'holi-in-braj-experience',
    slug: 'holi-in-braj-experience',
    title: 'Experiencing Holi in Braj: Colors of Devotion',
    author: 'Amit Verma',
    date: 'Mar 1, 2024',
    image:
      'https://images.unsplash.com/photo-1702943545400-ea5b75e3d32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    excerpt:
      'A vibrant journey through the divine Holi celebrations of Mathura and Vrindavan — where devotion meets color.',
    tags: ['Festival', 'Holi', 'Braj'],
    readingTime: '6 min read',
  },
];


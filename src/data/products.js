import mangoBox from '../assets/images/mango-box.jpg';
import mangoClose from '../assets/images/mango-close.jpg';
import farmHero from '../assets/images/farm-hero.jpg';

export const products = [
  {
    id: 1,
    name: 'Premium Mangoes',
    description: 'Sweet, juicy, and hand-picked at peak ripeness. The taste of summer in every bite.',
    price: 45,
    unit: 'kg',
    image: mangoClose,
    season: 'current'
  },
  {
    id: 2,
    name: 'Family Box',
    description: 'A 5kg box of our finest mixed mango varieties. Perfect for sharing with family.',
    price: 200,
    unit: 'box',
    image: mangoBox,
    season: 'current'
  },
  {
    id: 3,
    name: 'Organic Lemons',
    description: 'Zesty and full of juice. Grown without any pesticides for pure flavor.',
    price: 20,
    unit: 'kg',
    image: farmHero, // Placeholder
    season: 'current'
  },
  {
    id: 4,
    name: 'Pomegranates',
    description: 'Ruby red seeds bursting with antioxidants and sweet-tart flavor.',
    price: 35,
    unit: 'kg',
    image: farmHero, // Placeholder
    season: 'upcoming'
  },
  {
    id: 5,
    name: 'Navel Oranges',
    description: 'Classic winter citrus. Easy to peel, seedless, and incredibly sweet.',
    price: 15,
    unit: 'kg',
    image: farmHero, // Placeholder
    season: 'upcoming'
  },
  {
    id: 6,
    name: 'Strawberries',
    description: 'Red, ripe, and ready to eat. The perfect balance of sweet and tart.',
    price: 60,
    unit: 'kg',
    image: farmHero, // Placeholder
    season: 'upcoming'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    review: 'The mangoes are absolutely incredible! So sweet and fresh, unlike anything in the supermarket.',
    avatar: 'https://i.pravatar.cc/150?u=1',
    platform: 'facebook'
  },
  {
    id: 2,
    name: 'Mohamed Ali',
    review: 'Fast delivery and great packaging. The fruits arrived in perfect condition. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=2',
    platform: 'instagram'
  },
  {
    id: 3,
    name: 'Nour Hassan',
    review: 'I love knowing exactly where my food comes from. Moslimani Farm is my go-to for fresh fruits.',
    avatar: 'https://i.pravatar.cc/150?u=3',
    platform: 'facebook'
  }
];

import mangoBox from '../assets/images/mango-box.jpg';
import mangoClose from '../assets/images/mango-close.jpg';
import farmHero from '../assets/images/farm-hero.jpg';

export const products = [
  {
    id: 1,
    name: 'Premium Mangoes',
    nameAr: 'مانجو عويس',
    description: 'Sweet, juicy, and hand-picked at peak ripeness. The taste of summer in every bite.',
    descriptionAr: 'مانجو عويس درجة أولى، مسكرة ومرملة، مقطوفة في وقتها عشان تديك أحلى طعم.',
    price: 45,
    unit: 'kg',
    unitAr: 'كجم',
    image: mangoClose,
    season: 'current'
  },
  {
    id: 2,
    name: 'Family Box',
    nameAr: 'صندوق العيلة',
    description: 'A 5kg box of our finest mixed mango varieties. Perfect for sharing with family.',
    descriptionAr: 'صندوق 5 كيلو مشكل من أحلى أنواع المانجو. يكفي العيلة كلها.',
    price: 200,
    unit: 'box',
    unitAr: 'صندوق',
    image: mangoBox,
    season: 'current'
  },
  {
    id: 3,
    name: 'Organic Lemons',
    nameAr: 'ليمون بلدي',
    description: 'Zesty and full of juice. Grown without any pesticides for pure flavor.',
    descriptionAr: 'ليمون بلدي مليان مية، مزروع طبيعي من غير كيماويات.',
    price: 20,
    unit: 'kg',
    unitAr: 'كجم',
    image: farmHero, // Placeholder
    season: 'current'
  },
  {
    id: 4,
    name: 'Pomegranates',
    nameAr: 'رمان منفلوطي',
    description: 'Ruby red seeds bursting with antioxidants and sweet-tart flavor.',
    descriptionAr: 'حبوب حمراء زي الياقوت، طعم مسكر ومفيد جداً للصحة.',
    price: 35,
    unit: 'kg',
    unitAr: 'كجم',
    image: farmHero, // Placeholder
    season: 'upcoming'
  },
  {
    id: 5,
    name: 'Navel Oranges',
    nameAr: 'برتقال بسرة',
    description: 'Classic winter citrus. Easy to peel, seedless, and incredibly sweet.',
    descriptionAr: 'برتقال شتوي، سهل التقشير ومن غير بذر، وطعمه مسكر جداً.',
    price: 15,
    unit: 'kg',
    unitAr: 'كجم',
    image: farmHero, // Placeholder
    season: 'upcoming'
  },
  {
    id: 6,
    name: 'Strawberries',
    nameAr: 'فراولة',
    description: 'Red, ripe, and ready to eat. The perfect balance of sweet and tart.',
    descriptionAr: 'فراولة حمراء وطازة، طعمها يجنن.',
    price: 60,
    unit: 'kg',
    unitAr: 'كجم',
    image: farmHero, // Placeholder
    season: 'upcoming'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    nameAr: 'سارة أحمد',
    review: 'The mangoes are absolutely incredible! So sweet and fresh, unlike anything in the supermarket.',
    reviewAr: 'المانجو تحفة بجد! مسكرة وطازة جداً، غير أي حاجة في السوق.',
    avatar: 'https://i.pravatar.cc/150?u=1',
    platform: 'facebook'
  },
  {
    id: 2,
    name: 'Mohamed Ali',
    nameAr: 'محمد علي',
    review: 'Fast delivery and great packaging. The fruits arrived in perfect condition. Highly recommended!',
    reviewAr: 'توصيل سريع وتغليف ممتاز. الفاكهة وصلت سليمة وطازة. أنصح بيهم جداً!',
    avatar: 'https://i.pravatar.cc/150?u=2',
    platform: 'instagram'
  },
  {
    id: 3,
    name: 'Nour Hassan',
    nameAr: 'نور حسن',
    review: 'I love knowing exactly where my food comes from. Moslimani Farm is my go-to for fresh fruits.',
    reviewAr: 'بحب جداً إني عارفة مصدر أكلي. مزرعة مسلماني هي اختياري الأول للفاكهة الطازة.',
    avatar: 'https://i.pravatar.cc/150?u=3',
    platform: 'facebook'
  }
];

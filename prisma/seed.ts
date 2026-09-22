import { PrismaClient, PricingType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@peartrails.com' },
    update: {},
    create: {
      email: 'admin@peartrails.com',
      password: hashedPassword,
    },
  });
  console.log('Admin seeded:', admin.email);

  const categoryData = [
    { name: 'Cultural Tours', slug: 'cultural' },
    { name: 'Honeymoon', slug: 'honeymoon' },
    { name: 'Adventure', slug: 'adventure' },
    { name: 'Luxury', slug: 'luxury' },
    { name: 'Family', slug: 'family' },
    { name: 'Beach', slug: 'beach' },
  ];

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories seeded');

  const destinationsData = [
    {
      name: 'Sigiriya',
      country: 'Sri Lanka',
      image: 'https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?w=800&q=80',
      description: 'Ancient rock fortress rising 200m above the jungle — a UNESCO World Heritage wonder',
      latitude: 7.9572,
      longitude: 80.7603,
      attractions: ['Sigiriya Rock', 'Lion Rock Frescoes', 'Water Gardens', 'Pidurangala Rock', 'Dambulla Cave Temple'],
    },
    {
      name: 'Kandy',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=800&q=80',
      description: 'Highland capital home to the sacred Temple of the Tooth and misty green hills',
      latitude: 7.2906,
      longitude: 80.6337,
      attractions: ['Temple of the Tooth', 'Kandy Lake', 'Royal Botanical Gardens', 'Esala Perahera', 'Udawatta Kele Sanctuary'],
    },
    {
      name: 'Galle',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1704797390682-76479a29dc9a?w=800&q=80',
      description: 'Dutch colonial fort town on the southern tip with boutique charm and ocean views',
      latitude: 6.0535,
      longitude: 80.2210,
      attractions: ['Galle Dutch Fort', 'Lighthouse', 'Unawatuna Beach', 'Jungle Beach', 'Maritime Museum'],
    },
    {
      name: 'Ella',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80',
      description: "Misty tea country village with the iconic Nine Arch Bridge and the world's most scenic train ride",
      latitude: 6.8667,
      longitude: 81.0466,
      attractions: ["Nine Arch Bridge", "Little Adam's Peak", 'Ella Rock', 'Ravana Falls', 'Tea Factory Tour'],
    },
    {
      name: 'Mirissa',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1734279135115-6d8984e08206?w=800&q=80',
      description: 'Blue whale capital of the world — pristine beaches and turquoise Indian Ocean waters',
      latitude: 5.9483,
      longitude: 80.4589,
      attractions: ['Whale Watching', 'Mirissa Beach', 'Parrot Rock', 'Coconut Hill', 'Secret Beach'],
    },
    {
      name: 'Yala',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1661768508643-e260f6f8e06c?w=800&q=80',
      description: "Sri Lanka's premier wildlife park with the world's highest density of wild leopards",
      latitude: 6.3728,
      longitude: 81.5170,
      attractions: ['Leopard Safaris', 'Elephant Herds', 'Crocodile Lagoons', 'Flamingo Flocks', 'Coastal Dunes'],
    },
    {
      name: 'Trincomalee',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1640036293568-452ba4463fce?w=800&q=80',
      description: 'Pristine east coast harbour with powder-white beaches and world-class diving reefs',
      latitude: 8.5874,
      longitude: 81.2152,
      attractions: ['Nilaveli Beach', 'Pigeon Island', 'Koneswaram Temple', 'Whale Watching', 'Hot Springs'],
    },
    {
      name: 'Nuwara Eliya',
      country: 'Sri Lanka',
      image: 'https://images.unsplash.com/photo-1585171328560-947fbd92d6f0?w=800&q=80',
      description: "Sri Lanka's \"Little England\" — rolling tea estates, colonial bungalows, and cool mountain air",
      latitude: 6.9497,
      longitude: 80.7891,
      attractions: ['Tea Plantation Tours', 'Gregory Lake', 'Horton Plains', "World's End", 'Pedro Tea Estate'],
    },
  ];

  for (const dest of destinationsData) {
    await prisma.destination.upsert({
      where: { id: dest.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: { id: dest.name.toLowerCase().replace(/\s+/g, '-'), ...dest },
    });
  }
  console.log('Destinations seeded');

  const cultural = await prisma.category.findUnique({ where: { slug: 'cultural' } });
  const honeymoon = await prisma.category.findUnique({ where: { slug: 'honeymoon' } });
  const adventure = await prisma.category.findUnique({ where: { slug: 'adventure' } });
  const luxury = await prisma.category.findUnique({ where: { slug: 'luxury' } });

  const packagesData = [
    {
      id: 'ultimate-sri-lanka',
      title: 'The Ultimate Sri Lanka Journey',
      destination: 'Island-Wide',
      country: 'Sri Lanka',
      duration: '7 Days / 6 Nights',
      pricingType: PricingType.FIXED,
      price: 1199,
      currency: 'USD',
      image: 'https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?w=800&q=80',
      gallery: [
        'https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?w=800&q=80',
        'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80',
        'https://images.unsplash.com/photo-1661768508643-e260f6f8e06c?w=800&q=80',
      ],
      rating: 4.9,
      reviews: 428,
      description: 'Perfect for first-time visitors seeking a complete Sri Lankan experience.',
      itinerary: [
        { day: 1, title: 'Negombo — Arrival', description: 'Private airport pickup in Negombo.' },
        { day: 2, title: 'Sigiriya — Ancient Rock Fortress', description: 'Drive to the Cultural Triangle.' },
        { day: 3, title: 'Kandy — Cultural Capital', description: 'Scenic drive to Kandy.' },
        { day: 4, title: 'Nuwara Eliya — Little England', description: 'Drive through misty highland roads.' },
        { day: 5, title: "Ella — Scenic Train & Nine Arch Bridge", description: 'Board the legendary Kandy–Ella scenic train.' },
        { day: 6, title: 'Yala — Wildlife Safari', description: 'Drive to Yala National Park.' },
        { day: 7, title: 'Mirissa → Galle → Colombo Departure', description: 'Morning whale and dolphin watching.' },
      ],
      inclusions: ['6 nights accommodation', 'Daily breakfast', 'Private airport transfers'],
      exclusions: ['International flights', 'Travel insurance'],
      highlights: ['Ancient UNESCO Heritage Sites', 'Scenic Train Experience', 'Wildlife Safari'],
      bestTimeToVisit: 'November to April',
      isFeatured: true,
      isBestSeller: true,
      categories: cultural ? [cultural.id] : [],
    },
    {
      id: 'luxury-honeymoon',
      title: 'Luxury Honeymoon Collection',
      destination: 'Island-Wide',
      country: 'Sri Lanka',
      duration: '8 Days / 7 Nights',
      pricingType: PricingType.FIXED,
      price: 1999,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=800&q=80',
        'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80',
      ],
      rating: 4.9,
      reviews: 276,
      description: 'Celebrate love in paradise with our Luxury Honeymoon Collection.',
      itinerary: [{ day: 1, title: 'Arrival & Romantic Welcome', description: 'Private chauffeur pickup.' }],
      inclusions: ['7 nights boutique & luxury hotels', 'Daily breakfast'],
      exclusions: ['International flights', 'Travel insurance'],
      highlights: ['Private Transfers Throughout', 'Romantic Beach Stay'],
      bestTimeToVisit: 'December to March',
      isFeatured: true,
      isBestSeller: false,
      discount: 10,
      categories: honeymoon ? [honeymoon.id] : [],
    },
    {
      id: 'airport-transfers',
      title: 'Premium Airport Transfer Services',
      destination: 'Island-Wide',
      country: 'Sri Lanka',
      duration: 'Same Day',
      pricingType: PricingType.FIXED,
      price: 50,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1546656495-fc838de15e5c?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1546656495-fc838de15e5c?w=800&q=80'],
      rating: 4.8,
      reviews: 534,
      description: 'Arrive in Sri Lanka with complete peace of mind.',
      itinerary: [{ day: 1, title: 'Meet & Greet at Arrival', description: 'Your professional chauffeur meets you.' }],
      inclusions: ['Meet & Greet at arrivals', 'Private air-conditioned vehicle'],
      exclusions: ['International flights', 'Meals and refreshments'],
      highlights: ['Meet & Greet at Arrival', 'Professional Chauffeurs'],
      bestTimeToVisit: 'Year-Round',
      isFeatured: false,
      isBestSeller: true,
      categories: luxury ? [luxury.id] : [],
    },
    {
      id: 'customized-tours',
      title: 'Customized Tours — Designed Around You',
      destination: 'Island-Wide',
      country: 'Sri Lanka',
      duration: 'Flexible Duration',
      pricingType: PricingType.RANGE,
      priceMin: 499,
      priceMax: 2500,
      currency: 'USD',
      image: 'https://images.unsplash.com/photo-1533484482814-3fe2d922be89?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1533484482814-3fe2d922be89?w=800&q=80'],
      rating: 4.9,
      reviews: 189,
      description: 'Not every traveler fits into a standard package — fully customized travel planning.',
      itinerary: [{ day: 1, title: 'Culture & History', description: 'Explore ancient kingdoms.' }],
      inclusions: ['Fully customized itinerary', 'Private air-conditioned vehicle'],
      exclusions: ['International flights', 'Travel insurance'],
      highlights: ['Culture & History', 'Nature & Wildlife', 'Photography'],
      bestTimeToVisit: 'Year-Round',
      isFeatured: true,
      isBestSeller: false,
      categories: adventure ? [adventure.id] : [],
    },
  ];

  for (const pkg of packagesData) {
    const { categories, ...data } = pkg;
    await prisma.package.upsert({
      where: { id: pkg.id },
      update: {},
      create: {
        ...data,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    });
  }
  console.log('Packages seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

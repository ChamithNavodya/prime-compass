import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const [pkg, categories, destinations] = await Promise.all([
    prisma.package.findUnique({
      where: { id: params.id },
      include: { categories: true },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.destination.findMany({ orderBy: { name: 'asc' } }),
  ]);

  if (!pkg) notFound();

  const itinerary = Array.isArray(pkg.itinerary)
    ? pkg.itinerary as { day: number; title: string; description: string }[]
    : [];

  const route = Array.isArray(pkg.route)
    ? pkg.route as { id: string; label: string; lat: number; lng: number; destinationId?: string }[]
    : [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Package</h1>
        <p className="text-gray-500 mt-1">{pkg.title}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <PackageForm
          categories={categories}
          destinations={destinations}
          initial={{
            id: pkg.id,
            title: pkg.title,
            destination: pkg.destination,
            country: pkg.country,
            duration: pkg.duration,
            pricingType: pkg.pricingType as 'FIXED' | 'RANGE' | 'HIDDEN',
            price: pkg.price,
            priceMin: pkg.priceMin,
            priceMax: pkg.priceMax,
            currency: pkg.currency,
            image: pkg.image,
            gallery: pkg.gallery,
            description: pkg.description,
            itinerary,
            inclusions: pkg.inclusions,
            exclusions: pkg.exclusions,
            highlights: pkg.highlights,
            bestTimeToVisit: pkg.bestTimeToVisit ?? '',
            isFeatured: pkg.isFeatured,
            isBestSeller: pkg.isBestSeller ?? false,
            discount: pkg.discount,
            categoryIds: pkg.categories.map((c) => c.id),
            destinationId: pkg.destinationId,
            route,
          }}
        />
      </div>
    </div>
  );
}

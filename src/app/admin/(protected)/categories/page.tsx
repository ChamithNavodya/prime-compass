import { prisma } from '@/lib/prisma';
import CategoriesClient from './CategoriesClient';

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { packages: true } } },
  });

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Package Categories</h1>
        <p className="text-gray-500 mt-1">Manage categories used to organise and filter packages</p>
      </div>
      <CategoriesClient initial={categories} />
    </div>
  );
}

import { prisma } from '@/lib/prisma';
import PackageForm from '@/components/admin/PackageForm';

export default async function NewPackagePage() {
  const [categories, destinations] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.destination.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Package</h1>
        <p className="text-gray-500 mt-1">Create a new travel package</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <PackageForm categories={categories} destinations={destinations} />
      </div>
    </div>
  );
}

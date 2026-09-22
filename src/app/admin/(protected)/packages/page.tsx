import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
    include: { categories: true },
  });

  function priceDisplay(pkg: typeof packages[0]) {
    if (pkg.pricingType === 'HIDDEN') return 'Contact for pricing';
    if (pkg.pricingType === 'RANGE') return `$${pkg.priceMin} – $${pkg.priceMax}`;
    return `$${pkg.price}`;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-500 mt-1">{packages.length} package{packages.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/packages/new"
          className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors">
          + Add Package
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-400 mb-4">No packages yet</p>
          <Link href="/admin/packages/new" className="text-emerald-600 font-medium text-sm hover:text-emerald-700">
            Add your first package →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Package</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categories</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Flags</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pkg.image} alt="" className="w-12 h-10 object-cover rounded-lg" />
                      <div>
                        <p className="font-medium text-sm text-gray-900 line-clamp-1">{pkg.title}</p>
                        <p className="text-xs text-gray-400">{pkg.destination}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pkg.categories.map((c) => (
                        <span key={c.id} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{c.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pkg.duration}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{priceDisplay(pkg)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {pkg.isFeatured && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Featured</span>}
                      {pkg.isBestSeller && <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">Best Seller</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/packages/${pkg.id}/edit`}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Edit</Link>
                      <DeleteButton
                        id={pkg.id}
                        endpoint="/api/admin/packages"
                        confirmMessage={`Delete "${pkg.title}"? This cannot be undone.`}
                        label="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

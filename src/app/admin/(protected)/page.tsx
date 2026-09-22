import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [destinationCount, packageCount, categoryCount] = await Promise.all([
    prisma.destination.count(),
    prisma.package.count(),
    prisma.category.count(),
  ]);

  const recentPackages = await prisma.package.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { categories: true },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Destinations"
          value={destinationCount}
          href="/admin/destinations"
          color="emerald"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />}
        />
        <StatCard
          label="Packages"
          value={packageCount}
          href="/admin/packages"
          color="blue"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
        />
        <StatCard
          label="Categories"
          value={categoryCount}
          href="/admin/categories"
          color="purple"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Packages</h2>
          <Link href="/admin/packages/new" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            + Add new
          </Link>
        </div>
        <div className="divide-y">
          {recentPackages.length === 0 ? (
            <p className="px-6 py-8 text-center text-gray-400 text-sm">No packages yet.</p>
          ) : (
            recentPackages.map((pkg) => (
              <div key={pkg.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{pkg.title}</p>
                  <div className="flex gap-1.5 mt-1">
                    {pkg.categories.map((cat) => (
                      <span key={cat.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{pkg.duration}</span>
                  <Link
                    href={`/admin/packages/${pkg.id}/edit`}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, href, color, icon,
}: {
  label: string;
  value: number;
  href: string;
  color: 'emerald' | 'blue' | 'purple';
  icon: React.ReactNode;
}) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <Link href={href} className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

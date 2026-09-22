import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({ orderBy: { name: 'asc' } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
          <p className="text-gray-500 mt-1">{destinations.length} destination{destinations.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors"
        >
          + Add Destination
        </Link>
      </div>

      {destinations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-400 mb-4">No destinations yet</p>
          <Link href="/admin/destinations/new" className="text-emerald-600 font-medium text-sm hover:text-emerald-700">
            Add your first destination →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                {dest.latitude && dest.longitude && (
                  <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Pinned
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{dest.country}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{dest.description}</p>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/admin/destinations/${dest.id}/edit`}
                    className="flex-1 text-center py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    id={dest.id}
                    label="Delete"
                    endpoint="/api/admin/destinations"
                    confirmMessage={`Delete "${dest.name}"? This cannot be undone.`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

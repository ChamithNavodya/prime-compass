import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DestinationForm from '@/components/admin/DestinationForm';

export default async function EditDestinationPage({ params }: { params: { id: string } }) {
  const destination = await prisma.destination.findUnique({ where: { id: params.id } });
  if (!destination) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Destination</h1>
        <p className="text-gray-500 mt-1">{destination.name}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <DestinationForm
          initial={{
            id: destination.id,
            name: destination.name,
            country: destination.country,
            image: destination.image,
            description: destination.description,
            latitude: destination.latitude,
            longitude: destination.longitude,
            attractions: destination.attractions,
          }}
        />
      </div>
    </div>
  );
}

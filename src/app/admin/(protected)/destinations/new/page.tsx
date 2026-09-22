import DestinationForm from '@/components/admin/DestinationForm';

export default function NewDestinationPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Destination</h1>
        <p className="text-gray-500 mt-1">Create a new destination for your packages</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <DestinationForm />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ImageUploader from './ImageUploader';

const MapPicker = dynamic(() => import('./MapPicker'), { ssr: false });

interface FormState {
  id?: string;
  name: string;
  country: string;
  image: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  attractions: string[];
}

interface DestinationFormProps {
  initial?: FormState;
}

const DEFAULT: FormState = {
  name: '',
  country: 'Sri Lanka',
  image: '',
  description: '',
  latitude: null,
  longitude: null,
  attractions: [],
};

export default function DestinationForm({ initial }: DestinationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial ?? DEFAULT);
  const [attractionInput, setAttractionInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field: string, value: unknown) {
    setForm((f) => ({ ...f!, [field]: value } as FormState));
  }

  function addAttraction() {
    const trimmed = attractionInput.trim();
    if (!trimmed) return;
    set('attractions', [...form.attractions, trimmed]);
    setAttractionInput('');
  }

  function removeAttraction(i: number) {
    set('attractions', form.attractions.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = form.id ? `/api/admin/destinations/${form.id}` : '/api/admin/destinations';
    const method = form.id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/destinations');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            placeholder="e.g. Sigiriya"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <input
            required
            value={form.country}
            onChange={(e) => set('country', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
          placeholder="Short description shown on hover and listing pages..."
        />
      </div>

      <ImageUploader
        label="Cover Image *"
        value={form.image}
        onChange={(url) => set('image', url)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location on Map</label>
        <MapPicker
          lat={form.latitude}
          lng={form.longitude}
          onChange={(lat, lng) => setForm((f) => ({ ...f, latitude: lat, longitude: lng }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Top Attractions</label>
        <div className="flex gap-2 mb-3">
          <input
            value={attractionInput}
            onChange={(e) => setAttractionInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAttraction(); } }}
            placeholder="e.g. Sigiriya Rock Fortress"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button
            type="button"
            onClick={addAttraction}
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.attractions.map((a, i) => (
            <span key={i} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
              {a}
              <button
                type="button"
                onClick={() => removeAttraction(i)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
          {form.attractions.length === 0 && (
            <p className="text-sm text-gray-400">No attractions added yet</p>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-60"
        >
          {saving ? 'Saving...' : form.id ? 'Update Destination' : 'Create Destination'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import { RouteWaypoint } from '@/types/db';
import type { DestOption } from './RoutePlanner';

const RoutePlanner = dynamic(() => import('./RoutePlanner'), { ssr: false });

interface Category { id: string; name: string; }
interface Destination { id: string; name: string; country: string; latitude: number | null; longitude: number | null; }
interface ItineraryItem { day: number; title: string; description: string; }

interface FormState {
  id?: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  pricingType: 'FIXED' | 'RANGE' | 'HIDDEN';
  price: number | null;
  priceMin: number | null;
  priceMax: number | null;
  currency: string;
  image: string;
  gallery: string[];
  description: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  bestTimeToVisit: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  discount: number | null;
  categoryIds: string[];
  destinationId: string | null;
  route: RouteWaypoint[];
}

interface PackageFormProps {
  categories: Category[];
  destinations: Destination[];
  initial?: FormState;
}

const DEFAULT: FormState = {
  title: '',
  destination: 'Island-Wide',
  country: 'Sri Lanka',
  duration: '',
  pricingType: 'FIXED',
  price: null,
  priceMin: null,
  priceMax: null,
  currency: 'USD',
  image: '',
  gallery: [],
  description: '',
  itinerary: [],
  inclusions: [],
  exclusions: [],
  highlights: [],
  bestTimeToVisit: '',
  isFeatured: false,
  isBestSeller: false,
  discount: null,
  categoryIds: [],
  destinationId: null,
  route: [],
};

export default function PackageForm({ categories, destinations, initial }: PackageFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initial ?? DEFAULT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // list inputs
  const [inclusionInput, setInclusionInput] = useState('');
  const [exclusionInput, setExclusionInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  // itinerary
  const [itin, setItin] = useState({ title: '', description: '' });

  function set(field: string, value: unknown) {
    setForm((f) => ({ ...f, [field]: value } as FormState));
  }

  function addToList(field: keyof FormState, value: string, clear: () => void) {
    const trimmed = value.trim();
    if (!trimmed) return;
    set(field, [...(form[field] as string[]), trimmed]);
    clear();
  }

  function removeFromList(field: keyof typeof form, i: number) {
    set(field, (form[field] as string[]).filter((_, idx) => idx !== i));
  }

  function toggleCategory(id: string) {
    set(
      'categoryIds',
      form.categoryIds.includes(id)
        ? form.categoryIds.filter((c) => c !== id)
        : [...form.categoryIds, id]
    );
  }

  function addItinDay() {
    if (!itin.title.trim()) return;
    const day = form.itinerary.length + 1;
    set('itinerary', [...form.itinerary, { day, ...itin }]);
    setItin({ title: '', description: '' });
  }

  function removeItinDay(i: number) {
    const updated = form.itinerary.filter((_, idx) => idx !== i).map((d, idx) => ({ ...d, day: idx + 1 }));
    set('itinerary', updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = form.id ? `/api/admin/packages/${form.id}` : '/api/admin/packages';
    const method = form.id ? 'PUT' : 'POST';

    const payload = {
      ...form,
      price: form.pricingType === 'FIXED' ? form.price : null,
      priceMin: form.pricingType === 'RANGE' ? form.priceMin : null,
      priceMax: form.pricingType === 'RANGE' ? form.priceMax : null,
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/packages');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic info */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Title *</label>
            <input required value={form.title} onChange={(e) => set('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="e.g. The Ultimate Sri Lanka Journey" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Label</label>
            <input value={form.destination} onChange={(e) => set('destination', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="e.g. Island-Wide, Colombo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input value={form.country} onChange={(e) => set('country', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
            <input required value={form.duration} onChange={(e) => set('duration', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="e.g. 7 Days / 6 Nights" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
            <input value={form.bestTimeToVisit} onChange={(e) => set('bestTimeToVisit', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="e.g. November to April" />
          </div>
        </div>
      </section>

      {/* Route Planner */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-1 pb-2 border-b">Route Planner</h3>
        <p className="text-xs text-gray-400 mb-4">
          Build the route travellers will take — add stops from saved destinations or drop custom pins on the map.
        </p>
        <RoutePlanner
          waypoints={form.route}
          destinations={destinations as DestOption[]}
          onChange={(wps) => set('route', wps)}
        />
      </section>

      {/* Pricing */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Pricing</h3>
        <div className="flex gap-3 mb-4">
          {(['FIXED', 'RANGE', 'HIDDEN'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => set('pricingType', type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                form.pricingType === type
                  ? 'bg-emerald-600 text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-emerald-400'
              }`}
            >
              {type === 'FIXED' ? 'Fixed Price' : type === 'RANGE' ? 'Price Range' : 'Hidden / Contact'}
            </button>
          ))}
        </div>

        {form.pricingType === 'FIXED' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number" min="0" step="1"
                  value={form.price ?? ''}
                  onChange={(e) => set('price', e.target.value ? parseFloat(e.target.value) : null)}
                  required
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
              <input
                type="number" min="0" max="100"
                value={form.discount ?? ''}
                onChange={(e) => set('discount', e.target.value ? parseFloat(e.target.value) : null)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                placeholder="Optional"
              />
            </div>
          </div>
        )}

        {form.pricingType === 'RANGE' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={form.priceMin ?? ''} required
                  onChange={(e) => set('priceMin', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" min="0" value={form.priceMax ?? ''} required
                  onChange={(e) => set('priceMax', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
              </div>
            </div>
          </div>
        )}

        {form.pricingType === 'HIDDEN' && (
          <p className="text-sm text-gray-500 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
            Price will be hidden on the public site. Visitors will see &ldquo;Contact for pricing&rdquo;.
          </p>
        )}
      </section>

      {/* Categories */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                form.categoryIds.includes(cat.id)
                  ? 'bg-emerald-600 text-white'
                  : 'border border-gray-200 text-gray-600 hover:border-emerald-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-gray-400">No categories yet. <a href="/admin/categories" className="text-emerald-600 underline">Add some first.</a></p>
          )}
        </div>
      </section>

      {/* Images */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Images</h3>
        <ImageUploader label="Cover Image *" value={form.image} onChange={(url) => set('image', url)} />
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToList('gallery', galleryInput, () => setGalleryInput('')); } }}
              placeholder="https://..."
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button type="button" onClick={() => addToList('gallery', galleryInput, () => setGalleryInput(''))}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.gallery.map((url, i) => (
              <div key={i} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-20 w-28 object-cover rounded-lg" />
                <button type="button" onClick={() => removeFromList('gallery', i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Description</h3>
        <textarea rows={5} required value={form.description} onChange={(e) => set('description', e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
          placeholder="Full package description..." />
      </section>

      {/* Itinerary */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Itinerary</h3>
        <div className="space-y-3 mb-4">
          {form.itinerary.map((day, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="mt-0.5 min-w-[2rem] h-8 w-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                {day.day}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900">{day.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{day.description}</p>
              </div>
              <button type="button" onClick={() => removeItinDay(i)} className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none">×</button>
            </div>
          ))}
        </div>
        <div className="border border-dashed border-gray-200 rounded-xl p-4 space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Add Day {form.itinerary.length + 1}</p>
          <input value={itin.title} onChange={(e) => setItin((d) => ({ ...d, title: e.target.value }))}
            placeholder="Day title e.g. Sigiriya — Ancient Rock Fortress"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
          <textarea rows={2} value={itin.description} onChange={(e) => setItin((d) => ({ ...d, description: e.target.value }))}
            placeholder="Day description..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none" />
          <button type="button" onClick={addItinDay}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
            + Add Day
          </button>
        </div>
      </section>

      {/* Inclusions / Exclusions / Highlights */}
      {[
        { field: 'inclusions' as const, label: 'Inclusions', input: inclusionInput, setInput: setInclusionInput, placeholder: "e.g. Daily breakfast" },
        { field: 'exclusions' as const, label: 'Exclusions', input: exclusionInput, setInput: setExclusionInput, placeholder: "e.g. International flights" },
        { field: 'highlights' as const, label: 'Highlights', input: highlightInput, setInput: setHighlightInput, placeholder: "e.g. UNESCO Heritage Sites" },
      ].map(({ field, label, input, setInput, placeholder }) => (
        <section key={field}>
          <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">{label}</h3>
          <div className="flex gap-2 mb-3">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToList(field, input, () => setInput('')); } }}
              placeholder={placeholder}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
            <button type="button" onClick={() => addToList(field, input, () => setInput(''))}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Add</button>
          </div>
          <ul className="space-y-1.5">
            {(form[field] as string[]).map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-emerald-500">✓</span>
                <span className="flex-1">{item}</span>
                <button type="button" onClick={() => removeFromList(field, i)} className="text-gray-300 hover:text-red-400 text-lg leading-none">×</button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Flags */}
      <section>
        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">Display Flags</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600" />
            <span className="text-sm text-gray-700">Featured on homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isBestSeller} onChange={(e) => set('isBestSeller', e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600" />
            <span className="text-sm text-gray-700">Best Seller badge</span>
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

      <div className="flex gap-3 pt-2 sticky bottom-0 bg-white py-4 border-t -mx-8 px-8">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : form.id ? 'Update Package' : 'Create Package'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

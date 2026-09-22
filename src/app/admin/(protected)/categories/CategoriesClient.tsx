'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function ConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

function AlertModal({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Cannot Delete</h3>
        <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
        <button onClick={onClose} className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors">OK</button>
      </div>
    </div>
  );
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { packages: number };
}

export default function CategoriesClient({ initial }: { initial: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initial);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  async function addCategory() {
    if (!newName.trim()) return;
    setSaving(true);
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    });
    if (res.ok) {
      setNewName('');
      router.refresh();
      const data = await res.json();
      setCategories((prev) => [...prev, { ...data, _count: { packages: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
    }
    setSaving(false);
  }

  async function updateCategory(id: string) {
    if (!editingName.trim()) return;
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName.trim() }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: updated.name, slug: updated.slug } : c))
      );
      setEditingId(null);
    }
  }

  async function deleteCategory(id: string, name: string) {
    const cat = categories.find((c) => c.id === id);
    if (cat && cat._count.packages > 0) {
      setAlertMessage(`Cannot delete "${name}" — it has ${cat._count.packages} package(s) assigned to it.`);
      return;
    }
    setConfirmDelete({ id, name });
  }

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    const res = await fetch(`/api/admin/categories/${confirmDelete.id}`, { method: 'DELETE' });
    if (res.ok) setCategories((prev) => prev.filter((c) => c.id !== confirmDelete.id));
    setConfirmDelete(null);
  }

  return (
    <>
    {confirmDelete && (
      <ConfirmModal
        message={`Delete category "${confirmDelete.name}"? This cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    )}
    {alertMessage && (
      <AlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />
    )}
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Add New Category</h2>
        <div className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCategory(); } }}
            placeholder="e.g. Couple, Backpacker, Wellness..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          <button
            onClick={addCategory}
            disabled={saving || !newName.trim()}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60"
          >
            {saving ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">All Categories ({categories.length})</h2>
        </div>
        {categories.length === 0 ? (
          <p className="px-6 py-8 text-center text-gray-400 text-sm">No categories yet</p>
        ) : (
          <ul className="divide-y">
            {categories.map((cat) => (
              <li key={cat.id} className="px-6 py-4 flex items-center justify-between">
                {editingId === cat.id ? (
                  <div className="flex items-center gap-3 flex-1 mr-4">
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') updateCategory(cat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                    <button onClick={() => updateCategory(cat.id)} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-sm text-gray-400 hover:text-gray-600">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 text-sm">{cat.name}</span>
                    <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">{cat.slug}</span>
                    <span className="text-xs text-gray-400">{cat._count.packages} package{cat._count.packages !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {editingId !== cat.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                      className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id, cat.name)}
                      className="text-sm text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}

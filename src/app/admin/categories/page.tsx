'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, FolderTree } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { Category } from '@/types';

const iconOptions = ['Telescope', 'ScanLine', 'Scissors', 'HeartPulse', 'Package', 'Monitor', 'Stethoscope', 'Zap'];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', icon: 'Package' });

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = () => {
    setLoading(true);
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const resetForm = () => { setForm({ name: '', description: '', icon: 'Package' }); setEditing(null); };

  const openAdd = () => { resetForm(); setShowModal(true); };
  const openEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description, icon: cat.icon });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    const slug = form.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');

    try {
      if (editing) {
        await fetch(`/api/categories/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, slug }),
        });
      } else {
        await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, slug }),
        });
      }
      setShowModal(false);
      resetForm();
      loadCategories();
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await fetch(`/api/categories/${cat.id}`, { method: 'DELETE' });
      loadCategories();
    } catch { /* ignore */ }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">{categories.length} categories</p>
        </div>
        <Button variant="primary" onClick={openAdd}>
          <Plus size={18} /> Add Category
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <FolderTree size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No categories yet. Add your first category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Slug</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Icon</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Description</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-5 py-3 text-gray-500 font-mono text-xs">{cat.slug}</td>
                    <td className="px-5 py-3 text-gray-500">{cat.icon}</td>
                    <td className="px-5 py-3 text-gray-500 max-w-[200px] truncate">{cat.description}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(cat)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editing ? 'Edit Category' : 'Add Category'}>
        <div className="space-y-4">
          <Input label="Category Name" placeholder="e.g. Endoscopes" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <Input label="Description" placeholder="Brief description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400">
              {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button variant="primary" onClick={handleSave} loading={saving} className="flex-1">
              {editing ? 'Update' : 'Add'} Category
            </Button>
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

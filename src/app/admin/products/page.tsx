'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Package } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { TextArea } from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { Product, Category } from '@/types';
import { formatDateShort } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '', category: '', shortDescription: '', fullDescription: '',
    price: 'Price on Request', status: 'active' as const, featured: false,
    specifications: [{ key: '', value: '' }],
    images: [''],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ]).then(([prods, cats]) => {
      if (Array.isArray(prods)) setProducts(prods);
      if (Array.isArray(cats)) setCategories(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const resetForm = () => {
    setForm({
      name: '', category: '', shortDescription: '', fullDescription: '',
      price: 'Price on Request', status: 'active', featured: false,
      specifications: [{ key: '', value: '' }], images: [''],
    });
    setEditing(null);
  };

  const openAdd = () => { resetForm(); setShowModal(true); };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      category: product.category,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      price: product.price,
      status: product.status as 'active',
      featured: product.featured,
      specifications: product.specifications.length > 0 ? product.specifications : [{ key: '', value: '' }],
      images: product.images.length > 0 ? product.images : [''],
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category) return;
    setSaving(true);

    const slug = form.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
    const specs = form.specifications.filter((s) => s.key && s.value);
    const imgs = form.images.filter((i) => i);
    const catObj = categories.find((c) => c.name === form.category);

    const payload = {
      ...form,
      slug,
      categoryId: catObj?.id || '',
      specifications: specs,
      images: imgs,
    };

    try {
      if (editing) {
        await fetch(`/api/products/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setShowModal(false);
      resetForm();
      loadData();
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This action cannot be undone.`)) return;
    try {
      await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      loadData();
    } catch { /* ignore */ }
  };

  const addSpec = () => setForm((f) => ({ ...f, specifications: [...f.specifications, { key: '', value: '' }] }));
  const removeSpec = (i: number) => setForm((f) => ({ ...f, specifications: f.specifications.filter((_, idx) => idx !== i) }));
  const updateSpec = (i: number, field: 'key' | 'value', val: string) => {
    setForm((f) => ({
      ...f,
      specifications: f.specifications.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)),
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">{products.length} products total</p>
        </div>
        <Button variant="primary" onClick={openAdd}>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No products yet. Add your first product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Product</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Category</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Price</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Created</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg flex items-center justify-center text-primary-300 shrink-0">
                          <Package size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate max-w-[200px]">{p.name}</div>
                          {p.featured && <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded font-medium">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{p.category}</td>
                    <td className="px-5 py-3 text-gray-600">{p.price}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-5 py-3 text-gray-400">{formatDateShort(p.createdAt)}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-all cursor-pointer">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
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

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); resetForm(); }} title={editing ? 'Edit Product' : 'Add New Product'} maxWidth="max-w-2xl">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input label="Product Name" placeholder="e.g. HD Flexible Video Endoscope" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Category <span className="text-error">*</span></label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <Input label="Short Description" placeholder="Brief product overview" value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} />
          <TextArea label="Full Description" placeholder="Detailed product description" value={form.fullDescription} onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))} />
          <Input label="Price" placeholder="Price on Request" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'active' }))} className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} className="rounded" />
              Featured Product
            </label>
          </div>

          {/* Specifications */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Specifications</label>
              <button onClick={addSpec} className="text-xs text-primary-500 hover:text-primary-600 font-medium cursor-pointer">+ Add Spec</button>
            </div>
            <div className="space-y-2">
              {form.specifications.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input placeholder="Key" value={spec.key} onChange={(e) => updateSpec(i, 'key', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                  <input placeholder="Value" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                  {form.specifications.length > 1 && (
                    <button onClick={() => removeSpec(i)} className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"><X size={16} /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image URLs */}
          <div>
            <label className="text-sm font-medium text-gray-700">Image URLs</label>
            <div className="space-y-2 mt-1.5">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-2">
                  <input placeholder="https://..." value={img} onChange={(e) => {
                    const newImgs = [...form.images];
                    newImgs[i] = e.target.value;
                    setForm((f) => ({ ...f, images: newImgs }));
                  }} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                </div>
              ))}
              <button onClick={() => setForm((f) => ({ ...f, images: [...f.images, ''] }))} className="text-xs text-primary-500 hover:text-primary-600 font-medium cursor-pointer">+ Add Image URL</button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button variant="primary" onClick={handleSave} loading={saving} className="flex-1">
              {editing ? 'Update Product' : 'Add Product'}
            </Button>
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

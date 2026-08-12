'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Package } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setCategories(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('status', 'active');
    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) params.set('category', cat.name);
    }
    if (search) params.set('search', search);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory, search, categories]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#071033] via-[#102B7B] to-[#0a194b] text-white py-14 border-b border-[#F26522]/30 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#F26522]/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-black text-[#F26522] uppercase tracking-wider bg-orange-950 border border-[#F26522]/60 px-3.5 py-1.5 rounded-full">
            Official Equipment Catalog
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-3 mb-2 font-[var(--font-heading)]">
            Medical Equipment & Diagnostic Catalog
          </h1>
          <p className="text-slate-200 text-base max-w-2xl font-medium">
            Select any equipment to review detailed specifications or click &ldquo;Get Quote&rdquo; for official B2B pricing and WhatsApp assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search equipment by name, category, or spec..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:border-transparent font-bold text-[#102B7B]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
              <SlidersHorizontal size={18} className="text-slate-400 shrink-0 hidden sm:inline" />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                    !selectedCategory
                      ? 'bg-[#102B7B] text-white shadow-md shadow-[#102B7B]/30'
                      : 'bg-slate-100 text-[#102B7B] hover:bg-slate-200'
                  }`}
                >
                  All Categories
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat.slug
                        ? 'bg-[#F26522] text-white shadow-md shadow-orange-500/30'
                        : 'bg-slate-100 text-[#102B7B] hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                  <div className="h-10 bg-slate-200 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-black text-[#102B7B] uppercase tracking-wider">
                Showing {products.length} Equipment Unit{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-16 text-center">
            <Package size={56} className="mx-auto text-[#102B7B]/40 mb-4" />
            <h3 className="text-xl font-extrabold text-[#102B7B] mb-2">No matching equipment found</h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Try searching for a different medical term or reset category filters.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory(''); }}
              className="px-6 py-3 bg-[#F26522] text-white rounded-xl text-sm font-black hover:bg-orange-600 transition-colors shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 p-12 text-center text-slate-500">
        Loading Equipment Catalog...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

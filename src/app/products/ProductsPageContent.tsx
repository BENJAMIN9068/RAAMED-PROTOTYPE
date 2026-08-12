'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Package, Sparkles, ShieldCheck, Truck, Clock3 } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';

export default function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const pageContainer = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071033] via-[#102B7B] to-[#0a194b] py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F26522]/15 blur-[140px]" />

        <div className={pageContainer}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F26522]/50 bg-orange-950 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#F26522]">
                <Sparkles size={14} />
                Medical Equipment Catalog
              </div>

              <h1 className="max-w-2xl text-3xl font-black leading-tight text-white font-[var(--font-heading)] sm:text-4xl lg:text-5xl">
                Medical Equipment & Diagnostic Catalog
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Browse a clean, organized catalog of hospital-grade medical equipment. Search by name, filter by category, and open any product for details.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md">
                  <ShieldCheck size={16} className="text-[#F26522]" />
                  <span className="text-xs font-bold text-slate-100">ISO Certified</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md">
                  <Truck size={16} className="text-[#F26522]" />
                  <span className="text-xs font-bold text-slate-100">Pan-India Support</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-md">
                  <Clock3 size={16} className="text-[#F26522]" />
                  <span className="text-xs font-bold text-slate-100">Quick Quote</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto aspect-[4/3] max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#071033] shadow-2xl">
                <Image
                  src="/images/hero_doctor_team.png"
                  alt="TH Raamed medical team"
                  fill
                  priority
                  className="object-cover object-center opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#071033]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#071033]/75 px-4 py-3 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Products</p>
                    <p className="mt-1 text-sm font-black text-white">Featured Catalog</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071033]/75 px-4 py-3 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Spacing</p>
                    <p className="mt-1 text-sm font-black text-white">Clean Layout</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#071033]/75 px-4 py-3 backdrop-blur-md">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Style</p>
                    <p className="mt-1 text-sm font-black text-white">Modern B2B</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`${pageContainer} py-10`}>
        <div className="mb-8 rounded-[2rem] border-2 border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search equipment by name, category, or spec..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-10 text-sm font-bold text-[#102B7B] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#F26522]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-start gap-2 overflow-x-auto pb-1 lg:items-center lg:pb-0">
              <SlidersHorizontal size={18} className="hidden shrink-0 text-slate-400 sm:inline" />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-black transition-all ${
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
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                    className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-black transition-all ${
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

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-slate-200 bg-white animate-pulse">
                <div className="aspect-[4/3] bg-slate-200" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-full rounded bg-slate-200" />
                  <div className="h-3 w-2/3 rounded bg-slate-200" />
                  <div className="mt-4 h-10 rounded-xl bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-black uppercase tracking-wider text-[#102B7B]">
                Showing {products.length} Equipment Unit{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-[2rem] border-2 border-slate-200 bg-white p-10 text-center sm:p-16">
            <Package size={56} className="mx-auto mb-4 text-[#102B7B]/40" />
            <h3 className="mb-2 text-xl font-extrabold text-[#102B7B]">No matching equipment found</h3>
            <p className="mb-6 text-sm font-medium text-slate-500">
              Try searching for a different medical term or reset category filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[#F26522] px-6 py-3 text-sm font-black text-white shadow-md transition-colors hover:bg-orange-600"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

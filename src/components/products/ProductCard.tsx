'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import GetQuoteModal from '@/components/lead/GetQuoteModal';
import { Product } from '@/types';
import { truncate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const imageSrc = product.images && product.images.length > 0 && product.images[0]
    ? product.images[0]
    : '/images/hero_doctor_team.png';

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F26522]/50 hover:shadow-2xl animate-card-rise">
        
        {/* Product Image */}
        <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#071033]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071033]/90 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-[#102B7B]/90 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 rounded-full shadow-md">
              {product.category}
            </span>
          </div>

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 bg-[#F26522] text-[10px] font-black text-white rounded-full flex items-center gap-1 shadow-md">
                <Sparkles size={12} /> Top Seller
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 bg-white p-6">
          <Link href={`/products/${product.slug}`}>
            <h3 className="mb-2 line-clamp-2 text-base font-extrabold leading-snug text-[#102B7B] transition-colors group-hover:text-[#F26522] font-[var(--font-heading)]">
              {product.name}
            </h3>
          </Link>

          <p className="flex-1 text-xs font-medium leading-relaxed text-slate-500">
            {truncate(product.shortDescription, 110)}
          </p>

          {/* Specifications Preview */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              {product.specifications.slice(0, 2).map((spec, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-[11px]">
                  <span className="text-slate-400 font-semibold">{spec.key}:</span>
                  <span className="max-w-[140px] truncate text-right font-extrabold text-[#102B7B]">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Card Actions */}
          <div className="mt-auto flex items-stretch gap-2 pt-1">
            <Button
              variant="orange"
              size="sm"
              className="flex-1 justify-center !rounded-xl !py-2.5 !text-xs shadow-sm hover:shadow-md"
              onClick={() => setShowQuoteModal(true)}
            >
              Get Quote
            </Button>

            <Link
              href={`/products/${product.slug}`}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 p-2.5 text-xs font-bold text-[#102B7B] transition-all hover:border-[#F26522] hover:bg-orange-50 hover:text-[#F26522]"
              title="View Details"
            >
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

      </div>

      <GetQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={product.name}
        productId={product.id}
        sourcePage="catalog"
      />
    </>
  );
}

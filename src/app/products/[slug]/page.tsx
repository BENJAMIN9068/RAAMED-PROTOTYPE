'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import GetQuoteModal from '@/components/lead/GetQuoteModal';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setProduct(data);
          // Fetch related products
          fetch(`/api/products?category=${encodeURIComponent(data.category)}&status=active`)
            .then((res) => res.json())
            .then((related) => {
              if (Array.isArray(related)) {
                setRelatedProducts(related.filter((p: Product) => p.id !== data.id).slice(0, 4));
              }
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-[calc(2rem+4.5rem)] min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-100 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 rounded w-1/3" />
              <div className="h-8 bg-gray-100 rounded w-2/3" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-12 bg-gray-100 rounded w-1/2 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-[calc(2rem+4.5rem)] min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products">
            <Button variant="primary">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="pt-[calc(2rem+4.5rem)] min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-500 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>

        {/* Product detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl overflow-hidden mb-4 relative">
              {hasImages ? (
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-primary-300">
                  <Package size={80} strokeWidth={1} />
                  <span className="text-sm mt-3 font-medium">Product Image</span>
                </div>
              )}

              {hasImages && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-all cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-all cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {hasImages && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      i === activeImageIndex ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
              {product.fullDescription || product.shortDescription}
            </p>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <span className="text-sm text-gray-500">Price</span>
              <div className="text-xl font-bold text-primary-600">{product.price || 'Price on Request'}</div>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto mb-8"
              onClick={() => setShowQuoteModal(true)}
            >
              Get Quote for {product.name}
            </Button>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-600 w-2/5 border-r border-gray-100">
                            {spec.key}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-800">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <GetQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={product.name}
        productId={product.id}
        sourcePage={`product-${product.slug}`}
      />
    </div>
  );
}

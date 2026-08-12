// In-memory data store for prototype (no Firebase needed)
// Data persists only while the dev server is running

import { Product, Lead, Category, AnalyticsData } from '@/types';
import { seedProducts, seedCategories } from '@/seed/data';

// Pre-seed categories with IDs
const initialCategories: Category[] = seedCategories.map((cat, i) => ({
  ...cat,
  id: `cat-${i + 1}`,
}));

// Pre-seed products with IDs and category IDs
const initialProducts: Product[] = seedProducts.map((prod, i) => {
  const cat = initialCategories.find((c) => c.name === prod.category);
  return {
    ...prod,
    id: `prod-${i + 1}`,
    categoryId: cat?.id || '',
  };
});

// Pre-seed analytics
const initialAnalytics: AnalyticsData[] = initialProducts.map((p) => ({
  productId: p.id,
  productName: p.name,
  quoteClicks: p.quoteClicks,
}));

// ── In-memory stores ──
let products: Product[] = [...initialProducts];
let categories: Category[] = [...initialCategories];
let leads: Lead[] = [
  // Some sample leads for prototype
  {
    id: 'lead-1',
    name: 'Dr. Suresh Patel',
    phone: '+91 98765 11111',
    email: 'suresh.patel@cityhospital.com',
    address: 'Mumbai, Maharashtra',
    productName: 'Portable Ultrasound Scanner ProScan U60',
    productId: 'prod-4',
    sourcePage: 'product-detail',
    status: 'New',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Dr. Anjali Mehta',
    phone: '+91 98765 22222',
    email: 'anjali@sharmaclinic.in',
    address: 'Pune, Maharashtra',
    productName: 'Digital X-Ray System DR-500',
    productId: 'prod-3',
    sourcePage: 'catalog',
    status: 'Contacted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Rajiv Kumar',
    phone: '+91 98765 33333',
    email: 'rajiv@lifecare.org',
    address: 'Delhi',
    productName: 'Multi-Parameter Patient Monitor PM-8000',
    productId: 'prod-7',
    sourcePage: 'home',
    status: 'Converted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'lead-4',
    name: 'Dr. Priya Sharma',
    phone: '+91 98765 44444',
    email: 'priya.sharma@diagnostics.com',
    address: 'Bangalore, Karnataka',
    productName: 'HD Flexible Video Endoscope',
    productId: 'prod-1',
    sourcePage: 'catalog',
    status: 'New',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'lead-5',
    name: 'Anil Verma',
    phone: '+91 98765 55555',
    email: 'anil.verma@medplus.in',
    address: 'Hyderabad, Telangana',
    productName: 'Electrosurgical Unit ESU-400',
    productId: 'prod-5',
    sourcePage: 'product-detail',
    status: 'New',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];
let analytics: AnalyticsData[] = [...initialAnalytics];
let idCounter = 100;

function nextId(prefix: string) {
  return `${prefix}-${++idCounter}`;
}

// ── Products API ──
export function getProducts(filters?: { category?: string; search?: string; featured?: string; status?: string }) {
  let result = [...products];
  if (filters?.category) result = result.filter((p) => p.category === filters.category);
  if (filters?.status) result = result.filter((p) => p.status === filters.status);
  if (filters?.featured === 'true') result = result.filter((p) => p.featured);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(s) || p.shortDescription.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
    );
  }
  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug);
}

export function createProduct(data: Partial<Product>): Product {
  const product: Product = {
    id: nextId('prod'),
    name: data.name || '',
    slug: data.slug || data.name?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') || '',
    category: data.category || '',
    categoryId: data.categoryId || '',
    shortDescription: data.shortDescription || '',
    fullDescription: data.fullDescription || '',
    specifications: data.specifications || [],
    price: data.price || 'Price on Request',
    images: data.images || [],
    status: data.status || 'active',
    featured: data.featured || false,
    quoteClicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.unshift(product);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const idx = products.findIndex((p) => p.id === id || p.slug === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data, updatedAt: new Date().toISOString() };
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const idx = products.findIndex((p) => p.id === id || p.slug === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

// ── Categories API ──
export function getCategories(): Category[] {
  return [...categories];
}

export function createCategory(data: Partial<Category>): Category {
  const category: Category = {
    id: nextId('cat'),
    name: data.name || '',
    slug: data.slug || data.name?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-') || '',
    icon: data.icon || 'Package',
    description: data.description || '',
    productCount: 0,
    createdAt: new Date().toISOString(),
  };
  categories.push(category);
  return category;
}

export function updateCategory(id: string, data: Partial<Category>): Category | null {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  categories[idx] = { ...categories[idx], ...data };
  return categories[idx];
}

export function deleteCategory(id: string): boolean {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
}

// ── Leads API ──
export function getLeads(filters?: { status?: string; search?: string }): Lead[] {
  let result = [...leads];
  if (filters?.status && filters.status !== 'all') result = result.filter((l) => l.status === filters.status);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (l) => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s) || l.phone.includes(s) || l.productName.toLowerCase().includes(s)
    );
  }
  return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function createLead(data: Partial<Lead>): Lead {
  const lead: Lead = {
    id: nextId('lead'),
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
    address: data.address || '',
    productName: data.productName || 'General Enquiry',
    productId: data.productId || '',
    sourcePage: data.sourcePage || 'unknown',
    status: 'New',
    timestamp: new Date().toISOString(),
  };
  leads.unshift(lead);

  // Update analytics
  if (data.productId) {
    const existing = analytics.find((a) => a.productId === data.productId);
    if (existing) {
      existing.quoteClicks++;
    } else {
      analytics.push({ productId: data.productId, productName: data.productName || '', quoteClicks: 1 });
    }
  }

  return lead;
}

export function updateLead(id: string, data: { status?: string; notes?: string }): Lead | null {
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  if (data.status) leads[idx].status = data.status as Lead['status'];
  if (data.notes !== undefined) leads[idx].notes = data.notes;
  return leads[idx];
}

// ── Analytics API ──
export function getAnalytics(): AnalyticsData[] {
  return [...analytics].sort((a, b) => b.quoteClicks - a.quoteClicks);
}

// TypeScript interfaces for the TH Raamed application

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Specification[];
  price: string; // "Price on Request" or actual price
  images: string[];
  status: 'active' | 'inactive';
  featured: boolean;
  quoteClicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  productName: string;
  productId: string;
  sourcePage: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed';
  timestamp: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  createdAt: string;
}

export interface AnalyticsData {
  productId: string;
  productName: string;
  quoteClicks: number;
}

export interface DashboardStats {
  totalLeads: number;
  totalProducts: number;
  totalQuoteClicks: number;
  liveVisitors: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  productName: string;
  productId: string;
  sourcePage: string;
}

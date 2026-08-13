'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Headphones,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  Telescope,
  ScanLine,
  Scissors,
  HeartPulse,
  Package,
  Building2,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Stethoscope,
  BadgePercent,
  Truck,
  Wrench,
  MessageCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import GetQuoteModal from '@/components/lead/GetQuoteModal';
import { Product, Category } from '@/types';

const categoryGradients: Record<string, { bg: string; text: string; border: string }> = {
  Endoscopes: { bg: 'from-[#102B7B] to-blue-900', text: 'text-[#102B7B]', border: 'border-[#102B7B]/20' },
  'Diagnostic Machines': { bg: 'from-[#F26522] to-orange-600', text: 'text-[#F26522]', border: 'border-[#F26522]/20' },
  'Surgical Equipment': { bg: 'from-[#102B7B] to-indigo-900', text: 'text-[#102B7B]', border: 'border-[#102B7B]/20' },
  'Monitoring Devices': { bg: 'from-[#F26522] to-amber-600', text: 'text-[#F26522]', border: 'border-[#F26522]/20' },
};

const iconMap: Record<string, React.ReactNode> = {
  Telescope: <Telescope size={28} />,
  ScanLine: <ScanLine size={28} />,
  Scissors: <Scissors size={28} />,
  HeartPulse: <HeartPulse size={28} />,
  Package: <Package size={28} />,
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState({ name: 'General Enquiry', id: '' });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    fetch('/api/products?featured=true&status=active')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data.slice(0, 4));
      })
      .catch(() => {});

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(() => {});
  }, []);

  const testimonials = [
    {
      name: 'Dr. Rajesh Mehta',
      role: 'Head of Surgery, City Hospital Mumbai',
      text: 'TH Raamed has been our trusted medical equipment partner for over 8 years. Their HD endoscopy towers and surgical lights operate flawlessly with zero downtime.',
      rating: 5,
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Director, Sharma Diagnostic Centre, Delhi',
      text: 'We purchased our digital DR X-ray system from TH Raamed. The installation, staff training, and ongoing support have been outstanding.',
      rating: 5,
    },
    {
      name: 'Dr. Anil Kumar',
      role: 'Managing Director, LifeCare Hospitals, Bangalore',
      text: 'Prompt responses, top-certified equipment, and genuine after-sales AMC support. TH Raamed sets the standard for B2B medical supply in India.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const displayCategories = categories.length > 0 ? categories : [
    { id: '1', name: 'Endoscopes', slug: 'endoscopes', icon: 'Telescope', description: 'High-definition flexible & rigid endoscopy systems.', productCount: 2, createdAt: '' },
    { id: '2', name: 'Diagnostic Machines', slug: 'diagnostic-machines', icon: 'ScanLine', description: 'Advanced digital radiography & ultrasound scanners.', productCount: 2, createdAt: '' },
    { id: '3', name: 'Surgical Equipment', slug: 'surgical-equipment', icon: 'Scissors', description: 'Precision electrosurgical units & LED OT lights.', productCount: 2, createdAt: '' },
    { id: '4', name: 'Monitoring Devices', slug: 'monitoring-devices', icon: 'HeartPulse', description: 'Real-time multi-parameter ICU patient monitors.', productCount: 2, createdAt: '' },
  ];

  const openQuote = (name = 'General Enquiry', id = '') => {
    setQuoteProduct({ name, id });
    setShowQuoteModal(true);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi TH Raamed, I would like to get an official quote for medical equipment.')}`;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071033] via-[#102B7B] to-[#0a194b] text-white py-12 sm:py-16 lg:py-20">
        
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F26522]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Text & Stats */}
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 text-[#FED7AA] text-xs font-bold backdrop-blur-md">
                <Sparkles size={15} className="text-[#F26522] animate-pulse" />
                <span>Official B2B Medical Equipment Supplier — Pan-India</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] font-[var(--font-heading)]">
                High-Precision <span className="text-[#F26522]">Medical Devices</span> & Diagnostic Systems
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                TH Raamed delivers ISO 13485 & CE certified endoscopy towers, digital radiography X-ray machines, surgical OT equipment, and patient monitors directly to healthcare institutions across India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  variant="orange"
                  size="md"
                  onClick={() => openQuote()}
                  className="!px-6 !py-3.5 !rounded-xl !text-sm !font-black shadow-lg"
                >
                  <PhoneCall size={18} />
                  Get Official Quote
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#25D366] text-white font-extrabold text-sm rounded-xl shadow-md hover:bg-[#20BD5A] transition-all transform hover:scale-[1.02]"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>

                <Link href="/products">
                  <Button
                    variant="outline"
                    size="md"
                    className="!border-white/40 !text-white hover:!bg-white/10 hover:!border-white !px-5 !py-3.5 !rounded-xl !font-bold"
                  >
                    Explore Catalog
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>

              {/* Integrated Stats Grid Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
                <div className="space-y-1">
                  <div className="text-2xl font-black text-[#F26522]">500+</div>
                  <div className="text-xs font-semibold text-slate-300">Hospitals Served</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-white">15+ Yrs</div>
                  <div className="text-xs font-semibold text-slate-300">Industry Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-[#F26522]">100%</div>
                  <div className="text-xs font-semibold text-slate-300">ISO & CE Certified</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-white">24/7</div>
                  <div className="text-xs font-semibold text-slate-300">AMC Support</div>
                </div>
              </div>

            </div>

            {/* Right Column: Doctor Team Photo Card (Symmetrically Balanced) */}
            <div className="relative w-full">
              <div className="relative w-full">
                
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F26522] to-[#102B7B] rounded-3xl blur-lg opacity-50 animate-pulse-glow" />
                
                {/* Image Box */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#F26522]/40 bg-slate-900 shadow-2xl w-full">
                  <div className="relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] w-full">
                    <Image
                      src="/images/hero_doctor_team.png"
                      alt="TH Raamed Doctor Team & Medical Equipment"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071033] via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Top Live Badge */}
                  <div className="absolute top-3 right-3 bg-[#071033]/90 backdrop-blur-md border border-[#F26522]/50 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F26522]"></span>
                    </span>
                    <span className="text-[11px] font-extrabold text-white">Pan-India Engineers</span>
                  </div>

                  {/* Bottom Stats Card */}
                  <div className="p-4 bg-[#071033] border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#F26522] flex items-center justify-center text-white font-bold shrink-0">
                        <Stethoscope size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">TH Raamed Care</p>
                        <p className="text-[11px] text-slate-400 font-medium">Verified Medical Devices</p>
                      </div>
                    </div>
                    <button
                      onClick={() => openQuote()}
                      className="px-3.5 py-1.5 bg-[#F26522] text-white font-black text-xs rounded-lg hover:bg-orange-600 transition-all shadow"
                    >
                      Enquire Now
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED CLINICAL PARTNER SECTION ═══════════════════ */}
      <section className="py-12 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#102B7B]/15 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-2">
                <span className="inline-block px-3 py-1 bg-orange-100 text-[#F26522] text-xs font-black rounded-lg uppercase">
                  Featured Clinical Partner
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#102B7B]">
                  Equipping India&apos;s Leading Surgical Centers & Diagnostic Labs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  TH Raamed delivers end-to-end installation, staff clinical training, and original OEM spare parts to ensure uninterrupted hospital operations across 28 states.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 justify-end">
                <button
                  onClick={() => openQuote()}
                  className="px-5 py-3 bg-[#F26522] text-white font-extrabold text-xs rounded-xl hover:bg-orange-600 transition-all shadow text-center"
                >
                  Request Equipment Demo
                </button>
                <Link
                  href="/about"
                  className="px-5 py-3 border border-[#102B7B] text-[#102B7B] hover:bg-[#102B7B] hover:text-white transition-all font-extrabold text-xs rounded-xl text-center"
                >
                  Learn About TH Raamed →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORIES SHOWCASE ═══════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#F26522] uppercase tracking-wider bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
                Product Categories
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102B7B] mt-2 font-[var(--font-heading)]">
                Explore Our Medical Equipment Range
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-[#F26522] font-extrabold hover:text-orange-700 transition-colors text-sm shrink-0"
            >
              Browse Full Catalog <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCategories.map((cat) => {
              const style = categoryGradients[cat.name] || { bg: 'from-[#102B7B] to-blue-900', text: 'text-[#102B7B]', border: 'border-[#102B7B]/20' };
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`group bg-slate-50 rounded-3xl p-6 border-2 ${style.border} hover:bg-white hover:border-[#F26522] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between h-full`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${style.bg} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform`}>
                      {iconMap[cat.icon] || <Package size={24} />}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-[#F26522] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-extrabold text-[#102B7B] pt-4 border-t border-slate-200 group-hover:text-[#F26522]">
                    <span>Explore Category</span>
                    <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════ ABOUT TH RAAMED ═══════════════════ */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Story Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#F26522] text-xs font-black uppercase tracking-wider">
                <Building2 size={14} />
                About TH Raamed
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102B7B] leading-tight">
                Your Preferred B2B Partner in <span className="text-[#F26522]">Healthcare Innovation</span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Established in 2009, <strong>TH Raamed</strong> is an ISO 13485 & CE certified supplier of high-tech surgical systems, flexible video endoscopes, digital DR X-ray units, and ICU patient monitoring equipment across India.
              </p>

              {/* 4 Clean Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {[
                  { icon: ShieldCheck, title: '100% Quality Inspected', desc: 'Pre-delivery testing & calibration' },
                  { icon: Award, title: 'ISO 13485 & CE Certified', desc: 'Complies with global healthcare norms' },
                  { icon: Truck, title: 'Pan-India Delivery', desc: 'Express secure freight logistics' },
                  { icon: Wrench, title: 'Dedicated AMC Support', desc: 'On-site technical engineers' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F26522] flex items-center justify-center shrink-0 font-bold">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#102B7B]">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#102B7B] font-extrabold hover:text-[#F26522] transition-colors text-xs sm:text-sm"
                >
                  Read Full Company Story & Certifications <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-7 border-2 border-[#102B7B]/15 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <h3 className="text-lg font-extrabold text-[#102B7B]">
                    Why Hospitals Choose TH Raamed
                  </h3>
                  <BadgePercent size={22} className="text-[#F26522]" />
                </div>

                <div className="space-y-5">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#102B7B] text-white flex items-center justify-center shrink-0 font-black text-base shadow-sm">
                      01
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Clinically Proven Quality</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Multi-point testing ensures reliable performance in critical care environments.</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#F26522] text-white flex items-center justify-center shrink-0 font-black text-base shadow-sm">
                      02
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Direct B2B Pricing</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">No middleman markup. Transparent quotation delivered directly to your inbox/WhatsApp.</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#102B7B] text-white flex items-center justify-center shrink-0 font-black text-base shadow-sm">
                      03
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">24/7 Technical Support</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Direct 1-click access to trained engineers for installation, service, and spare parts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCTS HIGHLIGHT ═══════════════════ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#071033] to-[#102B7B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#F26522] uppercase tracking-wider bg-orange-950 border border-orange-700/60 px-3.5 py-1.5 rounded-full">
                Featured Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 font-[var(--font-heading)]">
                Best-Selling Diagnostic & Surgical Systems
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-[#F26522] font-extrabold hover:text-orange-300 transition-colors text-sm shrink-0"
            >
              View All Products <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════ CLIENT TESTIMONIALS ═══════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-extrabold text-[#102B7B] uppercase tracking-wider bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              Verified Client Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102B7B] font-[var(--font-heading)]">
              Trusted by Surgeons & Hospital Directors
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50/40 via-slate-50 to-blue-50/40 rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-lg relative">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-[#F26522] fill-[#F26522]" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed mb-6 font-semibold italic">
                &ldquo;{testimonials[testimonialIndex].text}&rdquo;
              </p>
              <div>
                <div className="font-extrabold text-[#102B7B] text-sm sm:text-base">{testimonials[testimonialIndex].name}</div>
                <div className="text-xs font-bold text-[#F26522] mt-0.5">{testimonials[testimonialIndex].role}</div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        i === testimonialIndex ? 'bg-[#F26522] w-7' : 'bg-slate-300 w-2.5'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-xl border border-slate-300 text-slate-700 hover:text-[#F26522] hover:border-[#F26522] transition-all cursor-pointer bg-white shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-xl border border-slate-300 text-slate-700 hover:text-[#F26522] hover:border-[#F26522] transition-all cursor-pointer bg-white shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ HIGH IMPACT CTA BANNER ═══════════════════ */}
      <section className="py-14 bg-gradient-to-r from-[#F26522] via-orange-600 to-[#102B7B] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
            Need an Official B2B Equipment Quotation?
          </h2>
          <p className="text-orange-100 text-xs sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Submit your requirements to receive an official quotation, technical catalog, and immediate WhatsApp assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Button
              variant="navy"
              size="lg"
              onClick={() => openQuote()}
              className="!px-7 !py-3.5 !rounded-xl !shadow-xl !text-sm"
            >
              Get Official Quotation Now
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="!border-white/80 !text-white hover:!bg-white/10 !px-7 !py-3.5 !rounded-xl !font-bold !text-sm"
              >
                Contact Technical Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <GetQuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        productName={quoteProduct.name}
        productId={quoteProduct.id}
        sourcePage="home"
      />
    </div>
  );
}

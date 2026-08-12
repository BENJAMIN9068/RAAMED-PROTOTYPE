'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, ShieldCheck, HeartPulse } from 'lucide-react';
import Logo from '@/components/layout/Logo';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210';
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@thraamed.com';
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '123 Medical District, Mumbai, Maharashtra, India';

  return (
    <footer className="bg-[#071033] text-slate-300 border-t-4 border-[#F26522]">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed pt-2 font-medium">
              TH Raamed is a certified B2B medical equipment supplier providing high-precision endoscopy systems, digital radiography X-ray machines, surgical OT lights, and patient monitors to hospitals and clinics across India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 bg-[#F26522] text-white text-[10px] font-black rounded-md uppercase">
                ISO 13485 Certified
              </span>
              <span className="px-2.5 py-1 bg-white/10 text-slate-200 text-[10px] font-black rounded-md uppercase">
                CE Marked
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 border-b border-[#F26522]/40 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home Page' },
                { href: '/products', label: 'Products Catalog' },
                { href: '/about', label: 'About TH Raamed' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/admin', label: 'Admin Portal Login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold text-slate-400 hover:text-[#F26522] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#F26522]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 border-b border-[#F26522]/40 pb-2">
              Categories
            </h4>
            <ul className="space-y-3">
              {['Endoscopes', 'Diagnostic Machines', 'Surgical Equipment', 'Monitoring Devices'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs font-bold text-slate-400 hover:text-[#F26522] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#F26522]">›</span> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-white font-extrabold text-sm uppercase tracking-wider mb-5 border-b border-[#F26522]/40 pb-2">
              Official Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#F26522] mt-0.5 shrink-0" />
                <a href={`tel:${companyPhone}`} className="text-xs font-bold text-slate-300 hover:text-[#F26522] transition-colors">
                  {companyPhone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#F26522] mt-0.5 shrink-0" />
                <a href={`mailto:${companyEmail}`} className="text-xs font-bold text-slate-300 hover:text-[#F26522] transition-colors">
                  {companyEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#F26522] mt-0.5 shrink-0" />
                <span className="text-xs text-slate-400 leading-relaxed font-medium">{companyAddress}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#040920] border-t border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} TH Raamed Medical Equipment Co. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <ShieldCheck size={14} className="text-[#F26522]" /> ISO 13485
            </span>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <HeartPulse size={14} className="text-[#F26522]" /> CE Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

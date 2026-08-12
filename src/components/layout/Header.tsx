'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products Catalog' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#102B7B] text-white text-xs py-2 border-b border-[#F26522]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#F26522] text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] shadow-sm">
              <ShieldCheck size={13} /> ISO 13485 & CE Certified
            </span>
            <span className="hidden sm:inline text-slate-300 opacity-60">•</span>
            <span className="hidden sm:inline text-[11px] font-semibold text-slate-200">
              Pan-India Hospital Delivery & Service Support
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE || '+919876543210'}`}
              className="flex items-center gap-1.5 text-white hover:text-[#F26522] transition-colors font-bold text-xs"
            >
              <Phone size={13} className="text-[#F26522]" />
              <span>{process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210'}</span>
            </a>
            
            <Link
              href="/admin"
              className="text-[11px] bg-[#F26522] text-white font-black px-3 py-1 rounded-full hover:bg-orange-600 transition-colors shadow-sm"
            >
              Admin Portal
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          'transition-all duration-300 bg-white border-b border-slate-200',
          scrolled ? 'py-2 shadow-lg' : 'py-3'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Logo showTagline={true} />
          </Link>

          {/* Desktop Nav Links & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-sm font-extrabold transition-all duration-200',
                    pathname === link.href
                      ? 'text-[#F26522] bg-orange-50 border border-orange-200'
                      : 'text-[#102B7B] hover:text-[#F26522] hover:bg-slate-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F26522] text-white font-black text-sm rounded-xl shadow-md hover:bg-[#ea580c] transition-all transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <Sparkles size={15} />
              <span>Get Quote</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-[#102B7B] hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden px-4 pt-3 pb-5 bg-white border-t border-slate-100 mt-2 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-bold transition-colors',
                  pathname === link.href
                    ? 'text-[#F26522] bg-orange-50'
                    : 'text-[#102B7B] hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 bg-[#F26522] text-white font-extrabold text-sm rounded-xl shadow-md mt-2"
            >
              Get Instant Quote Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

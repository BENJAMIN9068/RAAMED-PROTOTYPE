import React from 'react';
import { Metadata } from 'next';
import { Shield, Target, Eye, Award, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — TH Raamed | Trusted Medical Equipment Supplier',
  description: 'Learn about TH Raamed — a leading B2B medical equipment supplier with 15+ years of experience serving hospitals and clinics across India.',
};

export default function AboutPage() {
  return (
    <div className="pt-[calc(2rem+4.5rem)] min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About TH Raamed</h1>
          <p className="text-primary-100 text-lg max-w-2xl">
            Your trusted partner in medical equipment supply since 2009
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009, TH Raamed has grown from a small medical equipment distributor to one of India&apos;s most trusted B2B medical device suppliers. We started with a simple mission: to make high-quality medical technology accessible to healthcare providers across the country.
                </p>
                <p>
                  Over the past 15+ years, we have built lasting partnerships with hospitals, diagnostic centres, and clinics — from metro cities to tier-2 towns. Our team of experienced professionals understands the unique challenges of the Indian healthcare landscape and works tirelessly to deliver equipment that meets international standards.
                </p>
                <p>
                  Today, we proudly serve over 500 healthcare institutions with a comprehensive portfolio of endoscopes, diagnostic imaging systems, surgical equipment, and patient monitoring devices.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-10 flex items-center justify-center min-h-[360px]">
              <div className="text-center">
                <div className="text-8xl font-extrabold gradient-text mb-2">15+</div>
                <div className="text-xl font-semibold text-gray-700">Years of Excellence</div>
                <div className="text-sm text-gray-500 mt-1">in Medical Equipment Supply</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-5">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower healthcare providers with reliable, cutting-edge medical equipment that improves patient outcomes. We strive to be the bridge between world-class medical technology and Indian healthcare institutions, ensuring quality and affordability go hand in hand.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 mb-5">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India&apos;s most trusted medical equipment partner, recognized for our commitment to quality, innovation, and customer service. We envision a healthcare ecosystem where every facility, large or small, has access to equipment that meets global standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Certifications & Accreditations</h2>
            <p className="text-gray-500">We maintain the highest standards of quality and compliance</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={32} />, title: 'ISO 13485', desc: 'Quality Management System for Medical Devices' },
              { icon: <Award size={32} />, title: 'CE Marking', desc: 'European Conformity for Product Safety' },
              { icon: <CheckCircle size={32} />, title: 'FDA Registered', desc: 'US FDA Registration for Select Products' },
              { icon: <Users size={32} />, title: 'BIS Certified', desc: 'Bureau of Indian Standards Compliance' },
            ].map((cert, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {cert.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{cert.title}</h4>
                <p className="text-sm text-gray-500">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Healthcare Clients' },
              { value: '1000+', label: 'Devices Installed' },
              { value: '15+', label: 'Years Experience' },
              { value: '28', label: 'States Covered' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-extrabold mb-1">{stat.value}</div>
                <div className="text-sm text-primary-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

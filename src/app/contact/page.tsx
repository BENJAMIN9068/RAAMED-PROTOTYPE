'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import Input from '@/components/ui/Input';
import { TextArea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { isValidPhone, isValidEmail } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '+91 98765 43210';
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@thraamed.com';
  const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || '123 Medical District, Mumbai, Maharashtra, India';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!isValidPhone(formData.phone)) errs.phone = 'Enter a valid phone number';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!isValidEmail(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }
    } catch {
      setErrors({ submit: 'Failed to send. Please try again.' });
    }
    setSubmitting(false);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="pt-[calc(2rem+4.5rem)] min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-primary-100 text-lg">We&apos;d love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4">
                <Phone size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
              <a href={`tel:${companyPhone}`} className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
                {companyPhone}
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4">
                <Mail size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <a href={`mailto:${companyEmail}`} className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
                {companyEmail}
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 mb-4">
                <MapPin size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
              <p className="text-sm text-gray-600">{companyAddress}</p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I would like to enquire about your medical equipment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white rounded-xl p-6 hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={24} />
              <div>
                <div className="font-semibold">Chat on WhatsApp</div>
                <div className="text-sm text-white/80">Quick response guaranteed</div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange('name')}
                      error={errors.name}
                      required
                    />
                    <Input
                      label="Phone Number"
                      placeholder="+91 98765 43210"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      error={errors.phone}
                      required
                    />
                  </div>
                  <Input
                    label="Email Address"
                    placeholder="you@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    error={errors.email}
                    required
                  />
                  <TextArea
                    label="Message"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={handleChange('message')}
                    error={errors.message}
                    required
                  />
                  {errors.submit && (
                    <p className="text-sm text-error bg-red-50 px-4 py-2 rounded-lg">{errors.submit}</p>
                  )}
                  <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full sm:w-auto">
                    <Send size={18} />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Google Map Embed */}
            <div className="mt-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TH Raamed Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

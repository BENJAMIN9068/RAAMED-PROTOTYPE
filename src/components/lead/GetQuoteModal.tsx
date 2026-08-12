'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { MessageCircle, Phone, CheckCircle2, Send } from 'lucide-react';
import { isValidPhone, isValidEmail, buildWhatsAppLink, buildCallLink } from '@/lib/utils';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
  sourcePage: string;
}

type FormState = 'form' | 'submitting' | 'success';

export default function GetQuoteModal({
  isOpen,
  onClose,
  productName,
  productId,
  sourcePage,
}: GetQuoteModalProps) {
  const [state, setState] = useState<FormState>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!isValidPhone(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.address.trim()) newErrors.address = 'Address / City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState('submitting');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName,
          productId,
          sourcePage,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setState('success');
    } catch {
      setState('form');
      setErrors({ submit: 'Something went wrong. Please try again.' });
    }
  };

  const handleClose = () => {
    setState('form');
    setFormData({ name: '', phone: '', email: '', address: '' });
    setErrors({});
    onClose();
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={state === 'success' ? undefined : 'Get a Quote'}>
      {state === 'success' ? (
        /* ── Success State ── */
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You, {formData.name}!</h3>
          <p className="text-sm text-gray-500 mb-6">
            Your enquiry for <span className="font-semibold text-gray-700">{productName}</span> has been received.
            Our team will contact you shortly. Meanwhile, you can reach us directly:
          </p>

          <div className="space-y-3">
            <a
              href={buildWhatsAppLink(formData.name, productName, formData.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <MessageCircle size={20} />
              Continue on WhatsApp
            </a>

            <a
              href={buildCallLink()}
              className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <Phone size={20} />
              Call Us Now
            </a>
          </div>

          <button
            onClick={handleClose}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        /* ── Form State ── */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product name display */}
          <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-3">
            <p className="text-xs text-primary-600 font-medium">Enquiring about</p>
            <p className="text-sm font-semibold text-primary-800">{productName}</p>
          </div>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
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

          <Input
            label="Email Address"
            placeholder="you@example.com"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
            required
          />

          <Input
            label="Address / City"
            placeholder="Your city or full address"
            value={formData.address}
            onChange={handleChange('address')}
            error={errors.address}
            required
          />

          {errors.submit && (
            <p className="text-sm text-error bg-red-50 px-4 py-2 rounded-lg">{errors.submit}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={state === 'submitting'}
            className="w-full"
          >
            <Send size={18} />
            Submit Enquiry
          </Button>

          <p className="text-xs text-gray-400 text-center">
            We respect your privacy. Your details will only be used to contact you regarding this enquiry.
          </p>
        </form>
      )}
    </Modal>
  );
}

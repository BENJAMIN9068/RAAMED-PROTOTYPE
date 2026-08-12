// Utility functions for TH Raamed

/** Generate a URL-friendly slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Format a date string to a readable format */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Format a date to short format */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Build a WhatsApp link with pre-filled message */
export function buildWhatsAppLink(
  name: string,
  productName: string,
  phone: string
): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const message = encodeURIComponent(
    `Hi, I'm ${name} and I'm interested in ${productName}. My phone number is ${phone}. Please share the quote and details.`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

/** Build a tel: link */
export function buildCallLink(): string {
  return `tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE || '+919876543210'}`;
}

/** Validate phone number (Indian format) */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^(\+91|91)?[6-9]\d{9}$/.test(cleaned);
}

/** Validate email */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
}

/** cn - classnames helper for conditional Tailwind classes */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

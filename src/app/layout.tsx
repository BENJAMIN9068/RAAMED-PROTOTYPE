import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/layout/WhatsAppFAB';
import PresenceTracker from '@/components/layout/PresenceTracker';

export const metadata: Metadata = {
  title: 'TH Raamed — Trusted Medical Equipment Supplier',
  description:
    'TH Raamed is a leading B2B medical equipment supplier providing endoscopes, diagnostic machines, surgical equipment, and monitoring devices to hospitals and clinics across India.',
  keywords: 'medical equipment, endoscopes, diagnostic machines, surgical equipment, patient monitors, B2B medical supplier, India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFAB />
        <PresenceTracker />
      </body>
    </html>
  );
}

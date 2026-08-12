# TH Raamed — Medical Equipment B2B Website

A modern, professional e-commerce-style website for **TH Raamed**, a B2B medical equipment company. Built with Next.js, Tailwind CSS, and Firebase.

> **Note:** This is NOT a standard e-commerce checkout site. Instead of cart/payment, every product has a **"Get Quote"** button that captures leads and provides WhatsApp/Call follow-up options.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Storage:** Firebase Storage (for product images)
- **Live Tracking:** Firebase Realtime Database (visitor presence)
- **Charts:** Recharts
- **Icons:** Lucide React

## Features

### Public Website
- 🏠 Home page with hero, categories, featured products, testimonials
- 📦 Product catalog with search & category filters
- 📋 Product detail pages with specs & image gallery
- 📝 Lead capture modal (Get Quote → WhatsApp/Call)
- 📞 Contact page with form & Google Maps
- ℹ️ About Us page with company story & certifications
- 💬 Floating WhatsApp button on all pages

### Admin Panel (`/admin`)
- 📊 Dashboard with stats cards, charts, recent leads
- 📦 Product CRUD (add, edit, delete, specs, images)
- 🏷️ Category management
- 👥 Leads management (search, filter, status update, CSV export)
- 📈 Analytics (per-product quote clicks, live visitors)
- 🔒 Protected by Firebase Authentication

## Setup

### 1. Prerequisites
- Node.js 18+
- A Firebase project ([create one here](https://console.firebase.google.com))

### 2. Firebase Setup
1. Create a Firebase project
2. Enable **Firestore Database**
3. Enable **Authentication** → Email/Password sign-in
4. Enable **Realtime Database**
5. Enable **Storage** (optional, for product images)
6. Create an admin user in Firebase Auth (email/password)
7. Generate a **Service Account Key** (Project Settings → Service Accounts → Generate New Private Key)

### 3. Environment Variables
```bash
cp .env.local.example .env.local
```
Fill in all values in `.env.local` with your Firebase credentials.

### 4. Install & Run
```bash
npm install
npm run dev
```

### 5. Seed the Database
After starting the dev server, seed sample products by making a POST request:
```bash
curl -X POST http://localhost:3000/api/seed
```
This will add 8 sample medical products and 4 categories.

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── products/           # Products catalog & detail
│   ├── about/              # About Us
│   ├── contact/            # Contact Us
│   ├── admin/              # Admin panel (protected)
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI (Button, Modal, Input, Badge)
│   ├── layout/             # Header, Footer, WhatsAppFAB
│   ├── lead/               # GetQuoteModal
│   └── products/           # ProductCard
├── hooks/                  # useAuth, useLiveVisitors
├── lib/                    # Firebase client/admin, utilities
├── types/                  # TypeScript interfaces
└── seed/                   # Sample data
```

## Company Info (Placeholders)
- **Company:** TH Raamed
- **WhatsApp:** +91 98765 43210
- **Phone:** +91 98765 43210
- **Email:** info@thraamed.com

Update these in `.env.local`.

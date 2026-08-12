import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { seedProducts, seedCategories } from '@/seed/data';

// POST: Seed the database with sample data
export async function POST() {
  try {
    const batch = adminDb.batch();

    // Seed categories
    const categoryIds: Record<string, string> = {};
    for (const cat of seedCategories) {
      const ref = adminDb.collection('categories').doc();
      batch.set(ref, cat);
      categoryIds[cat.name] = ref.id;
    }

    // Seed products (with category IDs linked)
    for (const product of seedProducts) {
      const ref = adminDb.collection('products').doc();
      batch.set(ref, {
        ...product,
        categoryId: categoryIds[product.category] || '',
      });

      // Seed analytics
      const analyticsRef = adminDb.collection('analytics').doc(ref.id);
      batch.set(analyticsRef, {
        productId: ref.id,
        productName: product.name,
        quoteClicks: product.quoteClicks,
      });
    }

    await batch.commit();

    return NextResponse.json({
      message: 'Database seeded successfully!',
      categories: seedCategories.length,
      products: seedProducts.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

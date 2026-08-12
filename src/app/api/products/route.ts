import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const products = getProducts({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
    featured: searchParams.get('featured') || undefined,
    status: searchParams.get('status') || undefined,
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name || !body.category) {
    return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
  }
  const product = createProduct(body);
  return NextResponse.json(product, { status: 201 });
}

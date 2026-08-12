import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, updateProduct, deleteProduct } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();
  const updated = updateProduct(slug, body);
  if (!updated) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const deleted = deleteProduct(slug);
  if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}

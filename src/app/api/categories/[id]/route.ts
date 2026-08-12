import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/lib/store';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const updated = updateCategory(id, body);
  if (!updated) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteCategory(id);
  if (!deleted) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}

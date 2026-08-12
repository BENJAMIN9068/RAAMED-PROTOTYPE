import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/store';

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
  }
  const category = createCategory(body);
  return NextResponse.json(category, { status: 201 });
}

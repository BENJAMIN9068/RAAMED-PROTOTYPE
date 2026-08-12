import { NextRequest, NextResponse } from 'next/server';
import { getLeads, createLead } from '@/lib/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leads = getLeads({
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
  });
  return NextResponse.json(leads);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, address, productName, productId, sourcePage } = body;

  if (!name || !phone || !email || !address) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const newLead = createLead({
    name,
    phone,
    email,
    address,
    productName: productName || 'General Enquiry',
    productId: productId || '',
    sourcePage: sourcePage || 'unknown',
  });

  return NextResponse.json(newLead, { status: 201 });
}

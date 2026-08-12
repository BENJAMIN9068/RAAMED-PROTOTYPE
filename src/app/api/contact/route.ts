import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/store';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, phone, email, message } = body;

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const newLead = createLead({
    name,
    phone,
    email,
    address: 'Contact Page Submission',
    productName: 'Contact Form Message',
    sourcePage: 'contact',
  });

  return NextResponse.json({ id: newLead.id, message: 'Message sent successfully' }, { status: 201 });
}

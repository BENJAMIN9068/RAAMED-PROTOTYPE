import { NextRequest, NextResponse } from 'next/server';
import { updateLead } from '@/lib/store';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const updated = updateLead(id, body);

  if (!updated) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

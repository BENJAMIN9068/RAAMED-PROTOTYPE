import { NextResponse } from 'next/server';
import { getLeads } from '@/lib/store';
import Papa from 'papaparse';

export async function GET() {
  try {
    const rawLeads = getLeads();
    const leads = rawLeads.map((data) => ({
      Name: data.name,
      Phone: data.phone,
      Email: data.email,
      Address: data.address,
      'Product Enquired': data.productName,
      'Date/Time': data.timestamp,
      'Source Page': data.sourcePage,
      Status: data.status,
    }));

    const csv = Papa.unparse(leads);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="th-raamed-leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

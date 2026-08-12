'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Users, MousePointerClick, Eye, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { useLiveVisitors } from '@/hooks/useLiveVisitors';
import { Lead, AnalyticsData } from '@/types';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const liveVisitors = useLiveVisitors();

  useEffect(() => {
    fetch('/api/leads').then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setLeads(data);
    }).catch(() => {});

    fetch('/api/analytics').then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setAnalytics(data);
    }).catch(() => {});

    fetch('/api/products').then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setTotalProducts(data.length);
    }).catch(() => {});
  }, []);

  const totalQuoteClicks = analytics.reduce((sum, a) => sum + a.quoteClicks, 0);
  const chartData = analytics.slice(0, 8).map((a) => ({
    name: a.productName.length > 20 ? a.productName.substring(0, 20) + '...' : a.productName,
    clicks: a.quoteClicks,
  }));

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Total Leads', value: leads.length, icon: Users, color: 'bg-blue-50 text-blue-600', link: '/admin/leads' },
          { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-emerald-50 text-emerald-600', link: '/admin/products' },
          { label: 'Quote Clicks', value: totalQuoteClicks, icon: MousePointerClick, color: 'bg-amber-50 text-amber-600', link: '/admin/analytics' },
          { label: 'Live Visitors', value: liveVisitors, icon: Eye, color: 'bg-purple-50 text-purple-600', link: '/admin/analytics' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.link} className="group">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Clicks by Product</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }}
                />
                <Bar dataKey="clicks" fill="#0077B6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
              No analytics data yet
            </div>
          )}
        </div>

        {/* Recent leads */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
            <Link href="/admin/leads" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
              View All →
            </Link>
          </div>
          {leads.length > 0 ? (
            <div className="space-y-3">
              {leads.slice(0, 8).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">{lead.name}</div>
                    <div className="text-xs text-gray-400 truncate">{lead.productName} • {formatDate(lead.timestamp)}</div>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">
              No leads yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

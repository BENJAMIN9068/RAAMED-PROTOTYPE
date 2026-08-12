'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Eye, MousePointerClick, TrendingUp } from 'lucide-react';
import { useLiveVisitors } from '@/hooks/useLiveVisitors';
import { AnalyticsData } from '@/types';

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const liveVisitors = useLiveVisitors();

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalClicks = analytics.reduce((sum, a) => sum + a.quoteClicks, 0);
  const chartData = analytics.map((a) => ({
    name: a.productName.length > 25 ? a.productName.substring(0, 25) + '...' : a.productName,
    clicks: a.quoteClicks,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Track product engagement and visitor activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <MousePointerClick size={20} />
            </div>
            <span className="text-sm text-gray-500">Total Quote Clicks</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalClicks}</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
              <Eye size={20} />
            </div>
            <span className="text-sm text-gray-500">Live Visitors Now</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {liveVisitors}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-sm text-gray-500">Top Product</span>
          </div>
          <div className="text-lg font-bold text-gray-900 truncate">
            {analytics.length > 0 ? analytics[0].productName : '—'}
          </div>
          {analytics.length > 0 && (
            <div className="text-sm text-gray-400">{analytics[0].quoteClicks} clicks</div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Clicks by Product</h3>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center text-gray-400">Loading...</div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-40} textAnchor="end" height={100} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="clicks" fill="#0077B6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-400">No analytics data</div>
        )}
      </div>

      {/* Sortable Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Per-Product Quote Clicks</h3>
        </div>
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">#</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Product Name</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-500">Quote Clicks</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analytics.map((a, i) => (
                  <tr key={a.productId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-gray-900">{a.productName}</td>
                    <td className="px-5 py-3 text-right font-semibold text-gray-800">{a.quoteClicks}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${totalClicks > 0 ? (a.quoteClicks / totalClicks) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">
                          {totalClicks > 0 ? ((a.quoteClicks / totalClicks) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

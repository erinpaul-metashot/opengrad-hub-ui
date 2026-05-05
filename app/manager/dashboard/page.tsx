'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Users,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Activity,
  PieChart,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Dashboard"
      activeNavItem="Dashboard"
    >
      <div className="space-y-6">
        {/* Header / Top actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
            <p className="text-sm text-slate-500 mt-1">High-level metrics and recent activities</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
              <option value="30">Last 30 days</option>
              <option value="7">Last 7 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700">
              <Download size={16} />
              Export Summary
            </button>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Total Active Users',
              value: '12,345',
              subtext: 'Active in last 30 days',
              icon: Users,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              title: 'Active Courses',
              value: '142',
              subtext: 'Published platform wide',
              icon: BookOpen,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50',
            },
            {
              title: 'Avg Completion Rate',
              value: '65%',
              subtext: 'Platform average',
              icon: CheckCircle,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
            },
            {
              title: 'Pending Approvals',
              value: '23',
              subtext: 'Awaiting manager review',
              icon: Clock,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-slate-400">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Analytics Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity size={18} className="text-teal-600" />
                Enrolments (Last 30 days)
              </h2>
              <div className="flex gap-2">
                <select className="text-xs rounded-lg border border-slate-200 px-2 py-1 outline-none text-slate-600 bg-slate-50">
                  <option>Programme: All</option>
                  <option>School</option>
                  <option>UG</option>
                  <option>PG</option>
                </select>
                <select className="text-xs rounded-lg border border-slate-200 px-2 py-1 outline-none text-slate-600 bg-slate-50">
                  <option>State: All</option>
                  <option>Tamil Nadu</option>
                  <option>Kerala</option>
                </select>
              </div>
            </div>
            
            {/* Mock Chart Area */}
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
              <TrendingUp size={32} className="text-slate-300 mb-2" />
              <p className="text-sm text-slate-400 font-medium">Chart visualization area</p>
              <p className="text-xs text-slate-400 mt-1">Total enrolments last 30 days: 2,345</p>
            </div>
          </div>

          {/* Side Cards Area */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <PieChart size={16} className="text-teal-600" />
                Programme Distribution
              </h3>
              <div className="h-32 flex flex-col items-center justify-center bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-medium">Donut Chart Placeholder</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-[10px] text-slate-500">ðŸ”µ School 40%</span>
                  <span className="text-[10px] text-slate-500">ðŸŸ¢ UG 45%</span>
                  <span className="text-[10px] text-slate-500">ðŸŸ¡ PG 15%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <BarChart3 size={16} className="text-teal-600" />
                Top States by Enrolment
              </h3>
              <div className="space-y-3">
                {[
                  { state: 'Tamil Nadu', count: 4200, width: '100%' },
                  { state: 'Kerala', count: 3150, width: '75%' },
                  { state: 'Karnataka', count: 2800, width: '60%' },
                  { state: 'Maharashtra', count: 1500, width: '35%' },
                  { state: 'Delhi', count: 800, width: '20%' },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-slate-700">{item.state}</span>
                      <span className="text-slate-500">{item.count}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area - Recent Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <Link href="/manager/analytics" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              Open Analytics <ExternalLink size={14} />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100">
            {[
              { text: 'Manager Sarah published Course "Advanced React"', time: '2 hours ago', icon: BookOpen },
              { text: 'Fellow John onboarded 45 new students from Model School', time: '5 hours ago', icon: Users },
              { text: 'System automatically archived 12 inactive courses', time: '1 day ago', icon: Activity },
              { text: 'Super Admin uploaded 500 new user records via Bulk Import', time: '2 days ago', icon: Download },
            ].map((activity, idx) => (
              <div key={idx} className="py-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors -mx-6 px-6">
                <div className="p-2 bg-slate-100 text-slate-500 rounded-full shrink-0">
                  <activity.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-800 font-medium">{activity.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}


'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  TrendingUp,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  Activity,
  Award,
  Users
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <LayoutShell
      role="admin"
      userName="Super Admin"
      pageTitle="Platform Analytics"
      activeNavItem="Analytics"
    >
      <div className="space-y-6">
        
        {/* Page Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Platform Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Comprehensive view of platform engagement and performance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <Calendar size={16} className="text-slate-400" />
              <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Enrolments', value: '45,231', trend: '+12.5%', isUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg Completion', value: '68%', trend: '+4.2%', isUp: true, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Quiz Score', value: '72/100', trend: '-1.5%', isUp: false, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Active Sessions', value: '1,204', trend: '+22.4%', isUp: true, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((kpi, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color} mb-4`}>
                  <kpi.icon size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${kpi.isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Main Trend Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Enrolment Growth</h3>
              <select className="text-xs rounded-lg border border-slate-200 px-2 py-1 outline-none text-slate-600 bg-slate-50">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            <div className="h-72 w-full bg-slate-50 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center">
              <TrendingUp size={32} className="text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-400">Time-series Line Chart</p>
              <p className="text-xs text-slate-400 mt-1">Showing growth trajectory</p>
            </div>
          </div>

          {/* Demographics / Distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Programme Demographics</h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 font-semibold">Details</button>
            </div>
            <div className="h-72 w-full bg-slate-50 border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center">
              <PieChart size={32} className="text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-400">Donut/Pie Chart Visualization</p>
              <div className="flex gap-4 mt-3">
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> UG (45%)</span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span> School (40%)</span>
                <span className="text-xs font-semibold text-slate-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> PG (15%)</span>
              </div>
            </div>
          </div>

          {/* Performance by State */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Performance by State</h3>
            <div className="space-y-5">
              {[
                { state: 'Tamil Nadu', completion: 72, avgScore: 78 },
                { state: 'Kerala', completion: 65, avgScore: 74 },
                { state: 'Karnataka', completion: 58, avgScore: 69 },
                { state: 'Maharashtra', completion: 45, avgScore: 62 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700">{item.state}</span>
                    <span className="text-slate-500 text-xs">Completion: <span className="font-bold text-slate-900">{item.completion}%</span> | Score: <span className="font-bold text-slate-900">{item.avgScore}</span></span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Top Performing Courses</h3>
            <div className="space-y-4">
              {[
                { title: 'Web Development Fundamentals', score: 92, enrols: '4.2k' },
                { title: 'Database Systems', score: 88, enrols: '3.1k' },
                { title: 'Basic Mathematics for CompSci', score: 85, enrols: '5.6k' },
                { title: 'Intro to Python', score: 82, enrols: '2.8k' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.enrols} enrolments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                      <Award size={14} /> {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
              View All Courses
            </button>
          </div>

        </div>
      </div>
    </LayoutShell>
  );
}

'use client';

import React, { useState } from 'react';
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
  const [timeResolution, setTimeResolution] = useState<'Monthly' | 'Weekly'>('Monthly');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, value: number, label: string } | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Growth Trend Dataset
  const growthData = timeResolution === 'Monthly' ? {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    current: [4200, 9800, 18500, 31000, 45231],
    previous: [3100, 6500, 12000, 21000, 32000],
    max: 50000
  } : {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    current: [33000, 36500, 39200, 42100, 45231],
    previous: [23000, 25200, 27500, 29800, 32000],
    max: 50000
  };

  const currentPoints = growthData.current.map((val, i) => {
    const x = 50 + i * 150; // 50, 200, 350, 500, 650
    const y = 190 - (val / growthData.max) * 150;
    return { x, y, value: val, label: growthData.labels[i] };
  });

  const previousPoints = growthData.previous.map((val, i) => {
    const x = 50 + i * 150;
    const y = 190 - (val / growthData.max) * 150;
    return { x, y, value: val, label: growthData.labels[i] };
  });

  // Path builders for smooth curves
  const buildCurve = (p: typeof currentPoints) => {
    return `M ${p[0].x},${p[0].y} 
      C ${(p[0].x + p[1].x) / 2},${p[0].y} ${(p[0].x + p[1].x) / 2},${p[1].y} ${p[1].x},${p[1].y} 
      C ${(p[1].x + p[2].x) / 2},${p[1].y} ${(p[1].x + p[2].x) / 2},${p[2].y} ${p[2].x},${p[2].y} 
      C ${(p[2].x + p[3].x) / 2},${p[2].y} ${(p[2].x + p[3].x) / 2},${p[3].y} ${p[3].x},${p[3].y} 
      C ${(p[3].x + p[4].x) / 2},${p[3].y} ${(p[3].x + p[4].x) / 2},${p[4].y} ${p[4].x},${p[4].y}`;
  };

  const currentPath = buildCurve(currentPoints);
  const previousPath = buildCurve(previousPoints);
  const currentArea = `${currentPath} L ${currentPoints[4].x},200 L ${currentPoints[0].x},200 Z`;

  // Donut Demographics Math (radius = 36, circumference = 226.2)
  const r = 36;
  const circ = 226.19;
  const demographics = { school: 40, ug: 45, pg: 15 };
  
  const schoolStroke = (demographics.school / 100) * circ;
  const ugStroke = (demographics.ug / 100) * circ;
  const pgStroke = (demographics.pg / 100) * circ;

  const schoolOffset = 0;
  const ugOffset = -schoolStroke;
  const pgOffset = -(schoolStroke + ugStroke);

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
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <Calendar size={16} className="text-slate-400" />
              <select className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Total Enrolments', value: '45,231', trend: '+12.5%', isUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Avg Completion', value: '68%', trend: '+4.2%', isUp: true, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Quiz Score', value: '72/100', trend: '-1.5%', isUp: false, icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Active Sessions', value: '1,204', trend: '+22.4%', isUp: true, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((kpi, idx) => (
            <div key={idx} className="rounded-xl sm:rounded-2xl bg-white p-3.5 sm:p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:scale-[1.01] transition-all">
              <div className="flex justify-between items-start">
                <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl ${kpi.bg} ${kpi.color} mb-2 sm:mb-4 shrink-0`}>
                  <kpi.icon size={14} className="sm:hidden" />
                  <kpi.icon size={20} className="hidden sm:block" />
                </div>
                <span className={`text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md ${kpi.isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                  {kpi.trend}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-500 leading-tight">{kpi.label}</p>
              <p className="mt-0.5 sm:mt-1 text-lg sm:text-2xl md:text-3xl font-black text-slate-900 leading-none">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Main Trend Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Enrolment Growth</h3>
                <p className="text-xs text-slate-400 mt-1">Comparing current with previous trajectory</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={timeResolution}
                  onChange={(e) => setTimeResolution(e.target.value as 'Monthly' | 'Weekly')}
                  className="text-xs rounded-xl border border-slate-200 px-3 py-1.5 font-bold outline-none text-slate-700 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>

            {/* SVG Interactive Line Container */}
            <div className="relative pt-4 bg-slate-50/50 rounded-2xl border border-slate-100 p-4 overflow-x-auto">
              <div className="h-60 min-w-[600px] flex items-end relative">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <div key={v} className="w-full border-t border-slate-200/40 flex justify-between text-[9px] text-slate-400 pt-1 font-bold">
                      <span></span>
                      <span>{(growthData.max * (v / 100) / 1000).toFixed(0)}k</span>
                    </div>
                  ))}
                </div>
                
                {/* SVG Curves */}
                <svg viewBox="0 0 700 220" className="w-full h-full z-10 overflow-visible">
                  <defs>
                    <linearGradient id="growthTealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Previous Period Line */}
                  <path d={previousPath} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
                  
                  {/* Current Period Area */}
                  <path d={currentArea} fill="url(#growthTealGrad)" />
                  
                  {/* Current Period Line */}
                  <path d={currentPath} fill="none" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
                  
                  {/* Current Dots */}
                  {currentPoints.map((pt, idx) => (
                    <circle 
                      key={idx}
                      cx={pt.x} 
                      cy={pt.y} 
                      r={hoveredPoint?.label === pt.label ? "7" : "5"} 
                      fill="#0d9488" 
                      stroke="#ffffff" 
                      strokeWidth={hoveredPoint?.label === pt.label ? "3" : "2"}
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
                </svg>

                {/* Growth Tooltip overlay */}
                {hoveredPoint && (
                  <div 
                    className="absolute bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl pointer-events-none transition-all duration-150 z-20 flex flex-col items-center border border-slate-800"
                    style={{ 
                      left: `${(hoveredPoint.x / 700) * 100}%`, 
                      top: `${(hoveredPoint.y / 220) * 100 - 15}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{hoveredPoint.label} (Current)</span>
                    <span className="text-teal-400 mt-0.5">{hoveredPoint.value.toLocaleString()} students</span>
                    <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 -mb-2 mt-1 border-r border-b border-slate-800" />
                  </div>
                )}
              </div>
              
              {/* X Axis Labels */}
              <div className="flex justify-between mt-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[600px]">
                {growthData.labels.map((label, idx) => <span key={idx}>{label}</span>)}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mt-4 p-2.5 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-500">
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span> Current Period (45,231)</span>
              <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block border border-dashed border-slate-400"></span> Previous Period (32,000)</span>
            </div>
          </div>

          {/* Demographics / Distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Programme Demographics</h3>
                <p className="text-xs text-slate-400 mt-1">Platform-wide distribution ratios</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                100% Total
              </span>
            </div>

            <div className="relative h-64 flex items-center justify-center bg-slate-50/40 rounded-2xl border border-slate-100">
              <svg width="150" height="150" viewBox="0 0 100 100" className="rotate-[-90deg]">
                {/* Background Ring */}
                <circle cx="50" cy="50" r={r} fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                
                {/* Slices with active Z-index sorting so hovered segment always draws last (on top) */}
                {[
                  { key: 'school', value: demographics.school, stroke: schoolStroke, offset: schoolOffset, color: '#3b82f6' },
                  { key: 'ug', value: demographics.ug, stroke: ugStroke, offset: ugOffset, color: '#10b981' },
                  { key: 'pg', value: demographics.pg, stroke: pgStroke, offset: pgOffset, color: '#f59e0b' }
                ]
                  .filter(s => s.value > 0)
                  .sort((a, b) => (a.key === hoveredSlice ? 1 : b.key === hoveredSlice ? -1 : 0))
                  .map((slide) => (
                    <circle 
                      key={slide.key}
                      cx="50" 
                      cy="50" 
                      r={r} 
                      fill="transparent" 
                      stroke={hoveredSlice && hoveredSlice !== slide.key ? '#cbd5e1' : slide.color}
                      strokeWidth={hoveredSlice === slide.key ? 14 : (hoveredSlice ? 8 : 10)} 
                      strokeDasharray={`${slide.stroke} ${circ}`} 
                      strokeDashoffset={slide.offset}
                      strokeLinecap="round"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredSlice(slide.key)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  ))
                }
              </svg>

              {/* Central text segment */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                {hoveredSlice ? (
                  <>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {hoveredSlice === 'school' ? 'School' : hoveredSlice === 'ug' ? 'UG' : 'PG'}
                    </span>
                    <span className="text-2xl font-black text-slate-800">
                      {hoveredSlice === 'school' ? demographics.school : hoveredSlice === 'ug' ? demographics.ug : demographics.pg}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollments</span>
                    <span className="text-xl font-black text-slate-800">Syllabi</span>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3.5 mt-4 border-t border-slate-100 pt-3">
              {[
                { key: 'school', label: 'School (40%)', color: 'bg-blue-500' },
                { key: 'ug', label: 'UG (45%)', color: 'bg-emerald-500' },
                { key: 'pg', label: 'PG (15%)', color: 'bg-amber-500' }
              ].map((item) => (
                <div 
                  key={item.key} 
                  className={`flex flex-col items-center justify-center border text-center rounded-xl p-2 cursor-pointer transition-all duration-150 ${
                    hoveredSlice === item.key ? 'bg-slate-50 border-slate-200 scale-105' : 'border-slate-100 bg-slate-50/20'
                  }`}
                  onMouseEnter={() => setHoveredSlice(item.key)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <span className={`w-2 h-2 rounded-full ${item.color} mb-1.5`}></span>
                  <span className="text-[10px] font-bold text-slate-600 leading-none">{item.label}</span>
                </div>
              ))}
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

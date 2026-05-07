'use client';

import React, { useState } from 'react';
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

// Dynamic stats and coordinates generator based on filters
const getMetrics = (programme: string, state: string) => {
  // Base metrics for programmes
  let baseUsers = 12345;
  let baseCourses = 142;
  let baseCompletion = 65;
  let baseApprovals = 23;
  let baseEnrolments = 2345;
  
  if (programme === 'School') {
    baseUsers = 4938; baseCourses = 56; baseCompletion = 72; baseApprovals = 8; baseEnrolments = 938;
  } else if (programme === 'UG') {
    baseUsers = 5555; baseCourses = 64; baseCompletion = 64; baseApprovals = 12; baseEnrolments = 1055;
  } else if (programme === 'PG') {
    baseUsers = 1852; baseCourses = 22; baseCompletion = 55; baseApprovals = 3; baseEnrolments = 352;
  }

  // Adjust by state
  let factor = 1.0;
  if (state === 'Tamil Nadu') factor = 0.55;
  else if (state === 'Kerala') factor = 0.35;

  const users = Math.round(baseUsers * factor);
  const courses = Math.round(baseCourses * factor) || 1;
  const approvals = Math.round(baseApprovals * factor);
  const enrolments = Math.round(baseEnrolments * factor);
  
  // Custom completion rate variation based on state
  let completion = baseCompletion;
  if (state === 'Tamil Nadu') completion = Math.min(95, completion + 4);
  else if (state === 'Kerala') completion = Math.max(20, completion - 2);

  // Enrolment line coordinates representing 5 weeks in May
  const maxVal = Math.max(100, enrolments * 1.25);
  const values = [
    Math.round(enrolments * 0.2),
    Math.round(enrolments * 0.45),
    Math.round(enrolments * 0.6),
    Math.round(enrolments * 0.82),
    enrolments
  ];
  
  // Convert values to Y-coordinates (where 190 is bottom, 20 is top)
  const points = values.map((v, i) => {
    const x = 50 + i * 150; // x values: 50, 200, 350, 500, 650
    const ratio = v / maxVal;
    const y = 190 - ratio * 150; // range 40 to 190
    return { x, y, value: v, label: `Week ${i + 1}` };
  });

  // Donut chart percentages
  let donut = { school: 40, ug: 45, pg: 15 };
  if (programme === 'School') donut = { school: 100, ug: 0, pg: 0 };
  else if (programme === 'UG') donut = { school: 0, ug: 100, pg: 0 };
  else if (programme === 'PG') donut = { school: 0, ug: 0, pg: 100 };

  return {
    users: users.toLocaleString(),
    courses: courses.toString(),
    completion: `${completion}%`,
    approvals: approvals.toString(),
    enrolments: enrolments.toLocaleString(),
    points,
    donut
  };
};

export default function ManagerDashboard() {
  const [programme, setProgramme] = useState('All');
  const [state, setState] = useState('All');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, value: number, label: string } | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const metrics = getMetrics(programme, state);

  // SVG smooth cubic bezier path builder for the line chart
  const p = metrics.points;
  const pathD = `M ${p[0].x},${p[0].y} 
    C ${(p[0].x + p[1].x) / 2},${p[0].y} ${(p[0].x + p[1].x) / 2},${p[1].y} ${p[1].x},${p[1].y} 
    C ${(p[1].x + p[2].x) / 2},${p[1].y} ${(p[1].x + p[2].x) / 2},${p[2].y} ${p[2].x},${p[2].y} 
    C ${(p[2].x + p[3].x) / 2},${p[2].y} ${(p[2].x + p[3].x) / 2},${p[3].y} ${p[3].x},${p[3].y} 
    C ${(p[3].x + p[4].x) / 2},${p[3].y} ${(p[3].x + p[4].x) / 2},${p[4].y} ${p[4].x},${p[4].y}`;

  const areaD = `${pathD} L ${p[4].x},200 L ${p[0].x},200 Z`;

  // Donut chart stroke math (radius = 36, circumference = 226.2)
  const r = 36;
  const circ = 2 * Math.PI * r; // 226.19
  
  const schoolStroke = (metrics.donut.school / 100) * circ;
  const ugStroke = (metrics.donut.ug / 100) * circ;
  const pgStroke = (metrics.donut.pg / 100) * circ;

  const schoolOffset = 0;
  const ugOffset = -schoolStroke;
  const pgOffset = -(schoolStroke + ugStroke);

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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">Filters:</span>
              <select 
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full"
              >
                <option value="All">Programme: All</option>
                <option value="School">School</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>
            </div>
            <div className="flex-1 sm:flex-none flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
              <select 
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer w-full"
              >
                <option value="All">State: All</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
              </select>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95">
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
              value: metrics.users,
              subtext: 'Active in last 30 days',
              icon: Users,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              title: 'Active Courses',
              value: metrics.courses,
              subtext: 'Published platform wide',
              icon: BookOpen,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50',
            },
            {
              title: 'Avg Completion Rate',
              value: metrics.completion,
              subtext: 'Platform average',
              icon: CheckCircle,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
            },
            {
              title: 'Pending Approvals',
              value: metrics.approvals,
              subtext: 'Awaiting manager review',
              icon: Clock,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
            },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:scale-[1.01] transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Analytics Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={18} className="text-teal-600" />
                  Enrolments Trend
                </h2>
                <p className="text-xs text-slate-500 mt-1">Growth progression in last 30 days ({programme} | {state})</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Enrolled Students
                </span>
              </div>
            </div>
            
            {/* SVG Visual Graph Container */}
            <div className="relative pt-4 bg-slate-50/50 rounded-2xl border border-slate-100 p-4 overflow-x-auto">
              <div className="h-60 min-w-[600px] flex items-end relative">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <div key={v} className="w-full border-t border-slate-200/40 flex justify-between text-[9px] text-slate-400 pt-1 font-bold">
                      <span></span>
                      <span>{v}%</span>
                    </div>
                  ))}
                </div>
                
                {/* SVG Area with Gradient */}
                <svg viewBox="0 0 700 220" className="w-full h-full z-10 overflow-visible">
                  <defs>
                    <linearGradient id="tealGradDashMgr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Current Area Gradient */}
                  <path d={areaD} fill="url(#tealGradDashMgr)" />
                  
                  {/* Stroke Line */}
                  <path d={pathD} fill="none" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
                  
                  {/* Data Dots */}
                  {metrics.points.map((pt, idx) => (
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

                {/* Hover Tooltip overlay */}
                {hoveredPoint && (
                  <div 
                    className="absolute bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-xl pointer-events-none transition-all duration-150 z-20 flex flex-col items-center border border-slate-800"
                    style={{ 
                      left: `${(hoveredPoint.x / 700) * 100}%`, 
                      top: `${(hoveredPoint.y / 220) * 100 - 15}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{hoveredPoint.label}</span>
                    <span className="text-teal-400 mt-0.5">{hoveredPoint.value.toLocaleString()} Enrolments</span>
                    <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 -mb-2 mt-1 border-r border-b border-slate-800" />
                  </div>
                )}
              </div>
              
              {/* X Axis Labels */}
              <div className="flex justify-between mt-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider min-w-[600px]">
                <span>May 1</span>
                <span>May 8</span>
                <span>May 15</span>
                <span>May 22</span>
                <span>May 29</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-teal-50/50 rounded-xl border border-teal-100 flex justify-between items-center text-xs text-teal-800 font-bold">
              <span>Total cumulative enrolments for filters:</span>
              <span className="text-sm font-black text-teal-900">{metrics.enrolments} students</span>
            </div>
          </div>

          {/* Side Cards Area */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                <PieChart size={16} className="text-teal-600" />
                Programme Distribution
              </h3>
              
              {/* SVG Donut implementation */}
              <div className="relative h-44 flex items-center justify-center bg-slate-50/40 rounded-xl border border-slate-100">
                <svg width="120" height="120" viewBox="0 0 100 100" className="rotate-[-90deg]">
                  {/* Background Track Ring */}
                  <circle cx="50" cy="50" r={r} fill="transparent" stroke="#f1f5f9" strokeWidth="10" />
                  
                  {/* Slices with active Z-index sorting so hovered segment always draws last (on top) */}
                  {[
                    { key: 'school', value: metrics.donut.school, stroke: schoolStroke, offset: schoolOffset, color: '#3b82f6' },
                    { key: 'ug', value: metrics.donut.ug, stroke: ugStroke, offset: ugOffset, color: '#10b981' },
                    { key: 'pg', value: metrics.donut.pg, stroke: pgStroke, offset: pgOffset, color: '#f59e0b' }
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

                {/* Absolute Center Hole Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  {hoveredSlice ? (
                    <>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {hoveredSlice === 'school' ? 'School' : hoveredSlice === 'ug' ? 'UG' : 'PG'}
                      </span>
                      <span className="text-base font-black text-slate-800">
                        {hoveredSlice === 'school' ? metrics.donut.school : hoveredSlice === 'ug' ? metrics.donut.ug : metrics.donut.pg}%
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syllabus</span>
                      <span className="text-base font-black text-slate-800">Ratios</span>
                    </>
                  )}
                </div>
              </div>

              {/* Legends with interactivity */}
              <div className="flex flex-col gap-2.5 mt-4 border-t border-slate-100 pt-3">
                {[
                  { key: 'school', label: 'School', percent: metrics.donut.school, color: 'bg-blue-500', text: 'text-blue-500' },
                  { key: 'ug', label: 'UG (Undergrad)', percent: metrics.donut.ug, color: 'bg-emerald-500', text: 'text-emerald-500' },
                  { key: 'pg', label: 'PG (Postgrad)', percent: metrics.donut.pg, color: 'bg-amber-500', text: 'text-amber-500' }
                ].map((item) => (
                  <div 
                    key={item.key} 
                    className={`flex justify-between items-center text-xs font-semibold rounded-xl p-1.5 px-2 border transition-all duration-150 ${
                      hoveredSlice === item.key ? 'bg-slate-50 border-slate-200 scale-[1.02]' : 'border-transparent'
                    }`}
                    onMouseEnter={() => setHoveredSlice(item.key)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                      <span className="text-slate-700">{item.label}</span>
                    </span>
                    <span className={`font-bold ${item.text}`}>{item.percent}%</span>
                  </div>
                ))}
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
                  <div key={idx} className="relative group">
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-slate-700 font-bold group-hover:text-teal-600 transition-colors">{item.state}</span>
                      <span className="text-slate-500">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full group-hover:bg-teal-600 transition-all duration-300" style={{ width: item.width }} />
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
                  <p className="text-sm text-slate-800 font-bold">{activity.text}</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

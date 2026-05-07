'use client';

import React, { useState } from 'react';
import { Building2, Users, TrendingUp, AlertCircle, BarChart3, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { mockSchools, mockFellowStudents } from '@/lib/mockData';

export default function FellowDashboard() {
  const [activeMetric, setActiveMetric] = useState<'All' | 'Progress' | 'Attendance'>('All');
  const [hoveredBar, setHoveredBar] = useState<{ school: string; label: string; value: number; x: number; y: number; color: string } | null>(null);

  const totalSchools = mockSchools.length;
  const totalStudents = mockFellowStudents.length;
  const avgProgress = Math.round(
    mockFellowStudents.reduce((acc, curr) => acc + curr.progress, 0) / totalStudents
  );
  const schoolsNeedingAttention = mockSchools.filter(s => s.status === 'Needs Attention').length;

  const schoolStats = [
    { name: 'Green Valley High School', progress: 65, attendance: 88, short: 'Green Valley' },
    { name: 'Lincoln Memorial Academy', progress: 42, attendance: 98, short: 'Lincoln Acad.' },
    { name: 'Westside Tech', progress: 25, attendance: 60, short: 'Westside Tech' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Fellow Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of your assigned schools and students.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Cards */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:scale-[1.01] transition-all flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Building2 size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{totalSchools}</h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Total Schools</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:scale-[1.01] transition-all flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Users size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{totalStudents}</h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Total Students</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:scale-[1.01] transition-all flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <TrendingUp size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{avgProgress}%</h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Avg Progress</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:scale-[1.01] transition-all flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
            <AlertCircle size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{schoolsNeedingAttention}</h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Needs Attention</p>
          </div>
        </div>
      </div>

      {/* NEW: Interactive School Performance Comparison Bar Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 size={18} className="text-teal-600" />
              School Performance Insights
            </h3>
            <p className="text-xs text-slate-500 mt-1">Comparing completion metrics and attendance rates across your assigned schools</p>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Progress', 'Attendance'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMetric(mode)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  activeMetric === mode 
                    ? 'bg-white text-slate-800 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode === 'All' ? 'Compare All' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Drawing Area */}
        <div className="relative pt-4 bg-slate-50/50 rounded-2xl border border-slate-100 p-4 overflow-x-auto">
          <div className="min-w-[650px]">
            <div className="h-64 w-full flex items-end relative">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25, 0].map((v) => (
                <div key={v} className="w-full border-t border-slate-200/40 flex justify-between text-[10px] text-slate-400 pt-1 font-bold">
                  <span></span>
                  <span>{v}%</span>
                </div>
              ))}
            </div>

            {/* Custom SVG Bar Chart */}
            <svg viewBox="0 0 700 220" className="w-full h-full z-10 overflow-visible">
              <g>
                {schoolStats.map((school, idx) => {
                  const baseGroupX = 120 + idx * 200; // Centers: 120, 320, 520
                  
                  // Progress bar calculations
                  const progHeight = (school.progress / 100) * 160;
                  const progY = 190 - progHeight;
                  
                  // Attendance bar calculations
                  const attHeight = (school.attendance / 100) * 160;
                  const attY = 190 - attHeight;

                  return (
                    <g key={school.name}>
                      {/* Grid background column accent */}
                      <rect 
                        x={baseGroupX - 60} 
                        y="10" 
                        width="120" 
                        height="180" 
                        fill="transparent" 
                        className="hover:fill-slate-100/30 transition-colors duration-150" 
                      />

                      {/* Course Progress Column */}
                      {(activeMetric === 'All' || activeMetric === 'Progress') && (
                        <rect
                          x={activeMetric === 'All' ? baseGroupX - 35 : baseGroupX - 15}
                          y={progY}
                          width="30"
                          height={progHeight}
                          fill="url(#progressTeal)"
                          rx="4"
                          className="cursor-pointer transition-all duration-200 hover:brightness-95 hover:stroke-white hover:stroke-2"
                          onMouseEnter={(e) => setHoveredBar({
                            school: school.name,
                            label: 'Avg Progress',
                            value: school.progress,
                            x: activeMetric === 'All' ? baseGroupX - 20 : baseGroupX,
                            y: progY,
                            color: 'text-teal-500'
                          })}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                      )}

                      {/* Attendance Column */}
                      {(activeMetric === 'All' || activeMetric === 'Attendance') && (
                        <rect
                          x={activeMetric === 'All' ? baseGroupX + 5 : baseGroupX - 15}
                          y={attY}
                          width="30"
                          height={attHeight}
                          fill="url(#attendanceIndigo)"
                          rx="4"
                          className="cursor-pointer transition-all duration-200 hover:brightness-95 hover:stroke-white hover:stroke-2"
                          onMouseEnter={(e) => setHoveredBar({
                            school: school.name,
                            label: 'Avg Attendance',
                            value: school.attendance,
                            x: activeMetric === 'All' ? baseGroupX + 20 : baseGroupX,
                            y: attY,
                            color: 'text-indigo-500'
                          })}
                          onMouseLeave={() => setHoveredBar(null)}
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="progressTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <linearGradient id="attendanceIndigo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>

            {/* Float Tooltip Overlay */}
            {hoveredBar && (
              <div 
                className="absolute bg-slate-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-xl pointer-events-none transition-all duration-150 z-20 flex flex-col items-center border border-slate-800"
                style={{ 
                  left: `${(hoveredBar.x / 700) * 100}%`, 
                  top: `${(hoveredBar.y / 220) * 100 - 10}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{hoveredBar.school}</span>
                <span className="text-slate-200 mt-0.5">{hoveredBar.label}: <span className={`${hoveredBar.color} text-sm font-black`}>{hoveredBar.value}%</span></span>
                <div className="w-2.5 h-2.5 bg-slate-900 rotate-45 -mb-2.5 mt-1 border-r border-b border-slate-800" />
              </div>
            )}
          </div>

          {/* School labels below chart */}
          <div className="flex justify-between mt-3 px-1.5 text-xs font-bold text-slate-600 uppercase tracking-wide">
            {schoolStats.map((school) => (
              <span key={school.name} className="w-[120px] text-center truncate">{school.short}</span>
            ))}
          </div>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-teal-500 inline-block"></span> Avg Course Progress %</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-indigo-500 inline-block"></span> Avg Attendance Rate %</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Schools */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Schools Overview</h3>
            <Link href="/fellow/schools" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockSchools.slice(0, 3).map((school) => (
              <div key={school.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900">{school.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{school.district} • {school.studentsCount} Students</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    school.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {school.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Student Highlights</h3>
            <Link href="/fellow/students" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockFellowStudents.slice(0, 3).map((student) => (
              <div key={student.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900">{student.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{student.schoolName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

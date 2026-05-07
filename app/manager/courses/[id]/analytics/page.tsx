'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import {
  ChevronRight,
  Users,
  Activity,
  Award,
  Clock,
  TrendingUp,
  BarChart2,
  Download,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  PieChart,
  UserCheck
} from 'lucide-react';

const MOCK_COURSES = [
  { id: 1, title: 'Web Development Fundamentals', programme: 'UG', state: 'Tamil Nadu', enrolled: 1240, completion: '75%', status: 'Active', subject: 'Computer Science' },
  { id: 2, title: 'Advanced React Patterns', programme: 'PG', state: 'Kerala', enrolled: 450, completion: '60%', status: 'Active', subject: 'Computer Science' },
  { id: 3, title: 'Basic Mathematics for CompSci', programme: 'Global', state: 'All', enrolled: 3200, completion: '85%', status: 'Active', subject: 'Math' },
  { id: 4, title: 'Database Systems', programme: 'UG', state: 'Karnataka', enrolled: 890, completion: '40%', status: 'Active', subject: 'Computer Science' },
  { id: 5, title: 'Intro to Python', programme: 'Global', state: 'Tamil Nadu', enrolled: 2100, completion: '0%', status: 'Draft', subject: 'Computer Science' },
  { id: 6, title: 'Cloud Computing Architecture', programme: 'PG', state: 'All', enrolled: 150, completion: '90%', status: 'Archived', subject: 'Computer Science' },
];

const MOCK_STUDENTS_LEADERBOARD = [
  { id: '1', name: 'Aarav Patel', progress: 85, score: 92, lastActive: '2 hours ago', activeLessons: 12, email: 'aarav.p@example.com' },
  { id: '2', name: 'Diya Sharma', progress: 100, score: 95, lastActive: '1 day ago', activeLessons: 15, email: 'diya.s@example.com' },
  { id: '5', name: 'Vihaan Kumar', progress: 60, score: 88, lastActive: '1 hour ago', activeLessons: 9, email: 'vihaan.k@example.com' },
  { id: '3', name: 'Rohan Gupta', progress: 45, score: 78, lastActive: '3 days ago', activeLessons: 7, email: 'rohan.g@example.com' },
];

const MOCK_ACTIVITIES = [
  { name: 'Diya Sharma', action: 'completed final quiz', detail: 'Advanced React Patterns (95%)', time: '10 mins ago', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Aarav Patel', action: 'watched video lesson', detail: 'Intro to CSS Grid & Flexbox', time: '45 mins ago', icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50' },
  { name: 'Vihaan Kumar', action: 'submitted assignment', detail: 'Responsive Layout Wireframe', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Rohan Gupta', action: 'completed quick quiz', detail: 'HTML Semantic Elements (88%)', time: '5 hours ago', icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Michael Brown', action: 'joined the course', detail: 'Enrolled via UG Programme', time: '1 day ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function CourseAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  
  const courseId = parseInt(id, 10);
  const course = MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0];

  const [timePeriod, setTimePeriod] = useState('Last 30 Days');

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Course Analytics"
      activeNavItem="Courses"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        
        {/* Breadcrumb Navigation & Back Link */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/manager/courses" className="hover:text-teal-600 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Courses
            </Link>
            <ChevronRight size={14} />
            <Link href={`/manager/courses/${id}/enrollments`} className="hover:text-teal-600 transition-colors truncate max-w-[200px]">
              {course.title}
            </Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-bold">Analytics</span>
          </div>
          
          {/* Header Dashboard Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{course.title}</h1>
                <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-100">
                  {course.subject}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Detailed stats and student engagement reports for target <span className="font-semibold text-slate-700">{course.programme}</span> in <span className="font-semibold text-slate-700">{course.state}</span>.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <Calendar size={16} className="text-slate-400" />
                <select 
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                >
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>All Time</option>
                </select>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm">
                <Download size={14} />
                Export CSV
              </button>
              <Link 
                href={`/manager/courses/${id}/enrollments`}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-900/10 rounded-xl transition-all active:scale-95"
              >
                <Users size={14} /> Enrollments
              </Link>
            </div>
          </div>
        </div>

        {/* Global KPIs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Enrolled Students', value: course.enrolled.toLocaleString(), change: '+14.5%', isPositive: true, subtitle: 'Active subscribers', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-100' },
            { label: 'Avg Course Progress', value: course.completion, change: '+5.2%', isPositive: true, subtitle: 'Completion target 80%', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-50/50', border: 'border-teal-100' },
            { label: 'Average Quiz Score', value: '84%', change: '+1.8%', isPositive: true, subtitle: 'Overall class score', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50/50', border: 'border-purple-100' },
            { label: 'Daily Study Time', value: '42 mins', change: '-4.1%', isPositive: false, subtitle: 'Average active duration', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50/50', border: 'border-amber-100' },
          ].map((kpi, idx) => (
            <div key={idx} className={`rounded-2xl bg-white p-5 border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:scale-[1.01]`}>
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <kpi.icon size={20} />
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  kpi.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{kpi.value}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">{kpi.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Weekly Engagement SVG Line Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp size={18} className="text-teal-600" /> Daily Active Study Duration
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Average minutes spent learning daily</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span> Current period
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Previous
                </span>
              </div>
            </div>
            
            {/* SVG Visual Graph Container */}
            <div className="relative pt-4 bg-slate-50/50 rounded-xl border border-slate-100 p-4">
              <div className="h-56 w-full flex items-end relative">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[100, 75, 50, 25, 0].map((v) => (
                    <div key={v} className="w-full border-t border-slate-200/50 flex justify-between text-[10px] text-slate-400 pt-1 font-semibold">
                      <span></span>
                      <span>{v}m</span>
                    </div>
                  ))}
                </div>
                
                {/* SVG Area with Gradient */}
                <svg viewBox="0 0 700 220" className="w-full h-full z-10 overflow-visible">
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Previous Period Line */}
                  <path 
                    d="M 20,180 Q 120,160 220,175 T 420,140 T 620,150 T 680,130" 
                    fill="none" 
                    stroke="#cbd5e1" 
                    strokeWidth="2" 
                    strokeDasharray="4,4"
                  />
                  
                  {/* Current Period Area */}
                  <path 
                    d="M 20,170 Q 120,130 220,110 T 420,95 T 620,60 T 680,35 L 680,210 L 20,210 Z" 
                    fill="url(#tealGrad)"
                  />
                  
                  {/* Current Period Stroke Line */}
                  <path 
                    d="M 20,170 Q 120,130 220,110 T 420,95 T 620,60 T 680,35" 
                    fill="none" 
                    stroke="#0d9488" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                  />
                  
                  {/* Node Highlight Dots */}
                  <circle cx="220" cy="110" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="420" cy="95" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="620" cy="60" r="5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="680" cy="35" r="6" fill="#0f766e" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>
              
              {/* X Axis Labels */}
              <div className="flex justify-between mt-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Performance Distribution Brackets */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <PieChart size={18} className="text-teal-600" /> Grade Distribution
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Average scores across class rosters</p>
            </div>
            
            <div className="space-y-4 my-6">
              {[
                { bracket: 'Excellent (90-100)', count: 182, percentage: 41, color: 'bg-emerald-500' },
                { bracket: 'On Track (80-89)', count: 165, percentage: 37, color: 'bg-teal-500' },
                { bracket: 'Passing (70-79)', count: 76, percentage: 17, color: 'bg-blue-500' },
                { bracket: 'Needs Help (<70)', count: 27, percentage: 5, color: 'bg-rose-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-2 font-bold text-slate-700">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color.replace('bg-', 'bg-')}`}></span>
                      {item.bracket}
                    </span>
                    <span>{item.count} students ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 flex items-start gap-3">
              <Sparkles className="text-teal-600 shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] text-teal-800 font-medium leading-normal">
                Class average sits at <span className="font-bold">A- (84%)</span>. Overall engagement levels are high, with 78% of active users finishing weekly milestones early.
              </p>
            </div>
          </div>
        </div>

        {/* Module Progress Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <BarChart2 size={18} className="text-teal-600" /> Module Completion Progress
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Tracking completion ratios across the syllabus curriculum</p>
            </div>
            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1">
              Curriculum Details <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'M1', title: 'HTML5 Semantic Layouts', completion: 94, lessons: '4 lessons • 1 quiz', status: 'Optimal' },
              { id: 'M2', title: 'Advanced CSS & Responsive', completion: 78, lessons: '5 lessons • 2 quizzes', status: 'Healthy' },
              { id: 'M3', title: 'JavaScript & React Basics', completion: 45, lessons: '6 lessons • 1 assignment', status: 'Active' },
            ].map((module, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{module.id}</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5 truncate max-w-[180px]" title={module.title}>
                      {module.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{module.lessons}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase ${
                    module.completion > 85 ? 'bg-emerald-50 text-emerald-700' :
                    module.completion > 60 ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}>
                    {module.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Student Completion</span>
                    <span className="text-slate-800">{module.completion}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        module.completion > 85 ? 'bg-emerald-500' :
                        module.completion > 60 ? 'bg-blue-500' :
                        'bg-amber-500'
                      }`} 
                      style={{ width: `${module.completion}%` }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Leaderboard & Activity Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Students Leaders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles size={18} className="text-teal-600" /> Course Performers Leaderboard
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Top-ranked active student enrollments</p>
              </div>
              <Link 
                href={`/manager/courses/${id}/enrollments`}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                All Students <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400 font-bold bg-slate-50/20">
                    <th className="p-4 pl-6">Student</th>
                    <th className="p-4">Completed Lessons</th>
                    <th className="p-4 text-center">Average Score</th>
                    <th className="p-4">Progress %</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {MOCK_STUDENTS_LEADERBOARD.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-400 text-sm w-4 text-center">#{idx + 1}</span>
                          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">
                        {student.activeLessons} lessons completed
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                          {student.score}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="font-bold text-slate-700">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Link 
                          href={`/manager/courses/${id}/enrollments/${student.id}`} 
                          className="inline-flex items-center gap-1 py-1 px-2 text-[11px] font-bold text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          Details <ArrowUpRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/20 text-center">
              <span className="text-[11px] text-slate-500 font-medium">Top student roster updates instantly on session activity.</span>
            </div>
          </div>

          {/* Recent Live Activity Stream */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Activity size={18} className="text-teal-600" /> Recent Course Activity
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time student submissions & events</p>
            </div>
            
            <div className="p-5 divide-y divide-slate-100 space-y-4 flex-1">
              {MOCK_ACTIVITIES.map((act, idx) => (
                <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                  <div className={`p-2 rounded-lg ${act.bg} ${act.color} h-fit shrink-0`}>
                    <act.icon size={16} />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <p className="text-xs text-slate-600 leading-normal">
                      <span className="font-bold text-slate-900">{act.name}</span> {act.action}
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold truncate" title={act.detail}>
                      {act.detail}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1">
                      {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
                View Full Audit Log
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </LayoutShell>
  );
}

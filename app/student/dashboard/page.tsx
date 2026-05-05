'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  TrendingUp,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { mockNotifications } from '@/lib/mockData';

export default function StudentDashboard() {
  const [role, setRole] = useState<
    'student' | 'manager' | 'fellow' | 'admin'
  >('student');

  const handleSignOut = () => {
    // Mock sign out
    console.log('Signed out');
  };

  const handleRoleSwitch = (newRole: string) => {
    setRole(newRole as 'student' | 'manager' | 'fellow' | 'admin');
    console.log(`Switched to role: ${newRole}`);
  };

  return (
    <LayoutShell
      role={role}
      userName="Alex Johnson"
      pageTitle="Dashboard"
      unreadNotifications={mockNotifications.filter(n => !n.isRead).length}
      onSignOut={handleSignOut}
      onSwitchRole={handleRoleSwitch}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Student dashboard
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back, Alex! 👋
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Here&apos;s what&apos;s happening with your learning journey today. You have 2 lessons and 1 assignment to complete.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-950">
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Courses</p>
                <p className="mt-2 text-2xl font-bold">8</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Tasks</p>
                <p className="mt-2 text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Courses Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-950 flex items-center gap-2">
                  <TrendingUp size={20} className="text-teal-600" />
                  Continue Learning
                </h3>
                <Link
                  href="/student/courses"
                  className="text-teal-600 hover:text-teal-700 text-sm font-semibold transition"
                >
                  View all courses
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    title: 'Web Development Fundamentals',
                    level: 'Beginner',
                    progress: 75,
                    modules: 12,
                  },
                  {
                    title: 'Database Systems',
                    level: 'Intermediate',
                    progress: 60,
                    modules: 10,
                  },
                  {
                    title: 'Data Structures & Algorithms',
                    level: 'Intermediate',
                    progress: 40,
                    modules: 14,
                  },
                ].map((course, idx) => (
                  <div key={idx} className="p-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                          <span>{course.level}</span>
                          <span>•</span>
                          <span>{course.modules} Modules</span>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8 text-right">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-950 flex items-center gap-2">
                  <Clock size={20} className="text-teal-600" />
                  Upcoming
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  {
                    title: 'Live Class: React Hooks',
                    time: 'Today, 2:00 PM',
                    type: 'class',
                    color: 'bg-teal-50 text-teal-700 border-teal-100',
                  },
                  {
                    title: 'Quiz: JavaScript Basics',
                    time: 'Tomorrow, 10:00 AM',
                    type: 'quiz',
                    color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                  },
                  {
                    title: 'Assignment Due: CSS Grid',
                    time: 'May 30, 11:59 PM',
                    type: 'assignment',
                    color: 'bg-rose-50 text-rose-700 border-rose-100',
                  },
                ].map((event, idx) => (
                  <div key={idx} className="p-5 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border ${event.color}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="font-bold text-sm text-slate-900 leading-tight">
                      {event.title}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1.5">
                      <Clock size={12} />
                      {event.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                <Link
                  href="/student/calendar"
                  className="block w-full py-2.5 text-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-white hover:border-teal-300 hover:text-teal-700 transition shadow-sm"
                >
                  View Calendar
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

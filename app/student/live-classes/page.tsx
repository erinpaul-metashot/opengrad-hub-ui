'use client';
import React from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import LiveClassCard from '@/components/LiveClassCard';
import { mockLiveClasses, mockCourses } from '@/lib/mockData';
import { Radio, Calendar as CalendarIcon } from 'lucide-react';

export default function LiveClassesPage() {
  const liveNow = mockLiveClasses.filter(c => c.status === 'live');
  const upcoming = mockLiveClasses.filter(c => c.status === 'upcoming');
  const past = mockLiveClasses.filter(c => c.status === 'past');

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle="Live Classes"
      unreadNotifications={0}
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-10 pb-12">
        <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#034852] to-[#006d6c] p-8 text-white shadow-lg shadow-teal-900/10 md:p-10 relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-1/2"></div>
          
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-100 border border-white/10">
                <Radio size={12} className="text-teal-300 animate-pulse" />
                Synchronous
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Live Classes
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-teal-50/80 md:text-base">
                  Join expert-led sessions, collaborate with peers in real-time, and get your questions answered.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200/70 mb-1">Live Now</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">{liveNow.length}</p>
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping"></div>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 px-6 py-4 border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-200/70 mb-1">Upcoming</p>
                <p className="text-3xl font-bold">{upcoming.length}</p>
              </div>
            </div>
          </div>
        </section>

        {liveNow.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                 <Radio size={18} className="animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Happening Now</h3>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {liveNow.map(cls => {
                const course = mockCourses.find(c => c.id === cls.courseId);
                return (
                  <LiveClassCard
                    key={cls.id}
                    id={cls.id}
                    title={cls.title}
                    course={course?.title || 'N/A'}
                    startTime={cls.startTime}
                    status={cls.status as 'upcoming' | 'live' | 'past'}
                    meetingLink={cls.meetingLink}
                  />
                );
              })}
            </div>
          </section>
        )}

        {upcoming.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Upcoming Sessions</h3>
              <Link href="/student/calendar" className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1">
                <CalendarIcon size={14} />
                View Calendar
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map(cls => {
                const course = mockCourses.find(c => c.id === cls.courseId);
                return (
                  <LiveClassCard
                    key={cls.id}
                    id={cls.id}
                    title={cls.title}
                    course={course?.title || 'N/A'}
                    startTime={cls.startTime}
                    status={cls.status as 'upcoming' | 'live' | 'past'}
                    meetingLink={cls.meetingLink}
                  />
                );
              })}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section className="space-y-5">
             <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Past Sessions</h3>
            </div>
            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden divide-y divide-slate-100">
              {past.map(cls => {
                const course = mockCourses.find(c => c.id === cls.courseId);
                return (
                  <div key={cls.id} className="p-5 hover:bg-slate-50/50 transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-teal-700 uppercase tracking-widest">{course?.title}</p>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition">{cls.title}</h4>
                        <p className="text-xs text-slate-500">
                          Held on {new Date(cls.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      {cls.recordingLink && (
                        <a
                          href={cls.recordingLink}
                          className="inline-flex items-center justify-center rounded-xl bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200 transition-all hover:bg-teal-600 hover:text-white hover:ring-teal-600 active:scale-95 shadow-sm"
                        >
                          Watch Recording
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </LayoutShell>
  );
}


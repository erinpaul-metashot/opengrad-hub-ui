'use client';
import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCalendarEvents, mockCourses } from '@/lib/mockData';

const calendarMonthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const calendarEventDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const formatLocalDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 5));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const calendarDateKey = formatLocalDateKey(date);

    return mockCalendarEvents.filter(e => {
      return e.date === calendarDateKey;
    });
  };

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle="Calendar"
      unreadNotifications={0}
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Learning schedule
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  My Calendar
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Manage your learning schedule, track upcoming classes, and stay on top of your assignment deadlines.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-2xl bg-white/20 backdrop-blur-md px-6 py-4 border border-white/20 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-teal-100 mb-1">Today</p>
                <p className="text-3xl font-bold">May 05</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">{calendarMonthFormatter.format(currentDate)}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-slate-600"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(2026, 4, 5))}
                  className="px-4 py-2 text-sm font-bold text-teal-700 bg-teal-50 rounded-xl hover:bg-teal-100 transition"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-slate-600"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="bg-slate-50 text-center font-bold text-[10px] uppercase tracking-[0.2em] text-slate-500 py-4">
                    {d}
                  </div>
                ))}
                {days.map((date, idx) => {
                  const events = date ? getEventsForDate(date) : [];
                  const isToday = date && formatLocalDateKey(date) === '2026-05-05';

                  return (
                    <div
                      key={idx}
                      className={`bg-white p-2 sm:p-3 min-h-[100px] sm:min-h-[120px] transition-colors relative group ${date ? 'hover:bg-slate-50/80 cursor-pointer' : 'bg-slate-50/30'}`}
                    >
                      {date && (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-bold rounded-lg ${isToday ? 'bg-teal-600 text-white shadow-md' : 'text-slate-700'}`}>
                              {date.getDate()}
                            </span>
                            {events.length > 0 && (
                              <span className="flex h-1.5 w-1.5 rounded-full bg-teal-500"></span>
                            )}
                          </div>
                          <div className="space-y-1 overflow-hidden">
                            {events.slice(0, 2).map(e => (
                              <div key={e.id} className="px-1.5 py-0.5 rounded bg-teal-50 border border-teal-100 text-[10px] font-bold text-teal-700 truncate shadow-sm">
                                {e.title}
                              </div>
                            ))}
                            {events.length > 2 && (
                              <div className="text-[9px] font-bold text-slate-400 pl-1">
                                +{events.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-950">Upcoming Events</h3>
                <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Next 7 Days</span>
              </div>
              <div className="divide-y divide-slate-100">
                {mockCalendarEvents.slice(0, 5).map(event => {
                  const course = mockCourses.find(c => c.id === event.courseId);
                  return (
                    <div key={event.id} className="p-5 hover:bg-slate-50/50 transition-colors group">
                      <p className="font-bold text-sm text-slate-900 leading-tight group-hover:text-teal-700 transition">{event.title}</p>
                      <p className="text-xs font-medium text-slate-500 mt-1">{course?.title}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs font-bold text-teal-600 uppercase tracking-wide">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                        {calendarEventDateFormatter.format(new Date(`${event.date}T00:00:00Z`))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                <button className="w-full py-3 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition shadow-md shadow-teal-900/10">
                  Sync to Calendar
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl">
              <h4 className="font-bold text-lg mb-2">Did you know?</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Students who sync their learning calendar to their phones are 40% more likely to complete courses on time.
              </p>
              <div className="mt-5 pt-5 border-t border-slate-800">
                <button className="text-teal-400 text-xs font-bold uppercase tracking-widest hover:text-teal-300 transition">Learn more &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}


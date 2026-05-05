'use client';
import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import AssignmentCard from '@/components/AssignmentCard';
import { Search } from 'lucide-react';
import { mockAssignments, mockCourses } from '@/lib/mockData';

export default function StudentAssignmentsPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'submitted' | 'graded'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssignments = mockAssignments.filter((a) => {
    const course = mockCourses.find(c => c.id === a.courseId);
    return (filterStatus === 'all' || a.status === filterStatus) && 
           (a.title.toLowerCase().includes(searchTerm.toLowerCase()) || course?.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle="My Assignments"
      activeNavItem="Assignments"
      unreadNotifications={0}
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Academic tasks
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  My Assignments
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Keep track of your coursework, submit assignments, and review feedback from your instructors.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-slate-950">
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Open</p>
                <p className="mt-2 text-2xl font-bold text-center">
                  {mockAssignments.filter(a => a.status === 'open').length}
                </p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Pending</p>
                <p className="mt-2 text-2xl font-bold text-center">
                  {mockAssignments.filter(a => a.status === 'submitted').length}
                </p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Graded</p>
                <p className="mt-2 text-2xl font-bold text-center">
                  {mockAssignments.filter(a => a.status === 'graded').length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search assignments by title or course..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 min-w-[160px]"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((assign) => {
              const course = mockCourses.find(c => c.id === assign.courseId);
              return (
                <AssignmentCard
                  key={assign.id}
                  id={assign.id}
                  title={assign.title}
                  course={course?.title || 'N/A'}
                  dueDate={assign.dueDate}
                  status={assign.status as 'open' | 'submitted' | 'graded' | 'late'}
                  grade={assign.grade ?? undefined}
                />
              );
            })
          ) : (
            <div className="rounded-[2rem] border border-dashed border-teal-200 bg-teal-50/60 px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
                <Search size={28} />
              </div>
              <h2 className="mt-6 text-xl font-bold text-slate-950">No assignments found matching your criteria.</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}


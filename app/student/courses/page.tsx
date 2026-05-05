'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import CourseCard from '@/components/CourseCard';
import {
  ArrowUpDown,
  BookOpen,
  Grid2X2,
  List,
  Search,
} from 'lucide-react';
import { mockCourses } from '@/lib/mockData';

type FilterStatus = 'all' | 'inProgress' | 'completed';
type SortBy = 'recent' | 'progress' | 'a-z';
type ViewMode = 'grid' | 'list';

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');



  const visibleCourses = mockCourses
    .filter((course) => {
      const normalizedQuery = searchTerm.trim().toLowerCase();
      const searchableText = [course.title, course.instructor, course.programme]
        .join(' ')
        .toLowerCase();

      const matchesSearch = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'inProgress' && course.progress < 100) ||
        (filterStatus === 'completed' && course.progress === 100);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'a-z') return a.title.localeCompare(b.title);
      return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime();
    });

  const inProgressCount = mockCourses.filter((course) => course.progress > 0 && course.progress < 100).length;
  const completedCount = mockCourses.filter((course) => course.progress === 100).length;

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setSortBy('recent');
  };

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle="My Courses"
      unreadNotifications={2}
      activeNavItem="My Courses"
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Student learning hub
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  My Courses
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Search enrolled courses, sort by progress, and jump back into the next lesson or assignment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-slate-950">
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Courses</p>
                <p className="mt-2 text-3xl font-bold">{mockCourses.length}</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">In progress</p>
                <p className="mt-2 text-3xl font-bold">{inProgressCount}</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Completed</p>
                <p className="mt-2 text-3xl font-bold">{completedCount}</p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Enrolled courses</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{mockCourses.length}</p>
              </div>
              <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                <BookOpen size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Hidden by mock unenroll</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{hiddenCourseIds.length}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <SlidersHorizontal size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Visible after filters</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{visibleCourses.length}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <ArrowUpDown size={22} />
              </div>
            </div>
          </div>
        </section> */}

        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.9fr))_auto] xl:items-end">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Search</span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by title, instructor, or programme"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Progress</span>
              <select
                value={filterStatus}
                onChange={(event) => setFilterStatus(event.target.value as FilterStatus)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              >
                <option value="all">All</option>
                <option value="inProgress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortBy)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              >
                <option value="recent">Recent</option>
                <option value="progress">Progress</option>
                <option value="a-z">A-Z</option>
              </select>
            </label>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`}
              >
                <Grid2X2 size={16} />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${viewMode === 'list' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white'}`}
              >
                <List size={16} />
                List
              </button>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between px-1 text-sm text-slate-600">
          <p>
            Showing <span className="font-semibold text-slate-950">{visibleCourses.length}</span> course{visibleCourses.length === 1 ? '' : 's'}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-800"
          >
            <ArrowUpDown size={14} />
            Reset filters
          </button>
        </div>

        {visibleCourses.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3' : 'space-y-5'}>
            {visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                thumbnail={course.thumbnail}
                modulesCount={course.modulesCount}
                nextLesson={course.nextLesson}
                nextDueAssignment={course.nextDueAssignment ?? undefined}
                programme={course.programme}
                variant={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-teal-200 bg-teal-50/60 px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <BookOpen size={28} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-950">You&apos;re not enrolled in any courses yet.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Adjust your filters or restore the mock enrollments to browse the available courses again.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700"
              >
                Browse courses
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}

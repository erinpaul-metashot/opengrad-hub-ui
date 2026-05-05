'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Clock,
  HelpCircle,
  ArrowRight,
  Filter,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';
import { mockGlobalQuizzes } from '@/lib/mockData';
import Link from 'next/link';

type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function StudentQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockGlobalQuizzes.map(q => q.category)))];

  const filteredQuizzes = mockGlobalQuizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || quiz.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'All' || quiz.category === categoryFilter;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('All');
    setCategoryFilter('All');
  };

  return (
    <LayoutShell
      role="student"
      pageTitle="Global Quizzes"
      activeNavItem="Quizzes"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Knowledge assessment hub
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Global Quizzes
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Challenge yourself with curated assessments from our question bank. 
                  Sharpen your skills and track your progress across diverse topics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-950">
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[120px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Available</p>
                <p className="mt-2 text-3xl font-bold">{mockGlobalQuizzes.length}</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[120px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">New</p>
                <p className="mt-2 text-3xl font-bold">{mockGlobalQuizzes.filter(q => q.isNew).length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Search Quizzes</span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Difficulty</span>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as Difficulty)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 h-[46px]"
            >
              <ArrowUpDown size={16} />
              Reset
            </button>
          </div>
        </section>

        <div className="flex items-center justify-between px-1 text-sm text-slate-600">
          <p>
            Showing <span className="font-semibold text-slate-950">{filteredQuizzes.length}</span> quiz{filteredQuizzes.length === 1 ? '' : 'zes'}
          </p>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="group flex flex-col rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  quiz.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-600' :
                  quiz.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-600' :
                  'bg-rose-50 text-rose-600'
                }`}>
                  {quiz.difficulty}
                </div>
                {quiz.isNew && (
                  <span className="inline-flex items-center rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-700">
                    NEW
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {quiz.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2 flex-grow">
                {quiz.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-slate-50 p-2 text-slate-400">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Time</p>
                    <p className="text-xs font-bold text-slate-700">{quiz.duration}m</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-slate-50 p-2 text-slate-400">
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Items</p>
                    <p className="text-xs font-bold text-slate-700">{quiz.questionsCount}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {quiz.tags.map(tag => (
                  <span key={tag} className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500 ring-1 ring-inset ring-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <Link 
                href={`/student/quizzes/${quiz.id}/take`}
                className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700 group/btn"
              >
                Start Quiz
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-teal-200 bg-teal-50/60 px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-sm">
              <BookOpen size={28} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-950">No quizzes found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Try adjusting your filters or search terms to find what you&apos;re looking for.
            </p>
            <div className="mt-8">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}

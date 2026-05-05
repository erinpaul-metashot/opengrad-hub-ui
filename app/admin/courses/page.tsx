'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  BookOpen,
  Users,
  Eye,
  BarChart2,
  Archive,
  Download
} from 'lucide-react';

const MOCK_COURSES = [
  { id: 1, title: 'Web Development Fundamentals', programme: 'UG', state: 'Tamil Nadu', enrolled: 1240, completion: '75%', status: 'Active', instructor: 'Dr. Smith' },
  { id: 2, title: 'Advanced React Patterns', programme: 'PG', state: 'Kerala', enrolled: 450, completion: '60%', status: 'Active', instructor: 'Prof. Davis' },
  { id: 3, title: 'Basic Mathematics for CompSci', programme: 'School', state: 'All', enrolled: 3200, completion: '85%', status: 'Active', instructor: 'M. Johnson' },
  { id: 4, title: 'Database Systems', programme: 'UG', state: 'Karnataka', enrolled: 890, completion: '40%', status: 'Active', instructor: 'Dr. Lee' },
  { id: 5, title: 'Intro to Python', programme: 'School', state: 'Tamil Nadu', enrolled: 2100, completion: '0%', status: 'Draft', instructor: 'TBD' },
  { id: 6, title: 'Cloud Computing Architecture', programme: 'PG', state: 'All', enrolled: 150, completion: '90%', status: 'Archived', instructor: 'A. Patel' },
];

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCourses = MOCK_COURSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <LayoutShell
      role="admin"
      userName="Super Admin"
      pageTitle="Course Management"
      activeNavItem="Courses"
    >
      <div className="space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border border-slate-200">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Total Courses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{MOCK_COURSES.length}</p>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              {['All', 'Active', 'Draft', 'Archived'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    statusFilter === s 
                      ? 'bg-teal-100 text-teal-800' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Download size={16} />
              Export
            </button>
            <Link href="/admin/courses/assign" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Users size={16} />
              Assign Course
            </Link>
            <Link href="/admin/courses/new" className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95">
              <Plus size={16} />
              Create Course
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses by title or instructor..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white">
              <option>Programme: All</option>
              <option>School</option>
              <option>UG</option>
              <option>PG</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white">
              <option>State: All</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
            </select>
          </div>
        </div>

        {/* Courses Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Course Title</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Target</th>
                  <th className="p-4 text-right">Enrolled</th>
                  <th className="p-4 text-right">Avg Completion</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                            <BookOpen size={18} />
                          </div>
                          <span className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{course.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{course.instructor}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-slate-700">{course.programme}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{course.state}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/admin/courses/${course.id}/enrollments`} className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-teal-600 transition-colors group/link">
                          <Users size={14} className="text-slate-400 group-hover/link:text-teal-600 transition-colors" />
                          <span className="underline decoration-slate-300 underline-offset-2 group-hover/link:decoration-teal-600">{course.enrolled.toLocaleString()}</span>
                        </Link>
                      </td>
                      <td className="p-4 text-right font-medium text-slate-700">{course.completion}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          course.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                          course.status === 'Draft' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/courses/${course.id}/enrollments`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Manage Enrollments">
                            <Users size={16} />
                          </Link>
                          <Link href={`/admin/courses/${course.id}/curriculum`} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Edit Course Builder">
                            <Eye size={16} />
                          </Link>
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Course Analytics">
                            <BarChart2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Archive Course">
                            <Archive size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No courses found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50 text-sm text-slate-600">
            <div>Showing {filteredCourses.length} of {MOCK_COURSES.length} courses</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Prev</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
        
      </div>
    </LayoutShell>
  );
}

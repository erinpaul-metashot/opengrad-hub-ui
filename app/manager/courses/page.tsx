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
  Download,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const MOCK_COURSES = [
  { id: 1, title: 'Web Development Fundamentals', programme: 'UG', state: 'Tamil Nadu', enrolled: 1240, completion: '75%', status: 'Active', subject: 'Computer Science' },
  { id: 2, title: 'Advanced React Patterns', programme: 'PG', state: 'Kerala', enrolled: 450, completion: '60%', status: 'Active', subject: 'Computer Science' },
  { id: 3, title: 'Basic Mathematics for CompSci', programme: 'Global', state: 'All', enrolled: 3200, completion: '85%', status: 'Active', subject: 'Math' },
  { id: 4, title: 'Database Systems', programme: 'UG', state: 'Karnataka', enrolled: 890, completion: '40%', status: 'Active', subject: 'Computer Science' },
  { id: 5, title: 'Intro to Python', programme: 'Global', state: 'Tamil Nadu', enrolled: 2100, completion: '0%', status: 'Draft', subject: 'Computer Science' },
  { id: 6, title: 'Cloud Computing Architecture', programme: 'PG', state: 'All', enrolled: 150, completion: '90%', status: 'Archived', subject: 'Computer Science' },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Interactive client-side Archiving and Restoration State
  const [activeCourse, setActiveCourse] = useState<any | null>(null);
  const [modalType, setModalType] = useState<'archive' | 'restore'>('archive');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleArchiveToggle = (course: any) => {
    setActiveCourse(course);
    setModalType(course.status === 'Archived' ? 'restore' : 'archive');
  };

  const confirmArchiveToggle = () => {
    if (!activeCourse) return;
    
    const isArchived = activeCourse.status === 'Archived';
    const nextStatus = isArchived ? 'Active' : 'Archived';
    
    setCourses(prev => prev.map(c => c.id === activeCourse.id ? { ...c, status: nextStatus } : c));
    setToastMessage(`Course "${activeCourse.title}" successfully ${isArchived ? 'restored to Active status' : 'moved to Archived'}.`);
    setActiveCourse(null);
    
    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Course Management"
      activeNavItem="Courses"
    >
      <div className="space-y-6 relative">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="text-emerald-500" size={20} />
            <div className="text-sm font-semibold max-w-sm">{toastMessage}</div>
            <button 
              onClick={() => setToastMessage(null)}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border border-slate-200">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Total Courses</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{courses.length}</p>
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

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Download size={16} />
              Export
            </button>
            <Link href="/manager/courses/assign" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Users size={16} />
              Assign Course
            </Link>
            <Link href="/manager/courses/new" className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95">
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
              placeholder="Search courses by title or subject..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white">
              <option>Programme: All</option>
              <option>Global</option>
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
                  <th className="p-4">Subject</th>
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
                      <td className="p-4 text-slate-600 font-semibold">{course.subject}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-slate-700">{course.programme}</span>
                          <span className="text-[10px] text-slate-500 uppercase">{course.state}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/manager/courses/${course.id}/enrollments`} className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-teal-600 transition-colors group/link">
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
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/manager/courses/${course.id}/enrollments`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Manage Enrollments">
                            <Users size={16} />
                          </Link>
                          <Link href={`/manager/courses/${course.id}/curriculum`} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Edit Course Builder">
                            <Eye size={16} />
                          </Link>
                          <Link href={`/manager/courses/${course.id}/analytics`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Course Analytics">
                            <BarChart2 size={16} />
                          </Link>
                          <button 
                            onClick={() => handleArchiveToggle(course)}
                            className={`p-2 rounded-lg transition-colors ${
                              course.status === 'Archived' 
                                ? 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50' 
                                : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                            }`}
                            title={course.status === 'Archived' ? 'Restore Course' : 'Archive Course'}
                          >
                            {course.status === 'Archived' ? <RefreshCw size={16} /> : <Archive size={16} />}
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
            <div>Showing {filteredCourses.length} of {courses.length} courses</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Prev</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
        
      </div>

      {/* Confirmation Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  modalType === 'archive' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {modalType === 'archive' ? <AlertTriangle size={24} /> : <RefreshCw className="animate-spin-slow" size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {modalType === 'archive' ? 'Archive Course' : 'Restore Course'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Please confirm your selection below.</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-bold text-slate-800">{activeCourse.title}</p>
                <div className="flex gap-4 mt-2 text-xs text-slate-500 font-semibold">
                  <span>Programme: {activeCourse.programme}</span>
                  <span>•</span>
                  <span>State: {activeCourse.state}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {modalType === 'archive' 
                  ? 'Are you absolutely sure you want to archive this course? This will prevent students from enrolling and hide it from current catalog listings.'
                  : 'Are you sure you want to restore this course? It will return to Active status and students will be able to enroll and view the lessons.'
                }
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              <button 
                onClick={() => setActiveCourse(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmArchiveToggle}
                className={`px-5 py-2 text-sm font-bold text-white rounded-xl shadow-md transition-all active:scale-95 ${
                  modalType === 'archive' 
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-900/10' 
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/10'
                }`}
              >
                {modalType === 'archive' ? 'Archive' : 'Restore'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}


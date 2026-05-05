'use client';

import React from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import {
  ChevronRight,
  User,
  Mail,
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  BarChart2,
  ArrowLeft
} from 'lucide-react';

const MOCK_QUIZZES = [
  { id: 'q1', title: 'HTML Basics Quiz', score: 95, status: 'Completed', date: '2026-04-12' },
  { id: 'q2', title: 'CSS Layouts Assessment', score: 88, status: 'Completed', date: '2026-04-20' },
  { id: 'q3', title: 'JavaScript Fundamentals', score: 0, status: 'Not Started', date: '-' },
];

const MOCK_LESSONS = [
  { id: 'l1', title: 'Introduction to Web Dev', status: 'Completed', timeSpent: '45m' },
  { id: 'l2', title: 'Setup your Environment', status: 'Completed', timeSpent: '20m' },
  { id: 'l3', title: 'Advanced Flexbox', status: 'In Progress', timeSpent: '15m' },
];

export default function StudentDetailPage({ params }: { params: Promise<{ id: string, studentId: string }> }) {
  const unwrappedParams = React.use(params);
  const { id, studentId } = unwrappedParams;

  // Mock student data based on ID (simplified)
  const student = {
    id: studentId,
    name: 'Aarav Patel',
    email: 'aarav.p@example.com',
    enrolledDate: '2026-04-10',
    progress: 85,
    avgScore: 92,
    lessonsCompleted: 12,
    totalLessons: 15,
    lastActive: '2 hours ago'
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Student Progress Detail"
      activeNavItem="Courses"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/manager/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
          <ChevronRight size={14} />
          <Link href={`/manager/courses/${id}/enrollments`} className="hover:text-teal-600 transition-colors">Enrollments</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-semibold">{student.name}</span>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-teal-500 to-blue-600" />
          <div className="px-8 pb-8">
            <div className="relative flex items-end justify-between -mt-12 mb-6">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-lg border border-slate-100">
                  <div className="w-full h-full rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-3xl">
                    {student.name.charAt(0)}
                  </div>
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
                  <p className="text-slate-500 flex items-center gap-2 mt-1">
                    <Mail size={14} /> {student.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors">
                  Reset Progress
                </button>
                <button className="px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md">
                  Download Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Enrolled On</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar size={16} className="text-teal-500" /> {student.enrolledDate}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Progress</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <BarChart2 size={16} className="text-blue-500" /> {student.progress}%
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. Quiz Score</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Award size={16} className="text-purple-500" /> {student.avgScore}%
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Active</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" /> {student.lastActive}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Progress Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lessons Completion */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-teal-600" /> Lesson Activity
                </h2>
                <span className="text-xs font-bold text-slate-500">{student.lessonsCompleted} / {student.totalLessons} Completed</span>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-50 text-slate-400">
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">Lesson Title</th>
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">Time Spent</th>
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px] text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_LESSONS.map(lesson => (
                      <tr key={lesson.id}>
                        <td className="p-4 font-medium text-slate-800">{lesson.title}</td>
                        <td className="p-4 text-slate-500">{lesson.timeSpent}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lesson.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {lesson.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quizzes Performance */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Award size={18} className="text-purple-600" /> Quiz & Assessments
                </h2>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-50 text-slate-400">
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">Assessment</th>
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">Completed Date</th>
                      <th className="p-4 font-semibold uppercase tracking-wider text-[10px] text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_QUIZZES.map(quiz => (
                      <tr key={quiz.id}>
                        <td className="p-4 font-medium text-slate-800">{quiz.title}</td>
                        <td className="p-4 text-slate-500">{quiz.date}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center gap-1 font-bold ${
                            quiz.status === 'Completed' ? 'text-teal-600' : 'text-slate-400'
                          }`}>
                            {quiz.status === 'Completed' ? quiz.score + '%' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Course Progress</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      {student.progress}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
                  <div 
                    style={{ width: `${student.progress}%` }} 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500" 
                  />
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Modules Completed</span>
                  <span className="font-bold text-slate-900">4 / 5</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Total Study Time</span>
                  <span className="font-bold text-slate-900">12h 45m</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Avg. Engagement</span>
                  <span className="font-bold text-slate-900 text-emerald-600">High</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Award size={80} />
              </div>
              <h3 className="font-bold text-lg mb-2">Instructor Note</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Aarav is performing exceptionally well in the foundational modules. Recommend moving to advanced patterns early.
              </p>
              <button className="text-teal-400 text-sm font-bold flex items-center gap-1 hover:text-teal-300 transition-colors">
                Add New Note <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

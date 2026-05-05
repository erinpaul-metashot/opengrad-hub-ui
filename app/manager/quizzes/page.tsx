'use client';

import React, { useState} from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileQuestion,
  BarChart2,
  Clock
} from 'lucide-react';

const MOCK_QUIZZES = [
  { id: 1, title: 'HTML & CSS Basics', course: 'Web Development Fundamentals', questions: 20, duration: '30 mins', attempts: 124, status: 'Active' },
  { id: 2, title: 'Advanced React Patterns Final', course: 'Advanced React Patterns', questions: 50, duration: '60 mins', attempts: 45, status: 'Active' },
  { id: 3, title: 'Mid-term Assessment', course: 'Basic Mathematics', questions: 25, duration: '45 mins', attempts: 0, status: 'Draft' },
  { id: 4, title: 'SQL Joins Practice', course: 'Database Systems', questions: 15, duration: 'Unlimited', attempts: 320, status: 'Active' },
];

export default function QuizzesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const filteredQuizzes = MOCK_QUIZZES.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (quiz: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setEditingQuiz(quiz);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingQuiz(null);
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Quiz Management"
      activeNavItem="Quizzes"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileQuestion className="text-purple-600" size={24} />
              Quizzes
            </h1>
            <p className="text-sm text-slate-500 mt-1">Create and manage standalone and course-linked quizzes.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-900/10 transition hover:bg-purple-700 active:scale-95"
          >
            <Plus size={16} />
            Create Quiz
          </button>
        </div>

        {/* Filters & Search */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by quiz title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:bg-white">
              <option>Status: All</option>
              <option>Active</option>
              <option>Draft</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:bg-white">
              <option>Course: All</option>
              <option>Web Dev</option>
              <option>React</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Quiz Details</th>
                  <th className="p-4">Linked Course</th>
                  <th className="p-4 text-center">Questions</th>
                  <th className="p-4 text-right">Attempts</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredQuizzes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <FileQuestion size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[200px]">{q.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Clock size={12} /> {q.duration}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700 truncate max-w-[200px]">{q.course}</td>
                    <td className="p-4 text-center text-slate-600 font-medium">{q.questions}</td>
                    <td className="p-4 text-right font-medium text-slate-700">{q.attempts}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        q.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Results">
                          <BarChart2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(q)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Quiz"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Quiz">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Mock for Creation/Edit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileQuestion className="text-purple-600" size={20} />
              {editingQuiz ? 'Edit Quiz' : 'Create Quiz'}
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Quiz Title</label>
                <input 
                  type="text" 
                  defaultValue={editingQuiz?.title}
                  placeholder="e.g., Module 1 Mid-term" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Link to Course (Optional)</label>
                <select 
                  defaultValue={editingQuiz?.course || "Select a course..."}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500 text-slate-700"
                >
                  <option>Select a course...</option>
                  <option>Web Development Fundamentals</option>
                  <option>Advanced React Patterns</option>
                  <option>Basic Mathematics</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Duration (mins)</label>
                  <input 
                    type="text" 
                    defaultValue={editingQuiz?.duration?.replace(' mins', '')}
                    placeholder="e.g., 30" 
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Max Attempts</label>
                  <input type="number" placeholder="Unlimited" className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-purple-500" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button 
                onClick={() => {
                  handleCloseModal();
                  router.push(`/manager/quizzes/${editingQuiz?.id || 1}/builder`); // Redirect to standalone quiz builder
                }}
                className="px-4 py-2 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors shadow-md"
              >
                {editingQuiz ? 'Update & Open Builder' : 'Continue to Builder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

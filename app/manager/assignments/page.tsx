'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Inbox
} from 'lucide-react';

const MOCK_ASSIGNMENTS = [
  { id: 1, title: 'Build a Personal Portfolio', course: 'Web Development', dueDate: 'Oct 15, 2026', submissions: 45, pendingGrading: 12, status: 'Active' },
  { id: 2, title: 'React Hooks Project', course: 'Advanced React Patterns', dueDate: 'Oct 20, 2026', submissions: 15, pendingGrading: 0, status: 'Active' },
  { id: 3, title: 'Calculus Mid-Term Paper', course: 'Basic Mathematics', dueDate: 'Nov 05, 2026', submissions: 0, pendingGrading: 0, status: 'Draft' },
  { id: 4, title: 'SQL Database Design', course: 'Database Systems', dueDate: 'Sep 30, 2026', submissions: 120, pendingGrading: 5, status: 'Closed' },
];

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const filteredAssignments = MOCK_ASSIGNMENTS.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (assignment: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setEditingAssignment(assignment);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingAssignment(null);
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Assignments"
      activeNavItem="Assignments"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="text-orange-600" size={24} />
              Assignments
            </h1>
            <p className="text-sm text-slate-500 mt-1">Create, manage, and grade student assignments.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-900/10 transition hover:bg-orange-700 active:scale-95"
          >
            <Plus size={16} />
            Create Assignment
          </button>
        </div>

        {/* Filters & Search */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by assignment title or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:bg-white">
              <option>Status: All</option>
              <option>Active</option>
              <option>Closed</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Assignment Details</th>
                  <th className="p-4">Target Course</th>
                  <th className="p-4 text-right">Submissions</th>
                  <th className="p-4 text-right">Pending Grade</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAssignments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[220px]">{a.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <Calendar size={12} /> Due: {a.dueDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700 truncate max-w-[180px]">{a.course}</td>
                    <td className="p-4 text-right font-semibold text-slate-700">{a.submissions}</td>
                    <td className="p-4 text-right">
                      {a.pendingGrading > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg">
                          <AlertCircle size={12} /> {a.pendingGrading}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">0</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        a.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                        a.status === 'Closed' ? 'bg-slate-100 text-slate-600' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Grade Submissions">
                          <Inbox size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(a)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Assignment"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Assignment">
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
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">{editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-6 flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Assignment Title</label>
                <input 
                  type="text" 
                  defaultValue={editingAssignment?.title}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500" 
                  placeholder="e.g., Final Portfolio Project" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description / Instructions</label>
                <textarea rows={6} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500 resize-none" placeholder="Provide detailed instructions..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Link to Course</label>
                  <select 
                    defaultValue={editingAssignment?.course || "Select a course..."}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500"
                  >
                    <option>Select a course...</option>
                    <option>Web Development</option>
                    <option>Advanced React Patterns</option>
                    <option>Database Systems</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Due Date</label>
                  <input type="datetime-local" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-500" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50">
              <button onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors flex items-center gap-2 shadow-md">
                <CheckCircle2 size={16} /> {editingAssignment ? 'Update Assignment' : 'Save Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

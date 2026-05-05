'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Video,
  Calendar,
  Users,
  PlayCircle,
  ExternalLink
} from 'lucide-react';

const MOCK_LIVE_CLASSES = [
  { id: 1, topic: 'React Hooks Deep Dive', course: 'Advanced React Patterns', instructor: 'Prof. Davis', date: 'Oct 15, 2026', time: '10:00 AM', enrolled: 124, status: 'Upcoming' },
  { id: 2, topic: 'Intro to SQL Joins', course: 'Database Systems', instructor: 'Dr. Lee', date: 'Oct 16, 2026', time: '02:00 PM', enrolled: 89, status: 'Upcoming' },
  { id: 3, title: 'Calculus Review Session', course: 'Basic Mathematics', instructor: 'M. Johnson', date: 'Oct 10, 2026', time: '09:00 AM', enrolled: 320, status: 'Completed' },
  { id: 4, title: 'CSS Grid vs Flexbox', course: 'Web Development', instructor: 'Dr. Smith', date: 'Oct 12, 2026', time: '11:00 AM', enrolled: 150, status: 'Completed' },
];

export default function LiveClassesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [activeTab, setActiveTab] = useState('Upcoming');

  const filteredClasses = MOCK_LIVE_CLASSES.filter(c =>
    (c.topic?.toLowerCase().includes(searchTerm.toLowerCase()) || c.title?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    c.status === activeTab
  );

  const handleEdit = (c: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setEditingClass(c);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingClass(null);
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Live Classes"
      activeNavItem="Live Classes"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Video className="text-indigo-600" size={24} />
              Live Classes
            </h1>
            <p className="text-sm text-slate-500 mt-1">Schedule and manage live interactive sessions.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-900/10 transition hover:bg-indigo-700 active:scale-95"
          >
            <Plus size={16} />
            Schedule Class
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['Upcoming', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Topic / Date</th>
                  <th className="p-4">Target Course</th>
                  <th className="p-4">Instructor</th>
                  <th className="p-4 text-right">Enrolled</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredClasses.length > 0 ? filteredClasses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                          <Video size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 truncate max-w-[220px]">{c.topic || c.title}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                            <Calendar size={12} className="text-indigo-400" /> 
                            <span className="text-indigo-600">{c.date}</span> at {c.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700 truncate max-w-[180px]">{c.course}</td>
                    <td className="p-4 text-slate-600">{c.instructor}</td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <Users size={14} className="text-slate-400" /> {c.enrolled}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {activeTab === 'Upcoming' ? (
                          <>
                            <button className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                              <PlayCircle size={14} /> Start
                            </button>
                            <button 
                              onClick={() => handleEdit(c)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Session"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel Session">
                              <Trash2 size={16} />
                            </button>
                          </>
                        ) : (
                          <button className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5">
                            <ExternalLink size={14} /> View Recording
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      No {activeTab.toLowerCase()} classes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Mock for Creation/Edit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Video className="text-indigo-600" size={20} />
              {editingClass ? 'Edit Live Class' : 'Schedule Live Class'}
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Topic</label>
                <input 
                  type="text" 
                  defaultValue={editingClass?.topic || editingClass?.title}
                  placeholder="e.g., Q&A Session" 
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Course / Cohort</label>
                <select 
                  defaultValue={editingClass?.course || "Select a course..."}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-700"
                >
                  <option>Select a course...</option>
                  <option>Web Development</option>
                  <option>Basic Mathematics</option>
                  <option>Advanced React Patterns</option>
                  <option>Database Systems</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Date</label>
                  <input 
                    type="text" 
                    defaultValue={editingClass?.date}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-700" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Time</label>
                  <input 
                    type="text" 
                    defaultValue={editingClass?.time}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-700" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Meeting Link (e.g., Zoom/Meet)</label>
                <input type="url" placeholder="https://zoom.us/j/..." className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 text-slate-700" />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleCloseModal} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-md flex items-center gap-2">
                <Calendar size={16} /> {editingClass ? 'Update Class' : 'Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

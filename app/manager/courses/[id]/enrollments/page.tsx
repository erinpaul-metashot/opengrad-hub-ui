'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import {
  ChevronRight,
  Search,
  Users,
  UserPlus,
  MoreVertical,
  Activity,
  Award,
  Filter,
  Download,
  Trash2,
  X,
  CheckCircle2,
  Square,
  CheckSquare,
  Settings,
  RefreshCw,
  FileText
} from 'lucide-react';

const MOCK_ENROLLMENTS = [
  { id: '1', name: 'Aarav Patel', email: 'aarav.p@example.com', enrolledDate: '2026-04-10', progress: 85, lastActive: '2 hours ago', status: 'Active', score: 92 },
  { id: '2', name: 'Diya Sharma', email: 'diya.s@example.com', enrolledDate: '2026-04-12', progress: 100, lastActive: '1 day ago', status: 'Completed', score: 95 },
  { id: '3', name: 'Rohan Gupta', email: 'rohan.g@example.com', enrolledDate: '2026-04-15', progress: 45, lastActive: '3 days ago', status: 'Active', score: 78 },
  { id: '4', name: 'Ananya Singh', email: 'ananya.s@example.com', enrolledDate: '2026-04-05', progress: 10, lastActive: '2 weeks ago', status: 'Inactive', score: 40 },
  { id: '5', name: 'Vihaan Kumar', email: 'vihaan.k@example.com', enrolledDate: '2026-05-01', progress: 60, lastActive: '1 hour ago', status: 'Active', score: 88 },
];

const MOCK_USERS_TO_ENROLL = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex.j@example.com', roll: 'TN_CUET_001' },
  { id: 'u2', name: 'Michael Brown', email: 'michael.b@example.com', roll: 'TN_CUET_002' },
  { id: 'u3', name: 'Priya Kumar', email: 'priya.k@example.com', roll: 'KL_SCH_045' },
];

export default function CourseEnrollmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  const filteredStudents = MOCK_ENROLLMENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Course Enrollments"
      activeNavItem="Courses"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Link href="/manager/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
              <ChevronRight size={14} />
              <span className="truncate max-w-[150px] font-semibold text-slate-700">Course {id}</span>
              <ChevronRight size={14} />
              <span className="text-slate-900 font-bold">Enrollments</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Enrolled Students</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track student progress for this course.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button 
              onClick={() => setShowEnrollModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-900/10 rounded-xl transition-all active:scale-95"
            >
              <UserPlus size={16} />
              Enroll Student
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</p>
              <p className="text-2xl font-bold text-slate-900">1,240</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Progress</p>
              <p className="text-2xl font-bold text-slate-900">68%</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Score</p>
              <p className="text-2xl font-bold text-slate-900">84%</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none appearance-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Student</th>
                  <th className="p-4">Enrolled On</th>
                  <th className="p-4 w-48">Course Progress</th>
                  <th className="p-4 text-center">Avg Score</th>
                  <th className="p-4">Status / Last Active</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <Link href={`/manager/courses/${id}/enrollments/${student.id}`} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {student.enrolledDate}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                student.progress === 100 ? 'bg-emerald-500' : 'bg-teal-500'
                              }`} 
                              style={{ width: `${student.progress}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                          {student.score}%
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div>
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              student.status === 'Active' ? 'bg-blue-50 text-blue-700' :
                              student.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {student.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">
                            {student.lastActive}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right relative">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === student.id ? null : student.id)}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="More Actions"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        
                        {/* Mock Dropdown Menu */}
                        {activeMenu === student.id && (
                          <div className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-10 py-1 animate-in fade-in zoom-in-95 duration-100">
                            <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <RefreshCw size={14} className="text-slate-400" /> Reset Progress
                            </button>
                            <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <Settings size={14} className="text-slate-400" /> Change Status
                            </button>
                            <button className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                              <FileText size={14} className="text-slate-400" /> View Detailed Report
                            </button>
                            <div className="h-px bg-slate-50 my-1" />
                            <button className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                              <Trash2 size={14} /> Remove Enrollment
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users size={32} className="text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-700">No students found</p>
                        <p className="text-sm">Try adjusting your filters or search term.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50/50 text-sm text-slate-600">
            <div>Showing {filteredStudents.length} of {MOCK_ENROLLMENTS.length} students</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Prev</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll Student Slide-over / Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Enroll Students</h2>
              <button 
                onClick={() => { setShowEnrollModal(false); setSelectedUsers([]); }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 space-y-6">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search users to enroll..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Users</p>
                {MOCK_USERS_TO_ENROLL.map(user => (
                  <div 
                    key={user.id}
                    onClick={() => toggleUserSelection(user.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      selectedUsers.includes(user.id) ? 'border-teal-500 bg-teal-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <div className="text-slate-400">
                      {selectedUsers.includes(user.id) ? <CheckSquare size={20} className="text-teal-600" /> : <Square size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.roll} • {user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                onClick={() => { setShowEnrollModal(false); setSelectedUsers([]); }}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button 
                disabled={selectedUsers.length === 0}
                onClick={() => {
                  alert(`Successfully enrolled ${selectedUsers.length} students!`);
                  setShowEnrollModal(false);
                  setSelectedUsers([]);
                }}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md disabled:opacity-50"
              >
                Enroll Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

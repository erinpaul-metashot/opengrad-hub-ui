'use client';

import React, { useState, useMemo } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { 
  ChevronRight, 
  Search, 
  CheckSquare, 
  Square,
  Users,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', roll: 'TN_CUET_001', prog: 'UG', state: 'Tamil Nadu', school: 'Model College' },
  { id: 2, name: 'Michael Brown', roll: 'TN_CUET_002', prog: 'UG', state: 'Tamil Nadu', school: 'City Science College' },
  { id: 3, name: 'Priya Kumar', roll: 'KL_SCH_045', prog: 'School', state: 'Kerala', school: 'Govt Higher Sec' },
  { id: 4, name: 'Karthik Raja', roll: 'TN_PG_012', prog: 'PG', state: 'Tamil Nadu', school: 'Madurai University' },
];

const MOCK_COURSES = [
  { id: 1, title: 'Web Development Fundamentals', prog: 'UG', modules: 12, status: 'Active' },
  { id: 2, title: 'Basic Mathematics for CompSci', prog: 'School', modules: 8, status: 'Active' },
  { id: 3, title: 'Advanced React Patterns', prog: 'PG', modules: 15, status: 'Active' },
];

export default function CourseAssignPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [progFilters, setProgFilters] = useState<string[]>([]);
  const [stateFilter, setStateFilter] = useState('All States');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           user.roll.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProg = progFilters.length === 0 || progFilters.includes(user.prog);
      const matchesState = stateFilter === 'All States' || user.state === stateFilter;
      return matchesSearch && matchesProg && matchesState;
    });
  }, [searchQuery, progFilters, stateFilter]);

  const toggleProgFilter = (prog: string) => {
    setProgFilters(prev => prev.includes(prog) ? prev.filter(p => p !== prog) : [...prev, prog]);
  };

  const toggleUser = (id: number) => {
    setSelectedUserIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  
  const toggleAllUsers = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    }
  };

  const toggleCourse = (id: number) => {
    setSelectedCourseIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    window.location.href = '/admin/courses';
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Assign Courses"
      activeNavItem="Courses"
    >
      <div className="max-w-6xl mx-auto space-y-6 pb-20">
        
        {/* Header & Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/manager/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Assign</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Assign Courses</h1>
              <p className="text-sm text-slate-500 mt-1">Step {step} of 2 â€” {step === 1 ? 'Select users to assign' : 'Select courses to assign'}</p>
            </div>
            
            {/* Progress Pills */}
            <div className="flex items-center gap-2">
              <div className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${step === 1 ? 'bg-teal-600 text-white shadow-md' : 'bg-teal-50 text-teal-700'}`}>
                1. Select Users
              </div>
              <div className={`w-8 h-px bg-slate-300`}></div>
              <div className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${step === 2 ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                2. Select Courses
              </div>
            </div>
          </div>
        </div>

        {step === 1 ? (
          /* --- STEP 1: SELECT USERS --- */
          <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Left Filter Bar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Filter size={16} className="text-teal-600" /> Filters
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Name, roll..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-sm rounded-lg border border-slate-200 py-2 pl-8 pr-3 outline-none focus:border-teal-500" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Programme</label>
                  <div className="space-y-2">
                    {['School', 'UG', 'PG'].map(prog => (
                      <label key={prog} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={progFilters.includes(prog)}
                          onChange={() => toggleProgFilter(prog)}
                          className="w-4 h-4 text-teal-600 rounded border-slate-300" 
                        />
                        <span className="text-sm text-slate-700">{prog}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">State</label>
                  <select 
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="w-full text-sm rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-500"
                  >
                    <option>All States</option>
                    <option>Tamil Nadu</option>
                    <option>Kerala</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right User Table */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  <span className="text-teal-600 font-bold">{selectedUserIds.length}</span> users selected
                </p>
                <div className="flex gap-2">
                  <button onClick={toggleAllUsers} className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                    {selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0 ? 'Deselect All' : 'Select All Filtered'}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/30">
                      <th className="p-4 w-12 text-center">
                        <button onClick={toggleAllUsers} className="text-slate-400 hover:text-teal-600">
                          {selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0 ? <CheckSquare size={18} className="text-teal-600" /> : <Square size={18} />}
                        </button>
                      </th>
                      <th className="p-4 font-semibold">Student Name</th>
                      <th className="p-4 font-semibold">Roll Number</th>
                      <th className="p-4 font-semibold">Programme</th>
                      <th className="p-4 font-semibold">School/College</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => {
                      const isSelected = selectedUserIds.includes(user.id);
                      return (
                        <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${isSelected ? 'bg-teal-50/30' : ''}`} onClick={() => toggleUser(user.id)}>
                          <td className="p-4 text-center">
                            {isSelected ? <CheckSquare size={18} className="text-teal-600 mx-auto" /> : <Square size={18} className="text-slate-300 mx-auto" />}
                          </td>
                          <td className="p-4 font-medium text-slate-900">{user.name}</td>
                          <td className="p-4 text-slate-600">{user.roll}</td>
                          <td className="p-4 text-slate-600">{user.prog}</td>
                          <td className="p-4 text-slate-600">{user.school}</td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">No users match your filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button 
                  disabled={selectedUserIds.length === 0}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all disabled:opacity-50 disabled:hover:bg-teal-600 flex items-center gap-2"
                >
                  Next Step <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* --- STEP 2: SELECT COURSES --- */
          <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Left Filter Bar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen size={16} className="text-teal-600" /> Assignment Options
                </h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date (Optional)</label>
                  <input type="date" className="w-full text-sm rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-500 text-slate-700" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Access Until (Optional)</label>
                  <input type="date" className="w-full text-sm rounded-lg border border-slate-200 p-2 outline-none focus:border-teal-500 text-slate-700" />
                </div>
              </div>
            </div>

            {/* Right Course Grid */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">
                  <span className="text-teal-600 font-bold">{selectedCourseIds.length}</span> courses selected
                </p>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search courses..." className="w-full text-sm rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 outline-none" />
                </div>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {MOCK_COURSES.map(course => {
                  const isSelected = selectedCourseIds.includes(course.id);
                  return (
                    <div 
                      key={course.id}
                      onClick={() => toggleCourse(course.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-teal-500 bg-teal-50/20' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      <div className="absolute top-4 right-4 text-slate-400">
                        {isSelected ? <CheckSquare size={20} className="text-teal-600" /> : <Square size={20} />}
                      </div>
                      <div className="pr-8">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{course.prog}</span>
                        <h4 className="font-bold text-slate-900 mt-1 mb-2 line-clamp-2">{course.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><BookOpen size={12} /> {course.modules} modules</span>
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] uppercase">Active</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <button 
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  disabled={selectedCourseIds.length === 0}
                  onClick={() => setShowConfirmModal(true)}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all disabled:opacity-50 disabled:hover:bg-teal-600"
                >
                  Review & Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-slate-900">Confirm Assignment</h3>
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 mb-6">
              <p className="text-sm text-slate-700 mb-2">You are about to assign:</p>
              <ul className="list-disc pl-5 text-sm font-bold text-slate-900 space-y-1 mb-4">
                {MOCK_COURSES.filter(c => selectedCourseIds.includes(c.id)).map(c => (
                  <li key={c.id}>{c.title}</li>
                ))}
              </ul>
              
              <p className="text-sm text-slate-700 mb-2">To the following users:</p>
              <p className="text-sm font-bold text-slate-900">
                {selectedUserIds.length} users selected
              </p>
            </div>
            
            <p className="text-xs text-slate-500 mb-6">Students will see these courses in their dashboard immediately. Notifications will be sent via email and in-app.</p>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-900/10 rounded-xl transition-colors"
              >
                Confirm Assign
              </button>
            </div>
          </div>
        </div>
      )}

    </LayoutShell>
  );
}


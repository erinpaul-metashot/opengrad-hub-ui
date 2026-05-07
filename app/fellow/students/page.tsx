'use client';

import React, { useState } from 'react';
import { Search, Filter, GraduationCap, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { mockFellowStudents } from '@/lib/mockData';

export default function FellowStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = mockFellowStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.roll.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = programFilter === 'All' || student.programType === programFilter;
    const matchesDistrict = districtFilter === 'All' || student.districtStatus === districtFilter;
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'At Risk' && student.statistics.averageGrade < 60) || (statusFilter === 'On Track' && student.statistics.averageGrade >= 60);
    
    return matchesSearch && matchesProgram && matchesDistrict && matchesStatus;
  });

  // Unique filters
  const programs = ['All', ...Array.from(new Set(mockFellowStudents.map(s => s.programType)))];
  const districts = ['All', ...Array.from(new Set(mockFellowStudents.map(s => s.districtStatus)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Students
          </h1>
          <p className="text-sm text-slate-500">
            Monitor the progress and details of students assigned to you.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search students by name or roll no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto md:flex md:gap-4">
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="w-full md:w-auto pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              {programs.map(p => <option key={p} value={p}>{p === 'All' ? 'All Programs' : p}</option>)}
            </select>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full md:w-auto pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              {districts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>)}
            </select>
          </div>

          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              <option value="All">All Status</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">School</th>
                <th className="px-6 py-4">Program & District</th>
                <th className="px-6 py-4">Overall Progress</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{student.name}</span>
                          {student.statistics.averageGrade < 60 && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-rose-600 border border-rose-100 shadow-sm animate-pulse">
                              <AlertCircle size={10} />
                              At Risk
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{student.roll}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{student.schoolName}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center text-xs text-slate-600">
                          <GraduationCap size={12} className="mr-1" /> {student.programType}
                        </span>
                        <span className="inline-flex items-center text-xs text-slate-600">
                          <MapPin size={12} className="mr-1" /> {student.districtStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 max-w-[200px]">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${student.progress >= 75 ? 'bg-emerald-500' : student.progress >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/fellow/students/${student.id}`} className="inline-block px-4 py-2 bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium rounded-lg transition-colors text-xs">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

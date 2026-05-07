'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Mail, Users, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { mockSchools, mockFellowStudents } from '@/lib/mockData';

export default function FellowSchoolDetails() {
  const { id } = useParams();
  const router = useRouter();

  const school = mockSchools.find(s => s.id === id);
  const students = mockFellowStudents.filter(s => s.schoolId === id);

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-slate-800">School not found</h2>
        <button
          onClick={() => router.push('/fellow/schools')}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Back to Schools
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/fellow/schools')}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 items-start">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {school.name}
            </h1>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
              school.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}>
              {school.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="flex items-center"><MapPin size={14} className="mr-1 shrink-0" /> {school.district}</span>
            <span className="flex items-center"><Mail size={14} className="mr-1 shrink-0" /> {school.contactEmail}</span>
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
            <Users size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="w-full flex-1 min-w-0">
            <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{school.studentsCount}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">Total Enrolled</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <BookOpen size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="w-full flex-1 min-w-0">
            <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">{school.averageProgress}%</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">Avg Progress</p>
          </div>
        </div>
        {/* Placeholder for more metrics */}
        <div className="bg-white p-4 sm:p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col justify-between gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <BookOpen size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="w-full flex-1 min-w-0">
            <p className="text-lg sm:text-xl font-black text-slate-900 leading-tight">12</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5 truncate">Active Courses</p>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between">
           <h3 className="font-bold text-lg text-slate-900">Students in this School</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.length > 0 ? (
                students.map((student) => (
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
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{student.roll}</td>
                    <td className="px-6 py-4 text-slate-600">{student.programType}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/fellow/students/${student.id}`} className="text-teal-600 font-medium hover:text-teal-800 transition">
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No students currently assigned to this school under your supervision.
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

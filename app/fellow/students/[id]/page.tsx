'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, GraduationCap, MapPin, BookOpen, Clock, BarChart, AlertCircle } from 'lucide-react';
import { mockFellowStudents } from '@/lib/mockData';

export default function FellowStudentDetails() {
  const { id } = useParams();
  const router = useRouter();

  const student = mockFellowStudents.find(s => s.id === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-slate-800">Student not found</h2>
        <button
          onClick={() => router.push('/fellow/students')}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/fellow/students')}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {student.name}
            </h1>
            <span className="text-sm font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
              {student.roll}
            </span>
            {student.statistics.averageGrade < 60 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-tight text-rose-600 border border-rose-100 shadow-sm animate-pulse">
                <AlertCircle size={12} />
                Needs Attention
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-2 flex items-center gap-4 flex-wrap">
            <span className="flex items-center"><MapPin size={14} className="mr-1" /> {student.schoolName} ({student.districtStatus})</span>
            <span className="flex items-center"><GraduationCap size={14} className="mr-1" /> {student.programType}</span>
          </p>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
            <BarChart size={24} />
          </div>
          <div className="w-full">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Overall Progress</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-teal-500 h-1.5 rounded-full"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
              <p className="text-lg font-bold text-slate-900">{student.progress}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Attendance</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student.statistics.attendance}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Assignments Done</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student.statistics.assignmentsCompleted}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Avg Grade</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student.statistics.averageGrade}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Enrolled Courses</h2>
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm divide-y divide-slate-100">
            {student.courses.map((course, idx) => (
              <div key={idx} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl text-slate-500">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{course}</h3>
                      <p className="text-sm text-slate-500 mt-1">Active Course • Enrolled recently</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
                    View Course Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Info Side */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6 space-y-4">
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors">
              <p className="font-bold text-slate-900 text-sm">Message Student</p>
              <p className="text-xs text-slate-500 mt-1">Send a direct message</p>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-colors">
              <p className="font-bold text-slate-900 text-sm">Request Meeting</p>
              <p className="text-xs text-slate-500 mt-1">Schedule a 1-on-1 session</p>
            </button>
            <button className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <p className="font-bold text-slate-900 text-sm">Download Report</p>
              <p className="text-xs text-slate-500 mt-1">Export full progress report (PDF)</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

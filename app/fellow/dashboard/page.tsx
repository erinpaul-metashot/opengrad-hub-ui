'use client';

import React from 'react';
import { Building2, Users, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { mockSchools, mockFellowStudents } from '@/lib/mockData';

export default function FellowDashboard() {
  const totalSchools = mockSchools.length;
  const totalStudents = mockFellowStudents.length;
  const avgProgress = Math.round(
    mockFellowStudents.reduce((acc, curr) => acc + curr.progress, 0) / totalStudents
  );
  const schoolsNeedingAttention = mockSchools.filter(s => s.status === 'Needs Attention').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Fellow Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of your assigned schools and students.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric Cards */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-teal-50 p-3 text-teal-600">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Schools</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalSchools}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Students</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalStudents}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg Progress</p>
              <h3 className="text-2xl font-bold text-slate-900">{avgProgress}%</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-rose-50 p-3 text-rose-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Needs Attention</p>
              <h3 className="text-2xl font-bold text-slate-900">{schoolsNeedingAttention}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Schools */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Schools Overview</h3>
            <Link href="/fellow/schools" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockSchools.slice(0, 3).map((school) => (
              <div key={school.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900">{school.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{school.district} • {school.studentsCount} Students</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    school.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {school.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Student Highlights</h3>
            <Link href="/fellow/students" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockFellowStudents.slice(0, 3).map((student) => (
              <div key={student.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900">{student.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{student.schoolName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700 w-8">{student.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

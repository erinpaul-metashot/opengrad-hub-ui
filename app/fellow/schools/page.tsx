'use client';

import React, { useState } from 'react';
import { Search, MapPin, Users, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { mockSchools } from '@/lib/mockData';

export default function FellowSchools() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = mockSchools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Schools
          </h1>
          <p className="text-sm text-slate-500">
            Manage and monitor your assigned schools.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search schools by name or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Link href={`/fellow/schools/${school.id}`} key={school.id}>
            <div className="group bg-white rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all overflow-hidden h-full flex flex-col cursor-pointer">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-teal-50 p-3 rounded-xl text-teal-600">
                    <MapPin size={24} />
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    school.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {school.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2 line-clamp-1">
                  {school.name}
                </h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin size={16} className="mr-2" />
                    {school.district}
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Users size={16} className="mr-2" />
                    {school.studentsCount} Enrolled Students
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <Mail size={16} className="mr-2" />
                    {school.contactEmail}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Avg Progress</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${school.averageProgress}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{school.averageProgress}%</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500">No schools found matching your search.</p>
        </div>
      )}
    </div>
  );
}

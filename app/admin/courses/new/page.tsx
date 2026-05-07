'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/LayoutShell';
import { ChevronRight, Image as ImageIcon, Info } from 'lucide-react';
import Link from 'next/link';
import SubjectSelector from '@/components/SubjectSelector';


export default function CreateCourseMetadata() {
  const router = useRouter();
  const [accessType, setAccessType] = useState('Free');
  const [lockingMode, setLockingMode] = useState('Open');
  const [imageUrl, setImageUrl] = useState('');
  
  const [programmes, setProgrammes] = useState<string[]>([]);
  const [subject, setSubject] = useState('');

  const handleProgrammeToggle = (prog: string) => {
    setProgrammes(prev => 
      prev.includes(prog) ? prev.filter(p => p !== prog) : [...prev, prog]
    );
  };

  const handleSaveAndNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject) {
      alert('Please select or create a subject for the course.');
      return;
    }
    // Simulate save and redirect to curriculum builder
    // Hardcoded ID 1 for mock purposes
    router.push('/admin/courses/1/curriculum');
  };

  return (
    <LayoutShell
      role="admin"
      userName="Super Admin"
      pageTitle="Create Course"
      activeNavItem="Courses"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Breadcrumb & Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Link href="/admin/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">Create</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Course Metadata</h1>
          <p className="text-sm text-slate-500 mt-1">Step 1: Set up the basic information for your new course.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form onSubmit={handleSaveAndNext} className="p-6 sm:p-8 space-y-8">
            
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Course title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., IPMAT Kerala 2026"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Short summary of the course and learning outcomes."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-y"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject <span className="text-red-500">*</span></label>
                <SubjectSelector 
                  selectedSubject={subject}
                  onChange={setSubject}
                />
                <p className="text-xs text-slate-500 mt-1">Select an existing subject or type to create a new one.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Access Type */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Access type <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="access" 
                        value="Free"
                        checked={accessType === 'Free'}
                        onChange={(e) => setAccessType(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                      />
                      <span className="text-sm text-slate-700 font-medium">Free</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="access" 
                        value="Paid"
                        checked={accessType === 'Paid'}
                        onChange={(e) => setAccessType(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                      />
                      <span className="text-sm text-slate-700 font-medium">Paid</span>
                    </label>
                  </div>
                  
                  {accessType === 'Paid' && (
                    <div className="flex items-center gap-2 mt-2 animate-in slide-in-from-top-1 fade-in duration-200">
                      <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50 outline-none">
                        <option>INR</option>
                        <option>USD</option>
                      </select>
                      <input 
                        type="number" 
                        min="0"
                        placeholder="Price"
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-teal-500"
                      />
                    </div>
                  )}
                </div>

                {/* Locking Mode */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Locking mode <span className="text-red-500">*</span></label>
                    <div className="group relative">
                      <Info size={14} className="text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10">
                        Sequential: students must complete previous lessons to unlock the next. Open: all lessons available immediately.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="lock" 
                        value="Open"
                        checked={lockingMode === 'Open'}
                        onChange={(e) => setLockingMode(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                      />
                      <span className="text-sm text-slate-700 font-medium">Open</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="lock" 
                        value="Sequential"
                        checked={lockingMode === 'Sequential'}
                        onChange={(e) => setLockingMode(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                      />
                      <span className="text-sm text-slate-700 font-medium">Sequential</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Programme Type */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 block">Programme type <span className="text-red-500">*</span></label>
                <p className="text-xs text-slate-500 mb-2">Which student programmes should this course be available to?</p>
                <div className="flex flex-wrap items-center gap-3">
                  {['Global', 'UG', 'PG'].map(prog => (
                    <label key={prog} className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-colors ${programmes.includes(prog) ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                        checked={programmes.includes(prog)}
                        onChange={() => handleProgrammeToggle(prog)}
                      />
                      <span className={`text-sm font-medium ${programmes.includes(prog) ? 'text-teal-800' : 'text-slate-700'}`}>{prog}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cover image URL</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      type="url" 
                      placeholder="https://.../cover.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div className="w-16 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    ) : (
                      <ImageIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                </div>
              </div>



            </div>

            <div className="pt-6 sm:pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button 
                type="button"
                className="w-full sm:w-auto order-last sm:order-first px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-center"
                onClick={() => router.push('/admin/courses')}
              >
                Cancel
              </button>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="group relative w-full sm:w-auto">
                  <button 
                    type="button" 
                    disabled
                    className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed text-center whitespace-nowrap"
                  >
                    Publish Course
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10">
                    Publish after adding curriculum and at least one lesson
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Save & Next <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </LayoutShell>
  );
}

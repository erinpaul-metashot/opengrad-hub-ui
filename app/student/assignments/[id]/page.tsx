'use client';
import React, { use, useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { Upload, Send, FileText, CheckCircle2, Clock, AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { mockAssignments, mockCourses } from '@/lib/mockData';


export default function SubmitAssignmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const assignment = mockAssignments.find((a) => a.id === id);
  const course = assignment ? mockCourses.find(c => c.id === assignment.courseId) : null;
  
  const existingSubmission = assignment?.submissions?.[0];
  
  const [textContent, setTextContent] = useState((existingSubmission as any)?.notes || '');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!assignment || !course) {
    return (
      <LayoutShell 
        role="student" 
        userName="Alex Johnson" 
        pageTitle="Not Found" 
        activeNavItem="Assignments"
        unreadNotifications={0} 
        onSignOut={() => {}} 
        onSwitchRole={() => {}}
      >
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-50 p-6 rounded-[2rem] shadow-sm mb-6">
            <AlertCircle size={48} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Assignment Not Found</h2>
          <p className="text-slate-500 mt-2">The assignment you are looking for does not exist or has been removed.</p>
          <Link href="/student/assignments" className="mt-8 text-teal-600 font-bold hover:underline">
            &larr; Back to all assignments
          </Link>
        </div>
      </LayoutShell>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setIsEditing(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };


  if (submitted) {
    return (
      <LayoutShell 
        role="student" 
        userName="Alex Johnson" 
        pageTitle="Submission Successful" 
        activeNavItem="Assignments"
        unreadNotifications={0} 
        onSignOut={() => {}} 
        onSwitchRole={() => {}}
      >
        <div className="max-w-3xl mx-auto py-12 px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-50 text-teal-600 rounded-[2rem] mb-8 shadow-sm">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Assignment Submitted!</h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            Great job! Your work for <span className="font-bold text-slate-900">&quot;{assignment.title}&quot;</span> has been successfully submitted. Your instructor will review it soon.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Link 
              href="/student/assignments"
              className="flex items-center justify-center px-6 py-3.5 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 transition shadow-lg shadow-teal-900/10"
            >
              Back to Assignments
            </Link>
            <Link 
              href="/student/dashboard"
              className="flex items-center justify-center px-6 py-3.5 bg-white text-slate-700 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition shadow-sm"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell 
      role="student" 
      userName="Alex Johnson" 
      pageTitle={assignment.title} 
      activeNavItem="Assignments"
      unreadNotifications={0} 
      onSignOut={() => {}} 
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        <Link href="/student/assignments" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 transition">
          <ChevronLeft size={16} />
          Back to Assignments
        </Link>

        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2">
                <span className={`backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-white/20 ${
                  assignment.status === 'graded' ? 'bg-emerald-500/40' : 
                  assignment.status === 'submitted' ? 'bg-amber-500/40' : 'bg-white/20'
                }`}>
                  {assignment.status}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                  {course.title}
                </p>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {assignment.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-teal-50/90">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    Due {assignment.dueDate}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText size={16} />
                    Individual Submission
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
               <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
                  <p className="text-[10px] font-bold uppercase text-teal-100 leading-none">Grade</p>
                  <p className="text-2xl font-bold">{assignment.grade || '--'}</p>
               </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-teal-600" />
                Assignment Description
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {assignment.description || 'No description provided for this assignment.'}
                </p>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">Instructions:</h4>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm">
                    <li>Submit your work as a single PDF file if possible.</li>
                    <li>Ensure all code snippets are properly commented.</li>
                    <li>Use the text area below for a brief summary of your approach.</li>
                    <li>Double-check your work before final submission.</li>
                  </ul>
                </div>
              </div>
            </div>

            {(assignment.status === 'open' || isEditing) ? (
              <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Upload size={20} className="text-teal-600" />
                  {isEditing ? 'Edit Your Submission' : 'Your Submission'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Submission Notes (Optional)</label>
                    <textarea 
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Write a brief summary or any notes for your instructor..."
                      className="w-full min-h-[150px] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Attach Files</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center transition group-hover:border-teal-400 group-hover:bg-teal-50/30">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4 transition group-hover:text-teal-500 group-hover:bg-white group-hover:shadow-sm">
                          <Upload size={28} />
                        </div>
                        <p className="font-bold text-slate-900">Click or drag to upload files</p>
                        <p className="text-sm text-slate-500 mt-1">PDF or DOCX up to 50MB</p>
                      </div>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Selected Files:</p>
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <FileText size={16} className="text-teal-600" />
                              <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting || (textContent.trim() === '' && files.length === 0)}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-teal-900/10 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          {isEditing ? 'Update Submission' : 'Submit Assignment'}
                        </>
                      )}
                    </button>
                    {isEditing && (
                      <button 
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-4 bg-white text-slate-600 font-bold border border-slate-200 rounded-2xl hover:bg-slate-50 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {(assignment as any).submissions.map((sub: any, i: number) => (
                  <div key={i} className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-teal-600" />
                        Your Submission
                      </h2>
                      <div className="flex items-center gap-4">
                        {assignment.status === 'submitted' && (
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="text-xs font-bold text-teal-600 hover:text-teal-700 underline uppercase tracking-widest"
                          >
                            Edit Submission
                          </button>
                        )}
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Submitted on {new Date(sub.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {sub.notes && (
                        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Submission Notes:</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{sub.notes}</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">Submitted Files:</p>
                        {sub.files.map((file: any, j: number) => (
                          <a 
                            key={j} 
                            href={file.url === '#' ? undefined : file.url} 
                            target={file.url === '#' ? undefined : "_blank"}
                            rel={file.url === '#' ? undefined : "noopener noreferrer"}
                            className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-teal-500 transition group"
                          >
                            <div className="flex items-center gap-3">
                              <FileText size={18} className="text-teal-600" />
                              <span className="text-sm font-bold text-slate-700">{file.name}</span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest group-hover:underline">
                              {file.url === '#' ? 'File ready' : 'View File'}
                            </span>
                          </a>
                        ))}
                      </div>

                      {assignment.status === 'graded' && sub.feedback && (
                        <div className="mt-8 p-6 bg-teal-50 rounded-2xl border border-teal-100">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                              <AlertCircle size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-teal-700 uppercase tracking-widest leading-none">Instructor Feedback</p>
                              <p className="text-[10px] font-bold text-teal-500 uppercase tracking-wider mt-1" suppressHydrationWarning>
                                Graded by {sub.gradedBy} on {new Date(sub.gradedDate).toLocaleDateString('en-US')}
                              </p>

                            </div>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed italic">&quot;{sub.feedback}&quot;</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
             <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 p-6 overflow-hidden">
                <h3 className="font-bold text-slate-950 mb-4 pb-4 border-b border-slate-100">Submission Info</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Status</span>
                      <span className={`font-bold uppercase tracking-wider text-[10px] ${
                        assignment.status === 'graded' ? 'text-emerald-600' : 
                        assignment.status === 'submitted' ? 'text-amber-600' : 'text-teal-600'
                      }`}>
                        {assignment.status}
                      </span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Attempts</span>
                      <span className="font-bold text-slate-900">{assignment.submissions.length} of 3</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Weight</span>
                      <span className="font-bold text-slate-900">20% of final grade</span>
                   </div>
                </div>
             </div>

             <div className="bg-slate-950 rounded-[2rem] p-6 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white">
                      <Clock size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-rose-300 uppercase tracking-widest">Deadline</p>
                      <p className="text-sm font-bold">{assignment.dueDate}</p>
                   </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                   Make sure to submit before the deadline to avoid late penalties. Late submissions are accepted for up to 48 hours with a 10% grade reduction per day.
                </p>
             </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}



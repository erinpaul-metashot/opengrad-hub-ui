'use client';

import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  X,
  MessageSquare,
  User,
  School as SchoolIcon,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { mockReports, mockFellowStudents, mockSchools } from '@/lib/mockData';

export default function ReportsPage() {
  const [filter, setFilter] = useState<'All' | 'Reported' | 'Resolved'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [newReport, setNewReport] = useState({
    title: '',
    type: 'Student' as 'Student' | 'School' | 'Other',
    target: '',
    concern: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    mentions: [] as string[]
  });

  const filteredReports = mockReports.filter(report => {
    const matchesFilter = filter === 'All' || report.status === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.target.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd add this to the database
    setIsModalOpen(false);
    alert('Report submitted successfully!');
  };

  const handleResolve = (id: string) => {
    alert(`Report ${id} marked as resolved!`);
    setSelectedReport(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'Resolved' ? 
      <CheckCircle2 size={16} className="text-emerald-500" /> : 
      <Clock size={16} className="text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fellow Reports</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track concerns regarding students and schools</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all shadow-sm shadow-emerald-200 w-full sm:w-auto shrink-0"
        >
          <Plus size={18} />
          Create New Report
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:scale-[1.01] transition-all">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <MessageSquare size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{mockReports.length}</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Total Reports</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:scale-[1.01] transition-all">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Clock size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {mockReports.filter(r => r.status === 'Reported').length}
            </p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Active Reports</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:scale-[1.01] transition-all col-span-2 md:col-span-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {mockReports.filter(r => r.status === 'Resolved').length}
            </p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">Resolved</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-full md:w-auto">
          {['All', 'Reported', 'Resolved'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t as any)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all text-center ${
                filter === t 
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search reports or targets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div 
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:shadow-slate-100 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(report.priority)}`}>
                    {report.priority} Priority
                  </span>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1" suppressHydrationWarning>
                    <Clock size={12} />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {report.title}
                </h3>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    {report.type === 'Student' ? <User size={14} /> : <SchoolIcon size={14} />}
                    <span className="font-semibold text-slate-900">{report.target}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1.5 text-slate-500 italic">
                    {report.mentions.join(', ')}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {report.concern}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                  report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {getStatusIcon(report.status)}
                  {report.status}
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-16 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Filter size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No reports found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedReport.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {getStatusIcon(selectedReport.status)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedReport.title}</h2>
                  <p className="text-xs text-slate-500 font-medium">Report ID: {selectedReport.id.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="flex flex-wrap gap-3 mb-8">
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(selectedReport.priority)}`}>
                  {selectedReport.priority} Priority
                </div>
                <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                  {selectedReport.type}
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                  Submitted by {selectedReport.author}
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Concern Details</h3>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                      {selectedReport.concern}
                    </p>
                  </div>
                </section>

                <section className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Target Entity</h3>
                    <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        {selectedReport.type === 'Student' ? <User size={16} /> : <SchoolIcon size={16} />}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{selectedReport.target}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Mentions</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.mentions.map((mention: string) => (
                        <span key={mention} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                          {mention}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                {selectedReport.resolution ? (
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Resolution</h3>
                    <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                      <p className="text-emerald-900 text-sm italic leading-relaxed">
                        {selectedReport.resolution}
                      </p>
                    </div>
                  </section>
                ) : (
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Timeline</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                          <div className="w-0.5 h-full bg-slate-100 mt-2"></div>
                        </div>
                        <div className="pb-4">
                          <p className="text-sm font-bold text-slate-900">Report Created</p>
                          <p className="text-xs text-slate-500" suppressHydrationWarning>{new Date(selectedReport.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-400">Awaiting Response</p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setSelectedReport(null)}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-white transition-all shadow-sm"
              >
                Close
              </button>
              {selectedReport.status !== 'Resolved' && (
                <button 
                  onClick={() => handleResolve(selectedReport.id)}
                  className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Create New Report</h2>
                <p className="text-sm text-emerald-700/70">Fill in the details regarding your concern</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-600 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Report Type</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value as any})}
                  >
                    <option value="Student">Student Concern</option>
                    <option value="School">School Issue</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Priority Level</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    value={newReport.priority}
                    onChange={(e) => setNewReport({...newReport, priority: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Report Title</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., Attendance drop in Class 10A"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Target {newReport.type}
                </label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                  value={newReport.target}
                  onChange={(e) => setNewReport({...newReport, target: e.target.value})}
                >
                  <option value="">Select {newReport.type}</option>
                  {newReport.type === 'Student' ? (
                    mockFellowStudents.map(s => <option key={s.id} value={s.name}>{s.name} ({s.roll})</option>)
                  ) : newReport.type === 'School' ? (
                    mockSchools.map(s => <option key={s.id} value={s.name}>{s.name}</option>)
                  ) : (
                    <>
                      <option value="General Admin">General Admin</option>
                      <option value="Curriculum Team">Curriculum Team</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Concern Details</label>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Use @ to mention staff</span>
                </div>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the issue or concern in detail..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
                  value={newReport.concern}
                  onChange={(e) => setNewReport({...newReport, concern: e.target.value})}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

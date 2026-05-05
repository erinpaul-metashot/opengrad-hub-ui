'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CreateUserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUserModal({ onClose, onSuccess }: CreateUserModalProps) {
  const [role, setRole] = useState('Student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
      <div className="bg-white w-full max-w-md h-full sm:h-auto sm:max-h-[100vh] overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-slate-900">Create New User</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">User Role <span className="text-red-500">*</span></label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Student">Student</option>
              <option value="Manager">Manager</option>
              <option value="Fellow">Fellow</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Common Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required
                placeholder="e.g. Jane Doe"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {role === 'Student' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Roll Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. TN_CUET_001"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
                <p className="text-xs text-slate-500 mt-1">Roll number will be the student&apos;s login.</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address {role !== 'Student' && <span className="text-red-500">*</span>}</label>
              <input 
                type="email" 
                required={role !== 'Student'}
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number (optional)</label>
              <input 
                type="tel" 
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Role Specific Fields */}
          {role === 'Student' && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Programme Type <span className="text-red-500">*</span></label>
                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                  <option value="">Select Programme</option>
                  <option value="School">School</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">State <span className="text-red-500">*</span></label>
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                    <option value="">Select State</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">District <span className="text-red-500">*</span></label>
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                    <option value="">Select District</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">School / Institution <span className="text-red-500">*</span></label>
                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20">
                  <option value="">Select School</option>
                  <option value="Govt Higher Sec School">Govt Higher Sec School</option>
                </select>
              </div>
            </div>
          )}

          {['Manager', 'Fellow'].includes(role) && (
            <div className="space-y-2 pt-2">
              <label className="text-sm font-semibold text-slate-700">Assigned State(s) <span className="text-red-500">*</span></label>
              <select multiple className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 min-h-[100px]">
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Hold Cmd/Ctrl to select multiple states.</p>
            </div>
          )}

          <div className="h-px bg-slate-100 w-full" />

          {/* Password Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Temporary Password <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              defaultValue="OpenGrad2026!"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2"
            >
              {isSubmitting ? 'Creating...' : <><Check size={16} /> Create User</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

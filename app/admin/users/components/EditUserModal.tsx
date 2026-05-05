'use client';

import React, { useState } from 'react';
import { X, Check, Lock } from 'lucide-react';

interface EditUserModalProps {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({ userId, onClose, onSuccess }: EditUserModalProps) {
  // Hardcoded initial state for the mock
  const [role, setRole] = useState('Student');
  const [status, setStatus] = useState('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
      <div className="bg-white w-full max-w-md h-full sm:h-auto sm:max-h-[100vh] overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300 relative">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-slate-900">Edit User #{userId}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Selection */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm font-semibold text-slate-900">Account Status</p>
              <p className="text-xs text-slate-500 mt-0.5">Inactive users cannot log in.</p>
            </div>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">User Role <span className="text-red-500">*</span></label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled // Usually disabled in edit mode or restricted
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition opacity-70"
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
                defaultValue="Alex Johnson"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {role === 'Student' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Roll Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  defaultValue="TN_CUET_001"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address {role !== 'Student' && <span className="text-red-500">*</span>}</label>
              <input 
                type="email" 
                required={role !== 'Student'}
                defaultValue="alex@example.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number (optional)</label>
              <input 
                type="tel" 
                defaultValue="+91 98765 43210"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Role Specific Fields */}
          {role === 'Student' && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Programme Type <span className="text-red-500">*</span></label>
                <select 
                  defaultValue="UG"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                >
                  <option value="School">School</option>
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">State <span className="text-red-500">*</span></label>
                  <select 
                    defaultValue="Tamil Nadu"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">District <span className="text-red-500">*</span></label>
                  <select 
                    defaultValue="Chennai"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">School / Institution <span className="text-red-500">*</span></label>
                <select 
                  defaultValue="Govt Higher Sec School"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                >
                  <option value="Govt Higher Sec School">Govt Higher Sec School</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={16} /> Reset Password
            </button>

            <div className="flex w-full sm:w-auto items-center gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Saving...' : <><Check size={16} /> Save Changes</>}
              </button>
            </div>
          </div>
        </form>

        {/* Reset Password Confirmation Overlay */}
        {showResetConfirm && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reset Password?</h3>
              <p className="text-sm text-slate-600 mb-6">This will invalidate the user&apos;s current password and generate a temporary one.</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Simulate password reset
                    setTimeout(() => setShowResetConfirm(false), 600);
                  }}
                  className="px-4 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

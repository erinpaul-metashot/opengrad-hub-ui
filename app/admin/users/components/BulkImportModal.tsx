'use client';

import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Download } from 'lucide-react';

interface BulkImportModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function BulkImportModal({ onClose, onSuccess }: BulkImportModalProps) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock validation states
  const hasErrors = true; // Hardcoded to show error state for the mock

  const handleUpload = () => {
    setFileUploaded(true);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Bulk Import</h2>
            <p className="text-xs sm:text-sm text-slate-500">Upload CSV to add multiple students.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-xs sm:text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 sm:gap-1.5 transition-colors">
              <Download size={14} className="sm:w-4 sm:h-4" />
              <span>Download <span className="hidden sm:inline">template</span></span>
            </button>
            <div className="w-px h-5 sm:h-6 bg-slate-200"></div>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50 flex-1">
          {!fileUploaded ? (
            <div className="max-w-xl mx-auto">
              <div 
                className="mt-4 sm:mt-6 border-2 border-dashed border-slate-300 rounded-2xl bg-white hover:bg-slate-50 transition-colors p-6 sm:p-12 flex flex-col items-center justify-center cursor-pointer text-center group"
                onClick={handleUpload}
              >
                <div className="p-3 sm:p-4 bg-teal-50 text-teal-600 rounded-full group-hover:scale-110 transition-transform mb-3 sm:mb-4">
                  <Upload size={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 sm:mb-2">Click to upload or drag and drop</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 max-w-sm leading-relaxed">
                  CSV file only. Columns must include: name, roll_number, programme_type, state, district, school, email, phone.
                </p>
                <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-teal-600 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
                  Choose file
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* File Info Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                    <FileText size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">students_batch_2026.csv</h3>
                    <p className="text-[10px] sm:text-xs text-slate-500">18 rows detected • 45 KB</p>
                  </div>
                </div>
                
                <div className="flex-1 sm:max-w-xs space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Set temporary password for all</label>
                  <input 
                    type="text" 
                    defaultValue="OpenGrad2026!"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              {/* Validation Banner */}
              {hasErrors && (
                <div className="rounded-xl bg-red-50 border border-red-100 p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
                  <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5 sm:w-5 sm:h-5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-red-900">Validation Errors Found</h4>
                    <p className="text-[11px] sm:text-sm text-red-700 mt-0.5 sm:mt-1 leading-relaxed">
                      Some rows contain errors and will not be imported. You can proceed to import the valid rows, or fix the CSV and upload again.
                    </p>
                  </div>
                </div>
              )}

              {/* Preview Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-700">Preview (First 10 rows)</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 bg-slate-50/50">
                        <th className="font-semibold p-3 sm:p-4">Row</th>
                        <th className="font-semibold p-3 sm:p-4">Name</th>
                        <th className="font-semibold p-3 sm:p-4">Roll Number</th>
                        <th className="font-semibold p-3 sm:p-4">Programme</th>
                        <th className="font-semibold p-3 sm:p-4">State</th>
                        <th className="font-semibold p-3 sm:p-4 text-right">Validation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { id: 1, name: 'Alice Kumar', roll: 'TN_CUET_001', prog: 'UG', state: 'Tamil Nadu', status: 'valid' },
                        { id: 2, name: 'Bob Singh', roll: 'TN_CUET_002', prog: 'UG', state: 'Tamil Nadu', status: 'valid' },
                        { id: 3, name: 'Charlie', roll: '', prog: 'School', state: 'Kerala', status: 'error', error: 'Missing roll_number' },
                        { id: 4, name: 'Diana Prince', roll: 'KL_SCH_045', prog: 'School', state: 'InvalidState', status: 'error', error: 'Invalid state' },
                        { id: 5, name: 'Eve Davis', roll: 'TN_PG_012', prog: 'PG', state: 'Tamil Nadu', status: 'valid' },
                      ].map((row) => (
                        <tr key={row.id} className={row.status === 'error' ? 'bg-red-50/30' : ''}>
                          <td className="p-3 sm:p-4 text-slate-500">{row.id}</td>
                          <td className="p-3 sm:p-4 font-medium text-slate-900">{row.name}</td>
                          <td className="p-3 sm:p-4 text-slate-600">{row.roll || <span className="text-red-400 italic">Empty</span>}</td>
                          <td className="p-3 sm:p-4 text-slate-600">{row.prog}</td>
                          <td className="p-3 sm:p-4 text-slate-600">{row.state}</td>
                          <td className="p-3 sm:p-4 text-right">
                            {row.status === 'valid' ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] sm:text-xs font-semibold bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                                <CheckCircle2 size={12} className="sm:w-3.5 sm:h-3.5" /> Valid
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-600 text-[10px] sm:text-xs font-semibold bg-red-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md">
                                <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5" /> {row.error}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between shrink-0 bg-white rounded-b-2xl">
          {fileUploaded && hasErrors ? (
            <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Download size={14} className="sm:w-4 sm:h-4" />
              Error Report
            </button>
          ) : (
            <div className="hidden sm:block"></div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-center"
            >
              Cancel
            </button>
            <button 
              type="button"
              disabled={!fileUploaded || isSubmitting}
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 text-center flex items-center justify-center whitespace-nowrap"
            >
              {isSubmitting ? 'Importing...' : fileUploaded ? 'Confirm Import (16 Valid)' : 'Import Students'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

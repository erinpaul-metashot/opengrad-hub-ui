'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, AlertCircle } from 'lucide-react';

interface AssignmentCardProps {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'open' | 'submitted' | 'graded' | 'late';
  grade?: number;
}

export default function AssignmentCard({ id, title, course, dueDate, status, grade }: AssignmentCardProps) {
  const statusConfig = {
    open: { bg: 'bg-teal-50', text: 'text-teal-700', label: 'Open' },
    submitted: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Submitted' },
    graded: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Graded' },
    late: { bg: 'bg-rose-50', text: 'text-rose-700', label: 'Late' },
  };

  const config = statusConfig[status] || statusConfig.open;

  return (
    <Link href={`/student/assignments/${id}`}>
      <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-200 p-6 hover:shadow-md hover:ring-teal-500/30 transition-all group">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 flex-1 group-hover:text-teal-700 transition">{title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
            {config.label}
          </span>
        </div>
        <p className="text-xs font-medium text-slate-500 mb-4">{course}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide">
            <Clock size={14} className="text-slate-400" />
            <span>Due {dueDate}</span>
          </div>
          {grade !== undefined && grade !== null && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
              <span className="text-sm font-bold text-teal-600">{grade}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}


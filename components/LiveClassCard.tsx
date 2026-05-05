'use client';

import React from 'react';
import { Clock, ExternalLink, Calendar } from 'lucide-react';

interface LiveClassCardProps {
  id: string;
  title: string;
  course: string;
  startTime: Date;
  status: 'upcoming' | 'live' | 'past';
  meetingLink?: string;
}

export default function LiveClassCard({ id, title, course, startTime, status, meetingLink }: LiveClassCardProps) {
  const isLive = status === 'live';
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-lg ring-1 ${
      isLive 
        ? 'ring-rose-500/30 bg-rose-50/10' 
        : 'ring-slate-200 hover:ring-teal-500/30 shadow-sm'
    }`}>
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                  </span>
                  Live
                </span>
              ) : (
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {status}
                </span>
              )}
              <span className="text-[10px] font-semibold text-teal-700 uppercase tracking-[0.2em]">{course}</span>
            </div>
            <h3 className="text-sm font-semibold leading-snug text-slate-950 line-clamp-2 transition-colors group-hover:text-teal-700">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-400" />
            <span>{formatDate(startTime)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            <span>{formatTime(startTime)}</span>
          </div>
        </div>

        <div className="pt-1">
          {status !== 'past' && meetingLink ? (
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all active:scale-95 ${
                isLive 
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-600/10' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isLive ? 'Join Now' : 'Join Session'}
              <ExternalLink size={12} />
            </a>
          ) : (
             <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-xs font-semibold text-slate-400 cursor-not-allowed">
               Session Closed
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

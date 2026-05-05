'use client';
import React, { useState, useEffect } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { 
  Bell, 
  Info, 
  CheckCircle, 
  BookOpen, 
  Calendar, 
  Clock, 
  Check, 
  Trash2
} from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import Link from 'next/link';

type NotificationType = 'all' | 'unread' | 'system' | 'assignment' | 'grade' | 'course' | 'live-class';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<NotificationType>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'system': return <Info className="text-blue-500" size={20} />;
      case 'assignment': return <BookOpen className="text-orange-500" size={20} />;
      case 'grade': return <CheckCircle className="text-green-500" size={20} />;
      case 'course': return <Calendar className="text-purple-500" size={20} />;
      case 'live-class': return <Clock className="text-teal-500" size={20} />;
      default: return <Bell className="text-slate-500" size={20} />;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle="Notifications"
      unreadNotifications={notifications.filter(n => !n.isRead).length}
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        {/* Gradient Header */}
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100/90">
                Communication center
              </p>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Notifications
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50/90 md:text-base">
                  Stay updated with the latest activity, course updates, and system announcements.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-950 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Total</p>
                <p className="mt-2 text-2xl font-bold text-center">{notifications.length}</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Unread</p>
                <p className="mt-2 text-2xl font-bold text-teal-600 text-center">{notifications.filter(n => !n.isRead).length}</p>
              </div>
              <div className="rounded-2xl bg-white/95 p-4 shadow-sm min-w-[100px]">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 text-center">Alerts</p>
                <p className="mt-2 text-2xl font-bold text-amber-600 text-center">{notifications.filter(n => n.type === 'system').length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Actions */}
        <section className="rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {(['all', 'unread', 'system', 'assignment', 'grade', 'course', 'live-class'] as NotificationType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    filter === t 
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-900/10' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            
            <button 
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded-xl hover:bg-teal-100 transition active:scale-95"
            >
              <Check size={16} />
              Mark all as read
            </button>
          </div>
        </section>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className={`group relative rounded-[2rem] bg-white p-5 shadow-sm border transition-all hover:shadow-md ${
                  n.isRead ? 'border-slate-100' : 'border-teal-100 ring-1 ring-teal-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-slate-100 ${
                    n.isRead ? 'bg-slate-50' : 'bg-teal-50'
                  }`}>
                    {getIcon(n.type)}
                  </div>
                  
                  <div className="flex-1 pr-12">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold text-slate-950 ${n.isRead ? 'opacity-70' : ''}`}>
                        {n.title}
                      </h3>
                      {!n.isRead && (
                        <span className="h-2 w-2 rounded-full bg-teal-500"></span>
                      )}
                    </div>
                    <p className={`mt-1 text-sm leading-relaxed ${n.isRead ? 'text-slate-500' : 'text-slate-600'}`}>
                      {n.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <span 
                        className="text-xs font-medium text-slate-400 flex items-center gap-1.5"
                        suppressHydrationWarning
                      >
                        <Clock size={12} />
                        {isMounted ? getRelativeTime(n.timestamp) : '--'}
                      </span>
                      {n.link && (
                        <Link 
                          href={n.link}
                          className="text-xs font-bold text-teal-600 hover:text-teal-700 transition"
                        >
                          View details →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="absolute top-5 right-5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.isRead && (
                      <button 
                        onClick={() => markAsRead(n.id)}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(n.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[2rem] border border-dashed border-teal-200 bg-teal-50/60 px-6 py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white text-teal-600 shadow-sm">
                <Bell size={40} className="opacity-20" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-slate-950">No notifications found</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                You&apos;re all caught up! When you have new updates, they&apos;ll appear here.
              </p>
              {filter !== 'all' && (
                <button 
                  onClick={() => setFilter('all')}
                  className="mt-6 px-6 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition shadow-md shadow-teal-900/10"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}

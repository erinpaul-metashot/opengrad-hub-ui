'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';

interface HeaderProps {
  role?: 'student' | 'manager' | 'fellow' | 'admin';
  userName?: string;
  unreadNotifications?: number;
  onSwitchRole?: (newRole: string) => void;
  onSignOut?: () => void;
  pageTitle?: string;
}

export default function Header({
  role = 'student',
  userName = 'Alex Johnson',
  unreadNotifications = 0,
  onSwitchRole,
  onSignOut,
  pageTitle,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      student: 'bg-blue-600',
      manager: 'bg-purple-600',
      fellow: 'bg-green-600',
      admin: 'bg-red-600',
    };
    return colors[role] || 'bg-teal-600';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      student: 'Student',
      manager: 'Manager',
      fellow: 'Fellow',
      admin: 'Super Admin',
    };
    return labels[role] || 'User';
  };

  return (
    <header className="header-bar">
      {/* Left side - Page title */}
      <div className="header-left">
        {pageTitle && <h1 className="header-title">{pageTitle}</h1>}
      </div>

      {/* Right side - Role badge, Notifications, User menu */}
      <div className="header-right">
        {/* Role Badge Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`role-badge ${getRoleBadgeColor(role)} flex items-center gap-1 cursor-pointer hover:opacity-90 transition-opacity`}
            aria-label="Switch role"
          >
            {getRoleLabel(role)}
            <ChevronDown size={14} className={`transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`} />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1 overflow-hidden">
              {['student', 'manager', 'fellow', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onSwitchRole?.(r);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    role === r
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {getRoleLabel(r)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            className="notification-bell"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600" />
            {unreadNotifications > 0 && (
              <div className="notification-badge" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.slice(0, 5).map((n) => (
                  <div key={n.id} className="p-4 border-b border-gray-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.isRead ? 'bg-transparent' : 'bg-teal-500'}`} />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">{n.description}</div>
                        <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider" suppressHydrationWarning>
                          {new Date(n.timestamp).toLocaleDateString('en-US')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 text-center">
                <Link href='/notifications'>
                  <span className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            className="user-avatar"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
          >
            {userName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{getRoleLabel(role)}</p>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <User size={16} />
                  Profile
                </button>
              </div>

              <div className="p-3 border-t border-gray-200">
                <button
                  onClick={() => {
                    onSignOut?.();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2 font-medium"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

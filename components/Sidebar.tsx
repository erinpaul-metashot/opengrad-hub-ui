'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, LogOut } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  badge?: number;
  children?: NavItemProps[];
  isActive?: boolean;
}

interface SidebarProps {
  role?: 'student' | 'manager' | 'fellow' | 'admin';
  activeItem?: string;
  onSignOut?: () => void;
}

const NAV_ITEMS: Record<string, NavItemProps[]> = {
  student: [
    { icon: '', label: 'Dashboard', href: '/student/dashboard' },
    { icon: '', label: 'My Courses', href: '/student/courses' },
    { icon: '', label: 'Quizzes', href: '/student/quizzes' },
    {
      icon: '',
      label: 'Assignments',
      href: '/student/assignments',
      badge: 3,
    },
    { icon: '', label: 'Live Classes', href: '/student/live-classes' },
    { icon: '', label: 'Calendar', href: '/student/calendar' },
    { icon: '', label: 'Notifications', href: '/student/notifications', badge: 5 },
  ],
  manager: [
    { icon: '', label: 'Dashboard', href: '/manager/dashboard' },
    {
      icon: '',
      label: 'Courses',
      href: '/manager/courses',
      children: [
        { icon: '', label: 'Create Course', href: '/manager/courses/new' },
        {
          icon: '',
          label: 'Manage Courses',
          href: '/manager/courses',
        },
        { icon: '', label: 'Assign Course', href: '/manager/courses/assign' },
      ],
    },
    { icon: '', label: 'Question Bank', href: '/manager/question-bank' },
    { icon: '', label: 'Quizzes', href: '/manager/quizzes' },
    { icon: '', label: 'Assignments', href: '/manager/assignments' },
    { icon: '', label: 'Live Classes', href: '/manager/live-classes' },
    { icon: '', label: 'Analytics', href: '/manager/analytics' },
  ],
  admin: [
    { icon: '', label: 'Dashboard', href: '/admin/dashboard' },
    { icon: '', label: 'Users', href: '/admin/users' },
    { icon: '', label: 'Courses', href: '/admin/courses' },
    { icon: '', label: 'Reports', href: '/admin/reports' },
    { icon: '', label: 'Analytics', href: '/admin/analytics' },
  ],
  fellow: [
    { icon: '', label: 'Dashboard', href: '/fellow/dashboard' },
    { icon: '', label: 'Reports', href: '/fellow/reports' },
    { icon: '', label: 'Schools', href: '/fellow/schools' },
    { icon: '', label: 'Students', href: '/fellow/students' },
  ],
};

export default function Sidebar({
  role = 'student',
  activeItem,
  onSignOut,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.student;

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderNavItem = (item: NavItemProps, depth = 0) => {
    const isExpanded = expandedItems.includes(item.label);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeItem === item.label;

    const itemContent = (
      <div
        className={`nav-item ${isActive ? 'active' : ''} ${
          depth > 0 ? 'nav-subitem' : ''
        }`}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            toggleExpand(item.label);
          }
        }}
      >
        <span className="nav-item-icon">{item.icon}</span>
        <span className="nav-item-label">{item.label}</span>
        {item.badge && !hasChildren && (
          <span className="nav-item-badge">{item.badge}</span>
        )}
        {hasChildren && (
          <ChevronDown
            className={`nav-chevron ${isExpanded ? 'open' : ''}`}
            size={16}
          />
        )}
      </div>
    );

    return (
      <div key={item.label}>
        {item.href ? (
          <Link href={item.href} className="w-full">
            {itemContent}
          </Link>
        ) : (
          itemContent
        )}

        {hasChildren && item.children && (
          <div className={`nav-subitems ${isExpanded ? 'open' : ''}`}>
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <Link href="/">
          <div className="flex justify-center py-2">
            <Image 
              src="/logo.png" 
              alt="OpenGrad Logo" 
              width={160} 
              height={40} 
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          onClick={onSignOut}
          className="sign-out-btn flex items-center justify-center gap-2"
          aria-label="Sign out"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

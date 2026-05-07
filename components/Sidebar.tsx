'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogOut, X } from 'lucide-react';

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
  isOpen?: boolean;
  onClose?: () => void;
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
    {
      icon: '',
      label: 'Courses',
      href: '/admin/courses',
      children: [
        { icon: '', label: 'Create Course', href: '/admin/courses/new' },
        {
          icon: '',
          label: 'Manage Courses',
          href: '/admin/courses',
        },
        { icon: '', label: 'Assign Course', href: '/admin/courses/assign' },
      ],
    },
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
  isOpen = false,
  onClose,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();
  const navItems = NAV_ITEMS[role] || NAV_ITEMS.student;

  // Auto-expand parents of active children
  useEffect(() => {
    if (!pathname) return;
    
    const itemsToExpand: string[] = [];
    navItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href && (pathname === child.href || pathname.startsWith(child.href + '/'))
        );
        if (hasActiveChild) {
          itemsToExpand.push(item.label);
        }
      }
    });

    if (itemsToExpand.length > 0) {
      setExpandedItems((prev) => {
        const newExpanded = [...prev];
        itemsToExpand.forEach((label) => {
          if (!newExpanded.includes(label)) {
            newExpanded.push(label);
          }
        });
        return newExpanded;
      });
    }
  }, [pathname, navItems]);

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
    
    // Determine if the current item is active based on pathname
    let isExactActive = false;
    if (item.href) {
      if (pathname === item.href) {
        isExactActive = true;
      } else if (pathname.startsWith(item.href + '/')) {
        // Exclude specific siblings to avoid collision (e.g. '/manager/courses/new' starts with '/manager/courses')
        const isSiblingCollision =
          (item.href === '/manager/courses' || item.href === '/admin/courses') &&
          (pathname === `${item.href}/new` ||
            pathname.startsWith(`${item.href}/new/`) ||
            pathname === `${item.href}/assign` ||
            pathname.startsWith(`${item.href}/assign/`));

        if (!isSiblingCollision) {
          isExactActive = true;
        }
      }
    }

    // Determine if any child of this item is active
    const hasActiveChild = item.children && item.children.some((child) => {
      if (!child.href) return false;
      if (pathname === child.href) return true;
      if (pathname.startsWith(child.href + '/')) {
        const isSiblingCollision =
          (child.href === '/manager/courses' || child.href === '/admin/courses') &&
          (pathname === `${child.href}/new` ||
            pathname.startsWith(`${child.href}/new/`) ||
            pathname === `${child.href}/assign` ||
            pathname.startsWith(`${child.href}/assign/`));
        return !isSiblingCollision;
      }
      return false;
    });

    // activeItem prop-based active or exact path active (excluding parents when child is active)
    const isActive = activeItem === item.label || (isExactActive && !hasActiveChild) || (depth > 0 && isExactActive);

    const itemContent = (
      <div
        className={`nav-item ${isActive ? 'active' : ''} ${
          depth > 0 ? 'nav-subitem' : ''
        }`}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault();
            toggleExpand(item.label);
          } else if (onClose && window.innerWidth < 768) {
            // Close sidebar on mobile when navigating
            onClose();
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
    <aside className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* Logo Section */}
      <div className="sidebar-logo relative">
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
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
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

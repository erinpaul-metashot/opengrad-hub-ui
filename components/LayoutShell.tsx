'use client';

import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useRouter } from 'next/navigation';

interface LayoutShellProps {
  children: ReactNode;
  role?: 'student' | 'manager' | 'fellow' | 'admin';
  userName?: string;
  pageTitle?: string;
  unreadNotifications?: number;
  activeNavItem?: string;
  onSignOut?: () => void;
  onSwitchRole?: (newRole: string) => void;
}

export default function LayoutShell({
  children,
  role = 'student',
  userName = 'Alex Johnson',
  pageTitle,
  unreadNotifications = 0,
  activeNavItem,
  onSignOut,
  onSwitchRole,
}: LayoutShellProps) {
  const [currentRole, setCurrentRole] = useState<
    'student' | 'manager' | 'fellow' | 'admin'
  >(role);
  const router = useRouter();

  const handleRoleSwitch = (newRole: string) => {
    setCurrentRole(
      newRole as 'student' | 'manager' | 'fellow' | 'admin'
    );
    localStorage.setItem('mockRole', newRole);
    onSwitchRole?.(newRole);

    // Redirect to the default dashboard of the selected role
    if (newRole === 'student') {
      router.push('/student/dashboard');
    } else if (newRole === 'manager') {
      router.push('/manager/dashboard');
    } else if (newRole === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push(`/${newRole}`);
    }
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    
    // Clear mock session
    localStorage.removeItem('mockRole');
    localStorage.removeItem('mockUser');
    
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="layout-shell">
      {/* Sidebar */}
      <Sidebar
        role={currentRole}
        activeItem={activeNavItem || pageTitle}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <Header
          role={currentRole}
          userName={userName}
          pageTitle={pageTitle}
          unreadNotifications={unreadNotifications}
          onSignOut={handleSignOut}
          onSwitchRole={handleRoleSwitch}
        />

        {/* Page Content */}
        <main className="page-content">
          <div className="content-container">{children}</div>
        </main>
      </div>
    </div>
  );
}

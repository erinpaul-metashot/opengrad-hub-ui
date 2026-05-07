'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Plus,
  Upload,
  Download,
  Filter,
  MoreVertical,
  Edit2,
  Lock,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import CreateUserModal from './components/CreateUserModal';
import BulkImportModal from './components/BulkImportModal';
import EditUserModal from './components/EditUserModal';

const MOCK_USERS = [
  { id: 1, name: 'Alex Johnson', identifier: 'TN_CUET_001', role: 'Student', prog: 'UG', state: 'Tamil Nadu', status: 'Active' },
  { id: 2, name: 'Sarah Smith', identifier: 'sarah@example.com', role: 'Manager', prog: '-', state: 'Kerala', status: 'Active' },
  { id: 3, name: 'Michael Brown', identifier: 'TN_CUET_002', role: 'Student', prog: 'UG', state: 'Tamil Nadu', status: 'Inactive' },
  { id: 4, name: 'Emily Davis', identifier: 'emily@example.com', role: 'Fellow', prog: '-', state: 'Karnataka', status: 'Active' },
  { id: 5, name: 'Priya Kumar', identifier: 'KL_SCH_045', role: 'Student', prog: 'School', state: 'Kerala', status: 'Active' },
  { id: 6, name: 'David Wilson', identifier: 'admin@opengrad.org', role: 'Super Admin', prog: '-', state: 'All', status: 'Active' },
  { id: 7, name: 'Karthik Raja', identifier: 'TN_PG_012', role: 'Student', prog: 'PG', state: 'Tamil Nadu', status: 'Active' },
  { id: 8, name: 'Anita Patel', identifier: 'anita@example.com', role: 'Manager', prog: '-', state: 'Tamil Nadu', status: 'Active' },
];

export default function AdminUserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  
  // Modals for table actions (mock only)
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const filteredUsers = MOCK_USERS.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.identifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <LayoutShell
      role="admin"
      userName="Super Admin"
      pageTitle="User Management"
      activeNavItem="Users"
    >
      <div className="space-y-6">
        
        {/* Page Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border border-slate-200">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Total Users</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">12,345</p>
            </div>
            
            {/* Quick Filters */}
            <div className="hidden md:flex items-center gap-2">
              {['All', 'Student', 'Manager', 'Fellow'].map(r => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    roleFilter === r 
                      ? 'bg-teal-100 text-teal-800' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 whitespace-nowrap">
              <Download size={14} className="sm:w-4 sm:h-4" />
              Export CSV
            </button>
            <button 
              onClick={() => setShowImportModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 whitespace-nowrap"
            >
              <Upload size={14} className="sm:w-4 sm:h-4" />
              Bulk Import
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95 whitespace-nowrap"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
              Create User
            </button>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll or email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="md:hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Manager">Manager</option>
              <option value="Fellow">Fellow</option>
              <option value="Super Admin">Super Admin</option>
            </select>
            
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Roll / Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Programme</th>
                  <th className="p-4">State</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6 font-medium text-slate-900">{user.name}</td>
                      <td className="p-4 text-slate-600">{user.identifier}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'Student' ? 'bg-blue-50 text-blue-700' :
                          user.role === 'Manager' ? 'bg-purple-50 text-purple-700' :
                          user.role === 'Fellow' ? 'bg-green-50 text-green-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{user.prog}</td>
                      <td className="p-4 text-slate-600">{user.state}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 ${
                          user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setEditUserId(user.id)}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" 
                            title="Edit User"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Deactivate">
                            <Lock size={16} />
                          </button>
                          <button 
                            onClick={() => setDeleteUserId(user.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Delete User"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No users found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Show</span>
              <select className="border border-slate-200 rounded-lg px-2 py-1 outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>per page</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>1-8 of 12,345</span>
              <div className="flex items-center gap-1 ml-4">
                <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-50 bg-white">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateUserModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}

      {showImportModal && (
        <BulkImportModal 
          onClose={() => setShowImportModal(false)}
          onSuccess={() => setShowImportModal(false)}
        />
      )}

      {/* Edit User Modal */}
      {editUserId !== null && (
        <EditUserModal
          userId={editUserId}
          onClose={() => setEditUserId(null)}
          onSuccess={() => setEditUserId(null)}
        />
      )}

      {/* Mock Delete Modal */}
      {deleteUserId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Delete User</h3>
            <p className="text-sm text-slate-600 mb-6">Are you sure you want to permanently delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteUserId(null)} className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setDeleteUserId(null)} className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

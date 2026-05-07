'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Plus, Check } from 'lucide-react';

interface SubjectSelectorProps {
  selectedSubject: string;
  onChange: (subject: string) => void;
  required?: boolean;
}

const INITIAL_SUBJECTS = [
  'Math',
  'English',
  'Biology',
  'Physics',
  'Chemistry',
  'History',
  'Computer Science'
];

export default function SubjectSelector({
  selectedSubject,
  onChange,
  required = true
}: SubjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjects, setSubjects] = useState<string[]>(INITIAL_SUBJECTS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // If a selectedSubject is passed from outside and not in the list, add it
  useEffect(() => {
    if (selectedSubject) {
      setSubjects((prev) => {
        if (prev.includes(selectedSubject)) {
          return prev;
        }
        return [...prev, selectedSubject];
      });
    }
  }, [selectedSubject]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSubjects = subjects.filter((subj) =>
    subj.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasExactMatch = subjects.some(
    (subj) => subj.toLowerCase() === searchQuery.trim().toLowerCase()
  );

  const handleSelect = (subject: string) => {
    onChange(subject);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleCreateNew = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    
    // Capitalize first letter of each word for clean formatting
    const formattedSubject = trimmed
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setSubjects((prev) => {
      if (prev.includes(formattedSubject)) {
        return prev;
      }
      return [...prev, formattedSubject];
    });
    handleSelect(formattedSubject);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-sm text-left outline-none transition duration-150 ${
          isOpen
            ? 'border-teal-500 ring-2 ring-teal-500/20'
            : 'border-slate-200 hover:border-slate-300'
        } bg-white text-slate-900`}
      >
        <span className={selectedSubject ? 'text-slate-900 font-medium' : 'text-slate-400'}>
          {selectedSubject || 'Select or type a subject...'}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col">
          {/* Search Input Box */}
          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or type a new subject..."
              className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subj) => {
                const isSelected = selectedSubject === subj;
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => handleSelect(subj)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <span className={isSelected ? 'font-semibold text-teal-600' : ''}>
                      {subj}
                    </span>
                    {isSelected && <Check size={16} className="text-teal-600 shrink-0 ml-2" />}
                  </button>
                );
              })
            ) : (
              searchQuery.trim() === '' && (
                <div className="px-4 py-3 text-xs text-slate-400 text-center">
                  No subjects available.
                </div>
              )
            )}

            {/* Create New Subject Option */}
            {searchQuery.trim() !== '' && !hasExactMatch && (
              <button
                type="button"
                onClick={handleCreateNew}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left text-teal-600 border-t border-slate-100 hover:bg-teal-50 transition-colors font-medium bg-teal-50/20"
              >
                <Plus size={16} className="shrink-0 text-teal-600" />
                <span className="truncate">
                  Create and select &ldquo;
                  <span className="font-bold">{searchQuery.trim()}</span>
                  &rdquo;
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

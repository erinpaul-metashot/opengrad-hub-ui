'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import { mockCourses } from '@/lib/mockData';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Layers3,
  PlayCircle,
} from 'lucide-react';

type CourseLesson = {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'quiz' | 'assignment';
  completed: boolean;
  quizId?: string;
  assignmentId?: string;
};

type CourseModule = {
  id: string;
  title: string;
  progress: number;
  lessons: CourseLesson[];
};

type CourseRecord = {
  id: string;
  title: string;
  instructor: string;
  programme: string;
  progress: number;
  modules: CourseModule[];
};

type CourseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const getLessonHref = (lesson: CourseLesson) => {
  return `/student/lessons/${lesson.id}`;
};

const getLessonIcon = (lessonType: CourseLesson['type']) => {
  if (lessonType === 'quiz') {
    return <ClipboardList size={18} />;
  }

  if (lessonType === 'assignment') {
    return <FileText size={18} />;
  }

  return <PlayCircle size={18} />;
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = use(params);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);
  const course = mockCourses.find((candidate) => candidate.id === id) as CourseRecord | undefined;

  if (!course) {
    return (
      <LayoutShell
        role="student"
        userName="Alex Johnson"
        pageTitle="Course Not Found"
        unreadNotifications={2}
        activeNavItem="My Courses"
        onSignOut={() => {}}
        onSwitchRole={() => {}}
      >
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-slate-950">Course not found</h1>
          <p className="mt-2 text-slate-600">The requested course route does not exist in the mock data.</p>
          <Link
            href="/student/courses"
            className="mt-6 inline-flex items-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Back to courses
          </Link>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle={course.title}
      unreadNotifications={2}
      activeNavItem="My Courses"
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6">
        <section className="overflow-hidden rounded-4xl bg-linear-to-r from-[#034852] via-[#006d6c] to-[#209379] p-6 text-white shadow-xl shadow-teal-950/10 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-50">
                <BookOpen size={14} />
                Course overview
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{course.title}</h1>
                <p className="text-sm leading-6 text-teal-50/90 md:text-base">
                  {course.instructor} · {course.programme}
                </p>
                <p className="max-w-2xl text-sm leading-6 text-teal-50/85 md:text-base">
                  View modules and jump directly into lessons, quizzes, or assignments.
                </p>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-3xl bg-white/95 p-5 text-slate-950 shadow-sm">
              <div className="flex items-center justify-between text-sm font-medium text-slate-500">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-linear-to-r from-teal-600 to-lime-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">Modules</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Course roadmap</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Expand a module to see its contents and continue your learning.
              </p>
            </div>

            <Link
              href="/student/courses"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
            >
              <ArrowLeft size={16} />
              Back to courses
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {course.modules.map((courseModule) => {
              const isExpanded = expandedModuleId === courseModule.id;
              const completedLessonsCount = courseModule.lessons.filter(l => l.completed).length;

              return (
                <div
                  key={courseModule.id}
                  className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
                    isExpanded
                      ? 'border-teal-200 bg-white shadow-lg'
                      : 'border-slate-200 bg-slate-50 hover:border-teal-100 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedModuleId(isExpanded ? null : courseModule.id)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                        isExpanded ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-700'
                      }`}>
                        <Layers3 size={20} />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{courseModule.title}</h3>
                        <p className="text-sm text-slate-500">
                          {courseModule.lessons.length} items · {completedLessonsCount} completed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden w-48 items-center gap-3 sm:flex">
                        <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500"
                            style={{ width: `${courseModule.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{courseModule.progress}%</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-teal-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/30 px-5 pb-5 pt-2">
                      <div className="space-y-2">
                        {courseModule.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={getLessonHref(lesson)}
                            className="group flex items-center justify-between rounded-2xl border border-transparent bg-white/50 p-3 transition-all hover:border-teal-100 hover:bg-white hover:shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-teal-50 group-hover:text-teal-600">
                                {getLessonIcon(lesson.type)}
                              </span>
                              <div>
                                <h4 className="text-sm font-medium text-slate-900 group-hover:text-teal-700">{lesson.title}</h4>
                                <p className="text-xs text-slate-500">
                                  {lesson.type} · {lesson.duration} min
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {lesson.completed && (
                                <CheckCircle2 size={16} className="text-emerald-500" />
                              )}
                              <ChevronRight size={16} className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-500" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </LayoutShell>
  );
}
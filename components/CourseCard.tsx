'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
} from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  modulesCount: number;
  nextLesson?: string;
  nextDueAssignment?: { title: string; dueDate: string };
  programme?: string;
  variant?: 'grid' | 'list';
}

export default function CourseCard({
  id,
  title,
  instructor,
  progress,
  thumbnail,
  modulesCount,
  nextLesson,
  nextDueAssignment,
  programme,
  variant = 'grid',
}: CourseCardProps) {

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl">

      <Link href={`/student/courses/${id}`} className="block h-full">
        <div
          className={
            variant === 'list'
              ? 'grid h-full grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)]'
              : 'flex h-full flex-col'
          }
        >
          <div className={`relative overflow-hidden bg-slate-200 ${variant === 'list' ? 'min-h-[180px]' : 'h-36'}`}>
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes={variant === 'list' ? '(max-width: 1024px) 100vw, 200px' : '(max-width: 768px) 100vw, 33vw'}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
              {progress}% complete
            </div>
          </div>

          <div className={`flex flex-1 flex-col justify-between p-4 ${variant === 'list' ? 'md:p-5' : ''}`}>
            <div>
              {programme && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">
                  {programme}
                </p>
              )}

              <h3 className="mb-1 text-sm font-semibold leading-snug text-slate-950 line-clamp-2 md:text-base">
                {title}
              </h3>
              <p className="text-xs text-slate-600">{instructor}</p>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-teal-600 via-emerald-500 to-lime-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <BookOpen size={16} className="text-teal-700" />
                <span>{modulesCount} modules</span>
              </div>

              {nextLesson && (
                <div className="mt-4 rounded-2xl bg-sky-50 px-3 py-2 text-sm text-sky-900">
                  <span className="font-semibold">Next lesson:</span> {nextLesson}
                </div>
              )}

              {nextDueAssignment && (
                <div className="mt-3 rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-950">
                  <span className="font-semibold">Next due:</span> {nextDueAssignment.title} ({nextDueAssignment.dueDate})
                </div>
              )}
            </div>

            <div className="mt-4 inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-teal-700">
              Open course
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

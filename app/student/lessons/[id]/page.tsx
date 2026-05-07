'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import { mockCourses, mockQuizzes, mockAssignments } from '@/lib/mockData';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  CheckCircle2,
} from 'lucide-react';

type LessonRef = {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment';
  videoUrl?: string;
  quizId?: string;
  assignmentId?: string;
  completed: boolean;
  duration: number;
};

type ModuleRef = {
  id: string;
  title: string;
  lessons: LessonRef[];
};

type CourseRef = {
  id: string;
  title: string;
  modules: ModuleRef[];
};

type LessonPlayerProps = {
  params: Promise<{
    id: string;
  }>;
};

// --- QUIZ TYPES ---
type Question = {
  id: string;
  type: 'mcq' | 'fill' | 'numeric' | 'group';
  question: string;
  options?: string[];
  answer: string | number;
  passage?: string;
  subQuestions?: any[];
};

type QuizRecord = {
  id: string;
  courseId: string;
  title: string;
  duration: number;
  questions: Question[];
};

// --- ASSIGNMENT TYPES ---
type AssignmentRecord = {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  description: string;
};

const getLessonHref = (lesson: LessonRef) => {
  return `/student/lessons/${lesson.id}`;
};

const getLessonLabel = (lesson: LessonRef, isModuleTransition: boolean, isNext: boolean) => {
  const prefix = isModuleTransition ? (isNext ? 'next module: ' : 'prev module: ') : '';
  
  if (lesson.type === 'quiz') return `${prefix}quiz`;
  if (lesson.type === 'assignment') return `${prefix}assignment`;
  return `${prefix}lesson`;
};

export default function LessonPlayer({ params }: LessonPlayerProps) {
  const { id } = use(params);

  // --- CONTENT IDENTIFICATION ---
  const course = mockCourses.find((c) =>
    c.modules.some((m) => m.lessons.some((l) => l.id === id))
  ) as CourseRef | undefined;

  const courseModule = course?.modules.find((m) =>
    m.lessons.some((l) => l.id === id)
  ) as ModuleRef | undefined;

  const moduleIndex = course?.modules.findIndex((m) => m.id === courseModule?.id) ?? -1;
  const lessonIndex = courseModule?.lessons.findIndex((l) => l.id === id) ?? -1;
  const lesson = lessonIndex >= 0 ? (courseModule?.lessons[lessonIndex] as LessonRef | undefined) : undefined;

  // --- QUIZ STATE ---
  const quiz = lesson?.type === 'quiz' ? mockQuizzes.find((q) => q.id === lesson.quizId) as QuizRecord | undefined : undefined;
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string | number, string | number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set<number>());
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- ASSIGNMENT STATE ---
  const assignment = lesson?.type === 'assignment' ? mockAssignments.find((a) => a.id === lesson.assignmentId) as AssignmentRecord | undefined : undefined;
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Previous lesson/module logic
  let previousLesson = lessonIndex > 0 ? courseModule?.lessons[lessonIndex - 1] : null;
  let isPrevModule = false;

  if (!previousLesson && course && moduleIndex > 0) {
    const prevModule = course.modules[moduleIndex - 1];
    if (prevModule.lessons.length > 0) {
      previousLesson = prevModule.lessons[prevModule.lessons.length - 1];
      isPrevModule = true;
    }
  }

  // Next lesson/module logic
  let nextLesson =
    courseModule && lessonIndex >= 0 && lessonIndex < courseModule.lessons.length - 1
      ? courseModule.lessons[lessonIndex + 1]
      : null;
  let isNextModule = false;

  if (!nextLesson && course && moduleIndex >= 0 && moduleIndex < course.modules.length - 1) {
    const nextModule = course.modules[moduleIndex + 1];
    if (nextModule.lessons.length > 0) {
      nextLesson = nextModule.lessons[0];
      isNextModule = true;
    }
  }


  if (!course || !courseModule || !lesson) {
    return (
      <LayoutShell
        role="student"
        userName="Alex Johnson"
        pageTitle="Lesson Not Found"
        unreadNotifications={0}
        onSignOut={() => {}}
        onSwitchRole={() => {}}
      >
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-slate-950">Lesson unavailable</h1>
          <p className="mt-2 text-slate-600">
            {!course || !courseModule || !lesson
              ? 'The requested lesson does not exist in the mock data.'
              : 'This route is reserved for video lessons. Open a quiz or assignment from the module page instead.'}
          </p>
          {course && courseModule ? (
            <Link
              href={`/student/courses/${course.id}`}
              className="mt-6 inline-flex items-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Back to course
            </Link>
          ) : (
            <Link
              href="/student/courses"
              className="mt-6 inline-flex items-center rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Back to courses
            </Link>
          )}
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell
      role="student"
      userName="Alex Johnson"
      pageTitle={lesson.title}
      activeNavItem="My Courses"
      unreadNotifications={0}
      onSignOut={() => {}}
      onSwitchRole={() => {}}
    >
      <div className="space-y-6 max-w-6xl">
        <section className="rounded-4xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          {/* Header row */}
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <Link href="/student/courses" className="inline-flex items-center gap-1 hover:text-teal-700">
                  <ArrowLeft size={14} /> Courses
                </Link>
                <span>•</span>
                <Link href={`/student/courses/${course.id}`} className="hover:text-teal-700">
                  {course.title}
                </Link>
                <span>•</span>
                <span className="text-slate-900 font-medium">
                  {courseModule.title}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-bold text-slate-950">{lesson.title}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {course.title} · {courseModule.title} · {lesson.duration} min
              </p>
            </div>

            {/* Prev / Next / Mark complete */}
            <div className="flex flex-wrap gap-3">
              {previousLesson ? (
                <Link
                  href={getLessonHref(previousLesson)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:text-teal-700"
                >
                  <ChevronLeft size={16} />
                  Prev {getLessonLabel(previousLesson, isPrevModule, false)}
                </Link>
              ) : null}

              {nextLesson ? (
                <Link
                  href={getLessonHref(nextLesson)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Next {getLessonLabel(nextLesson, isNextModule, true)}
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <Link
                  href={`/student/courses/${course.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                >
                  Finish Course
                  <CheckCircle2 size={18} />
                </Link>
              )}
            </div>
          </div>

          <div className="mt-8">
            {lesson.type === 'video' && lesson.videoUrl && (
              <div className="overflow-hidden rounded-3xl bg-slate-950 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-900">
                <iframe
                  title={lesson.title}
                  src={lesson.videoUrl}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {lesson.type === 'quiz' && quiz && (
              <div className="space-y-6">
                {!quizSubmitted ? (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="order-last lg:order-first lg:col-span-3 space-y-6">
                      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                          <h2 className="text-xl font-bold text-slate-900">
                            Question {currentQuestionIdx + 1} of {quiz.questions.length}
                          </h2>
                          <button
                            onClick={() => {
                              setFlaggedQuestions((curr) => {
                                const next = new Set(curr);
                                if (next.has(currentQuestionIdx)) next.delete(currentQuestionIdx);
                                else next.add(currentQuestionIdx);
                                return next;
                              });
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-colors ${
                              flaggedQuestions.has(currentQuestionIdx)
                                ? 'bg-amber-100 text-amber-700 font-semibold'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Flag size={18} /> {flaggedQuestions.has(currentQuestionIdx) ? 'Flagged' : 'Flag'}
                          </button>
                        </div>

                        <p className="text-lg text-slate-800 mb-8 font-medium">
                          {quiz.questions[currentQuestionIdx].question}
                        </p>

                        <div className="space-y-3 mb-8">
                          {quiz.questions[currentQuestionIdx].type === 'mcq' &&
                            quiz.questions[currentQuestionIdx].options?.map((opt, idx) => (
                              <label
                                key={idx}
                                className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                                  quizAnswers[currentQuestionIdx] === idx
                                    ? 'border-teal-600 bg-teal-50'
                                    : 'border-slate-100 hover:border-teal-100 hover:bg-slate-50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="answer"
                                  checked={quizAnswers[currentQuestionIdx] === idx}
                                  onChange={() => setQuizAnswers((prev) => ({ ...prev, [currentQuestionIdx]: idx }))}
                                  className="hidden"
                                />
                                <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 mr-4 ${
                                  quizAnswers[currentQuestionIdx] === idx ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                                }`}>
                                  {quizAnswers[currentQuestionIdx] === idx && <div className="h-2 w-2 rounded-full bg-white" />}
                                </span>
                                <span className="text-slate-700">{opt}</span>
                              </label>
                            ))}
                          
                          {(quiz.questions[currentQuestionIdx].type === 'fill' || quiz.questions[currentQuestionIdx].type === 'numeric') && (
                            <input
                              type={quiz.questions[currentQuestionIdx].type === 'numeric' ? 'number' : 'text'}
                              value={quizAnswers[currentQuestionIdx] || ''}
                              onChange={(e) => setQuizAnswers((prev) => ({ ...prev, [currentQuestionIdx]: e.target.value }))}
                              placeholder="Type your answer..."
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            />
                          )}

                          {quiz.questions[currentQuestionIdx].type === 'group' && (
                            <div className="space-y-6">
                              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-h-60 overflow-y-auto leading-relaxed text-slate-700 italic">
                                {quiz.questions[currentQuestionIdx].passage}
                              </div>
                              <div className="space-y-8">
                                {quiz.questions[currentQuestionIdx].subQuestions?.map((sq: any, sIdx: number) => (
                                  <div key={sq.id} className="space-y-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                                    <p className="font-bold text-slate-900 flex items-center gap-2">
                                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-[10px]">{sIdx + 1}</span>
                                      {sq.question || sq.title}
                                    </p>
                                    
                                    <div className="space-y-2">
                                      {sq.type === 'mcq' && sq.options?.map((opt: string, oIdx: number) => (
                                        <label
                                          key={oIdx}
                                          className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                                            quizAnswers[`${currentQuestionIdx}_${sIdx}`] === oIdx
                                              ? 'border-teal-600 bg-teal-50'
                                              : 'border-slate-100 hover:border-teal-100 hover:bg-slate-50'
                                          }`}
                                        >
                                          <input
                                            type="radio"
                                            name={`answer_${currentQuestionIdx}_${sIdx}`}
                                            checked={quizAnswers[`${currentQuestionIdx}_${sIdx}`] === oIdx}
                                            onChange={() => setQuizAnswers((prev) => ({ ...prev, [`${currentQuestionIdx}_${sIdx}`]: oIdx }))}
                                            className="hidden"
                                          />
                                          <span className={`flex h-4 w-4 items-center justify-center rounded-full border mr-3 ${
                                            quizAnswers[`${currentQuestionIdx}_${sIdx}`] === oIdx ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                                          }`}>
                                            {quizAnswers[`${currentQuestionIdx}_${sIdx}`] === oIdx && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                          </span>
                                          <span className="text-xs text-slate-700">{opt}</span>
                                        </label>
                                      ))}
                                      
                                      {(sq.type === 'fill' || sq.type === 'numeric' || sq.type === 'Fill') && (
                                        <input
                                          type={sq.type === 'numeric' ? 'number' : 'text'}
                                          value={quizAnswers[`${currentQuestionIdx}_${sIdx}`] || ''}
                                          onChange={(e) => setQuizAnswers((prev) => ({ ...prev, [`${currentQuestionIdx}_${sIdx}`]: e.target.value }))}
                                          placeholder="Type your answer..."
                                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                          <button
                            onClick={() => setCurrentQuestionIdx((c) => Math.max(0, c - 1))}
                            disabled={currentQuestionIdx === 0}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                          >
                            <ChevronLeft size={18} /> Previous
                          </button>

                          {currentQuestionIdx === quiz.questions.length - 1 ? (
                            <button
                              onClick={() => setQuizSubmitted(true)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                            >
                              Submit Quiz
                            </button>
                          ) : (
                            <button
                              onClick={() => setCurrentQuestionIdx((c) => c + 1)}
                              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                              Next <ChevronRight size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="order-first lg:order-last space-y-4">
                      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-rose-600 font-bold mb-4">
                          <Clock size={20} />
                          <span>{Math.floor(quiz.duration / 60)}:{String(quiz.duration % 60).padStart(2, '0')}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Navigation</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {quiz.questions.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentQuestionIdx(idx)}
                              className={`p-2 rounded-xl text-center font-bold text-xs transition-all ${
                                currentQuestionIdx === idx
                                  ? 'bg-teal-600 text-white shadow-md'
                                  : flaggedQuestions.has(idx)
                                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                  : quizAnswers[idx] !== undefined
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-4xl bg-emerald-50/50 border border-emerald-100 p-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-900">Quiz Completed!</h2>
                    <p className="mt-2 text-emerald-700 max-w-md mx-auto">
                      Your answers have been recorded. You can now move on to the next item in the course.
                    </p>
                  </div>
                )}
              </div>
            )}

            {lesson.type === 'assignment' && assignment && (
              <div className="space-y-6">
                {!assignmentSubmitted ? (
                  <div className="bg-white rounded-4xl border border-slate-200 p-8 shadow-sm">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-slate-950">Assignment Instructions</h2>
                      <div className="mt-4 p-5 rounded-3xl bg-slate-50 text-slate-700 leading-relaxed border border-slate-100">
                        {assignment.description}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900">Your Submission</h3>
                      <textarea
                        rows={8}
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        placeholder="Write your response here or upload a file below..."
                      />
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
                        <div className="flex gap-2">
                          <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                            Upload File
                          </button>
                        </div>
                        <button
                          onClick={() => setAssignmentSubmitted(true)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-teal-700 shadow-lg shadow-teal-600/20"
                        >
                          Submit Work
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-4xl bg-emerald-50/50 border border-emerald-100 p-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-900">Assignment Submitted!</h2>
                    <p className="mt-2 text-emerald-700 max-w-md mx-auto">
                      Your submission has been received. The instructor will review your work shortly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </LayoutShell>
  );
}

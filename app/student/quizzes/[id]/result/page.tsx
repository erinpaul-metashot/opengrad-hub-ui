'use client';
import React, { use } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import { CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { mockQuizzes, mockCourses, mockGlobalQuizzes } from '@/lib/mockData';

const quizResultDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export default function QuizResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = mockQuizzes.find((q) => q.id === id) || mockGlobalQuizzes.find((q) => q.id === id);
  const course = quiz && 'courseId' in quiz ? mockCourses.find(c => c.id === (quiz as any).courseId) : null;

  if (!quiz) {
    return (
      <LayoutShell role="student" userName="Alex Johnson" pageTitle="Results Not Found" unreadNotifications={0} onSignOut={() => {}} onSwitchRole={() => {}}>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl font-bold text-slate-900">Results not found</p>
          <p className="text-slate-500 mt-2">We couldn't find the results for this quiz.</p>
          <Link href="/student/quizzes" className="mt-6 text-teal-600 font-bold hover:underline">Back to Quizzes</Link>
        </div>
      </LayoutShell>
    );
  }

  const lastAttempt = quiz.attempts[quiz.attempts.length - 1];
  if (!lastAttempt) {
    return (
      <LayoutShell role="student" userName="Alex Johnson" pageTitle={quiz.title + ' Results'} unreadNotifications={0} onSignOut={() => {}} onSwitchRole={() => {}}>
        <div className="max-w-4xl space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">No attempts recorded yet</h1>
            <p className="text-gray-600 mb-6">Start the quiz to see a score summary and review answers here.</p>
            <div className="flex gap-4 justify-center">
              <Link href={`/student/quizzes/${id}/take`} className="px-6 py-3 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700">Take Quiz</Link>
              <Link href="/student/quizzes" className="px-6 py-3 rounded-lg font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200">Back to Quizzes</Link>
            </div>
          </div>
        </div>
      </LayoutShell>
    );
  }

  const passed = lastAttempt?.score >= quiz.passThreshold;

  return (
    <LayoutShell role="student" userName="Alex Johnson" pageTitle={quiz.title + ' Results'} unreadNotifications={0} onSignOut={() => {}} onSwitchRole={() => {}}>
      <div className="max-w-4xl space-y-6">
        <div className={`rounded-lg p-8 text-center text-white ${passed ? 'bg-linear-to-r from-green-600 to-green-700' : 'bg-linear-to-r from-orange-600 to-orange-700'}`}>
          {passed ? <CheckCircle className="mx-auto mb-4" size={60} /> : <XCircle className="mx-auto mb-4" size={60} />}
          <h1 className="text-4xl font-bold mb-2">{lastAttempt?.score}%</h1>
          <p className="text-xl">{passed ? 'Congratulations! You passed!' : 'You did not reach the passing score.'}</p>
          <p className="text-green-50 mt-2">Passing Score: {quiz.passThreshold}%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600 text-sm">Time Spent</p>
            <p className="text-3xl font-bold text-gray-900">{lastAttempt?.timeSpent} min</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600 text-sm">Attempt</p>
            <p className="text-3xl font-bold text-gray-900">{lastAttempt?.attemptNumber}/{quiz.maxAttempts}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600 text-sm">Date</p>
            <p className="text-lg font-bold text-gray-900">{lastAttempt?.dateAttempted ? quizResultDateFormatter.format(new Date(lastAttempt.dateAttempted)) : 'N/A'}</p>
          </div>
        </div>

        {quiz.showAnswers && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><BarChart3 /> Review Answers</h2>
            <div className="space-y-4">
              {quiz.questions.map((q, idx) => (
                <div key={idx} className="border-l-4 border-teal-600 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Question {idx + 1}: {q.question}</p>
                  {q.explanation && <p className="text-sm text-gray-600 mt-2 italic">{q.explanation}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Link href={`/student/quizzes/${id}/take`} className="flex-1 inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700">Retake Quiz</Link>
          <Link href="/student/quizzes" className="flex-1 inline-flex items-center justify-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">Back to Quizzes</Link>
        </div>
      </div>
    </LayoutShell>
  );
}

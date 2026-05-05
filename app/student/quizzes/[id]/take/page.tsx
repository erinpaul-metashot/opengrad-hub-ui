'use client';
import React, { use, useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import { Clock, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockQuizzes, mockCourses, mockGlobalQuizzes } from '@/lib/mockData';

type QuizTakePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function QuizTakePage({ params }: QuizTakePageProps) {
  const { id } = use(params);
  const quiz = mockQuizzes.find((q) => q.id === id) || mockGlobalQuizzes.find((q) => q.id === id);
  const course = quiz && 'courseId' in quiz ? mockCourses.find((c) => c.id === (quiz as any).courseId) : null;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set<number>());
  const [timeRemaining] = useState(quiz?.duration || 0);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return (
      <LayoutShell 
        role="student" 
        userName="Alex Johnson" 
        pageTitle="Quiz Not Found" 
        activeNavItem="Quizzes"
        unreadNotifications={0} 
        onSignOut={() => {}} 
        onSwitchRole={() => {}}
      >
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-xl font-bold text-slate-900">Quiz not found</p>
          <p className="text-slate-500 mt-2">The quiz you are looking for does not exist or has been removed.</p>
          <Link href="/student/quizzes" className="mt-6 text-teal-600 font-bold hover:underline">Back to Quizzes</Link>
        </div>
      </LayoutShell>
    );
  }

  const question = quiz.questions[currentQuestion];

  const handleAnswer = (value: string | number) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion]: value,
    }));
  };

  const toggleFlag = () => {
    setFlagged((currentFlagged) => {
      const nextFlagged = new Set(currentFlagged);
      if (nextFlagged.has(currentQuestion)) {
        nextFlagged.delete(currentQuestion);
      } else {
        nextFlagged.add(currentQuestion);
      }
      return nextFlagged;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <LayoutShell 
      role="student" 
      userName="Alex Johnson" 
      pageTitle={quiz.title} 
      activeNavItem="Quizzes"
      unreadNotifications={0} 
      onSignOut={() => {}} 
      onSwitchRole={() => {}}
    >
      <div className="max-w-6xl">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Question {currentQuestion + 1} of {quiz.questions.length}</h2>
                  <button
                    onClick={toggleFlag}
                    className={`flex items-center gap-2 px-4 py-2 rounded ${flagged.has(currentQuestion) ? 'bg-yellow-100 text-yellow-900' : 'bg-gray-100 text-gray-900'}`}
                  >
                    <Flag size={20} /> Flag
                  </button>
                </div>

                <p className="text-lg text-gray-900 mb-6">{question.question}</p>

                <div className="space-y-3 mb-6">
                  {question.type === 'mcq' && question.options?.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${answers[currentQuestion] === idx ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        checked={answers[currentQuestion] === idx}
                        onChange={() => handleAnswer(idx)}
                        className="mr-3"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}

                  {question.type === 'fill' && (
                    <input
                      type="text"
                      value={answers[currentQuestion] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full p-4 border border-gray-300 rounded-lg"
                    />
                  )}

                  {question.type === 'numeric' && (
                    <input
                      type="number"
                      value={answers[currentQuestion] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Enter a number..."
                      className="w-full p-4 border border-gray-300 rounded-lg"
                    />
                  )}

                  {question.type === 'group' && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-h-60 overflow-y-auto leading-relaxed text-slate-700 italic">
                        {(question as any).passage}
                      </div>
                      <div className="space-y-8">
                        {(question as any).subQuestions?.map((sq: any, sIdx: number) => (
                          <div key={sq.id || sIdx} className="space-y-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                            <p className="font-bold text-slate-900 flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-[10px]">{sIdx + 1}</span>
                              {sq.question || sq.title}
                            </p>
                            
                            <div className="space-y-2">
                              {sq.type === 'mcq' && sq.options?.map((opt: string, oIdx: number) => (
                                <label
                                  key={oIdx}
                                  className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                                    answers[`${currentQuestion}_${sIdx}`] === oIdx
                                      ? 'border-teal-600 bg-teal-50'
                                      : 'border-slate-100 hover:border-teal-100 hover:bg-slate-50'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`answer_${currentQuestion}_${sIdx}`}
                                    checked={answers[`${currentQuestion}_${sIdx}`] === oIdx}
                                    onChange={() => setAnswers((prev) => ({ ...prev, [`${currentQuestion}_${sIdx}`]: oIdx }))}
                                    className="hidden"
                                  />
                                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border mr-3 ${
                                    answers[`${currentQuestion}_${sIdx}`] === oIdx ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300'
                                  }`}>
                                    {answers[`${currentQuestion}_${sIdx}`] === oIdx && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                                  </span>
                                  <span className="text-xs text-slate-700">{opt}</span>
                                </label>
                              ))}
                              
                              {(sq.type === 'fill' || sq.type === 'numeric' || sq.type === 'Fill') && (
                                <input
                                  type={sq.type === 'numeric' ? 'number' : 'text'}
                                  value={answers[`${currentQuestion}_${sIdx}`] || ''}
                                  onChange={(e) => setAnswers((prev) => ({ ...prev, [`${currentQuestion}_${sIdx}`]: e.target.value }))}
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

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 bg-gray-100 text-gray-900 px-4 py-2 rounded disabled:opacity-50"
                  >
                    <ChevronLeft /> Previous
                  </button>
                  {currentQuestion === quiz.questions.length - 1 ? (
                    <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded font-semibold">
                      Submit Quiz
                    </button>
                  ) : (
                    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded">
                      Next <ChevronRight />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
                <Clock size={20} /> {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-gray-900 mb-4">Questions</h3>
              <div className="grid grid-cols-4 gap-2">
                {quiz.questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`p-2 rounded text-center font-semibold text-sm ${currentQuestion === idx ? 'bg-teal-600 text-white' : flagged.has(idx) ? 'bg-yellow-100 text-yellow-900' : answers[idx] ? 'bg-green-100 text-green-900' : 'bg-gray-200 text-gray-900'}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <p className="text-green-900 text-xl font-semibold mb-2">Quiz Submitted!</p>
            <p className="text-green-800 mb-6">Your answers have been recorded. Results coming soon!</p>
            <Link 
              href="/student/quizzes"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors"
            >
              Back to Quizzes
            </Link>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}

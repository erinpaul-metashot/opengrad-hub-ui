'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Database,
  FileText,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';

const MOCK_QUESTIONS = [
  { id: 1, title: 'What is the powerhouse of the cell?', type: 'MCQ', subject: 'Biology', difficulty: 'Easy', lastUpdated: '2 days ago' },
  { id: 2, title: 'Solve for x: 2x + 5 = 15', type: 'Numerical', subject: 'Mathematics', difficulty: 'Medium', lastUpdated: '5 days ago' },
  { id: 3, title: 'Explain the concept of OOP.', type: 'Fill in the blanks', subject: 'Computer Science', difficulty: 'Hard', lastUpdated: '1 week ago' },
  { id: 4, title: 'Which tag is used for a hyperlink?', type: 'MCQ', subject: 'Web Dev', difficulty: 'Easy', lastUpdated: '2 weeks ago' },
  { id: 5, title: 'Calculate the derivative of x^2', type: 'Numerical', subject: 'Mathematics', difficulty: 'Medium', lastUpdated: '1 month ago' },
  { id: 6, title: 'Read the following passage and answer...', type: 'Group', subject: 'English', difficulty: 'Medium', lastUpdated: '1 hour ago' },
];

export default function QuestionBankPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [questionType, setQuestionType] = useState('MCQ');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [passage, setPassage] = useState('');
  const [subQuestions, setSubQuestions] = useState<any[]>([
    { id: Date.now(), title: '', type: 'MCQ', options: ['', '', '', ''], correctOption: 0 }
  ]);

  const filteredQuestions = MOCK_QUESTIONS.filter(q =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (q: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    setEditingQuestion(q);
    setQuestionType(q.type);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingQuestion(null);
    setOptions(['', '', '', '']);
    setPassage('');
    setSubQuestions([{ id: Date.now(), title: '', type: 'MCQ', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const addSubQuestion = () => {
    setSubQuestions([...subQuestions, { id: Date.now(), title: '', type: 'MCQ', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const removeSubQuestion = (id: number) => {
    setSubQuestions(subQuestions.filter(sq => sq.id !== id));
  };

  const updateSubQuestion = (id: number, field: string, value: any) => {
    setSubQuestions(subQuestions.map(sq => sq.id === id ? { ...sq, [field]: value } : sq));
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Question Bank"
      activeNavItem="Question Bank"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Database className="text-teal-600" size={24} />
              Question Repository
            </h1>
            <p className="text-sm text-slate-500 mt-1">Manage and organize all test and quiz questions.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-700 active:scale-95"
          >
            <Plus size={16} />
            Create Question
          </button>
        </div>

        {/* Filters & Search */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by question title or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white">
              <option>Subject: All</option>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Computer Science</option>
            </select>
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:bg-white">
               <option>Type: All</option>
              <option>MCQ</option>
              <option>Numerical</option>
              <option>Fill in the blanks</option>
              <option>Group</option>
            </select>
            <button className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4 pl-6">Question Title</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Difficulty</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                          {q.type === 'MCQ' ? <ListOrdered size={16} /> : <FileText size={16} />}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 truncate max-w-sm">{q.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Updated {q.lastUpdated}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{q.subject}</td>
                    <td className="p-4">
                      <span className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {q.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                        q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                        'bg-rose-50 text-rose-700'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(q)}
                          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slide-over Mock for Creation/Edit */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">{editingQuestion ? 'Edit Question' : 'Create New Question'}</h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                &times;
              </button>
            </div>
            <div className="p-6 flex-1 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Question Content</label>
                <textarea 
                  rows={4} 
                  defaultValue={editingQuestion?.title}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none" 
                  placeholder="Type your question here..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Question Type</label>
                  <select 
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                     <option value="MCQ">Multiple Choice</option>
                    <option value="Numerical">Numerical</option>
                    <option value="Fill in the blanks">Fill in the blanks</option>
                    <option value="Group">Group Question (Reading Comprehension)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Difficulty</label>
                  <select 
                    defaultValue={editingQuestion?.difficulty || 'Easy'}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              {questionType === 'MCQ' && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                  <label className="text-sm font-semibold text-slate-700">Answer Options</label>
                  <div className="space-y-3">
                    {options.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="correctOption" 
                          checked={correctOption === idx}
                          onChange={() => setCorrectOption(idx)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        />
                        <input 
                          type="text" 
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[idx] = e.target.value;
                            setOptions(newOptions);
                          }}
                          placeholder={`Option ${idx + 1}`}
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 transition"
                        />
                        {idx > 1 && (
                          <button 
                            onClick={() => setOptions(options.filter((_, i) => i !== idx))}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setOptions([...options, ''])}
                    className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} /> Add Option
                  </button>
                </div>
              )}

              {questionType === 'Group' && (
                <div className="space-y-6 pt-4 border-t border-slate-100 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Passage / Reading Material</label>
                    <textarea 
                      rows={6} 
                      value={passage}
                      onChange={(e) => setPassage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none" 
                      placeholder="Type the passage that students will read..."
                    ></textarea>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-700">Sub-Questions</label>
                    </div>
                    
                    <div className="space-y-4">
                      {subQuestions.map((sq, idx) => (
                        <div key={sq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative group/sq">
                          <button 
                            onClick={() => removeSubQuestion(sq.id)}
                            className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-600 opacity-0 group-hover/sq:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sub-Question {idx + 1}</span>
                          </div>
                          
                          <textarea 
                            rows={2}
                            value={sq.title}
                            onChange={(e) => updateSubQuestion(sq.id, 'title', e.target.value)}
                            placeholder="Type sub-question..."
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
                          />
                          
                          <div className="grid grid-cols-2 gap-3">
                            <select 
                              value={sq.type}
                              onChange={(e) => updateSubQuestion(sq.id, 'type', e.target.value)}
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none"
                            >
                              <option value="MCQ">MCQ</option>
                              <option value="Numerical">Numerical</option>
                              <option value="Fill">Fill in blanks</option>
                            </select>
                          </div>

                          {sq.type === 'MCQ' && (
                            <div className="space-y-2 pt-2">
                              {sq.options.map((opt: string, optIdx: number) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <input 
                                    type="radio" 
                                    checked={sq.correctOption === optIdx}
                                    onChange={() => updateSubQuestion(sq.id, 'correctOption', optIdx)}
                                    className="w-3 h-3 text-teal-600"
                                  />
                                  <input 
                                    type="text" 
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...sq.options];
                                      newOpts[optIdx] = e.target.value;
                                      updateSubQuestion(sq.id, 'options', newOpts);
                                    }}
                                    placeholder={`Option ${optIdx + 1}`}
                                    className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {(sq.type === 'Numerical' || sq.type === 'Fill') && (
                            <div className="space-y-2 pt-2">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Correct Answer</label>
                              <input 
                                type="text" 
                                value={sq.answer || ''}
                                onChange={(e) => updateSubQuestion(sq.id, 'answer', e.target.value)}
                                placeholder={sq.type === 'Numerical' ? 'e.g., 42' : 'e.g., Answer text...'}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500 bg-white"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={addSubQuestion}
                      className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-teal-600 bg-teal-50/50 hover:bg-teal-50 rounded-xl border border-dashed border-teal-200 transition-all active:scale-[0.98]"
                    >
                      <Plus size={16} /> Add Sub-Question
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50">
              <button onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
              <button onClick={handleCloseModal} className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors flex items-center gap-2 shadow-md">
                <CheckCircle2 size={16} /> {editingQuestion ? 'Update Question' : 'Save Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

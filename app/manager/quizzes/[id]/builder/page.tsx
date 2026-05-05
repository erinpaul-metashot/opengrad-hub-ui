'use client';

import React, { useState, useMemo } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { 
  ChevronLeft,
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  FileQuestion,
  Database,
  Search,
  Filter,
  Check,
  CheckCircle2,
  X,
  ListOrdered,
  FileText,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA ---
const MOCK_QUESTION_BANK = [
  { id: 'qb1', title: 'What is the powerhouse of the cell?', type: 'MCQ', subject: 'Biology', difficulty: 'Easy', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi Body'], correctOption: 0 },
  { id: 'qb2', title: 'Solve for x: 2x + 5 = 15', type: 'Numerical', subject: 'Mathematics', difficulty: 'Medium', answer: '5' },
  { id: 'qb3', title: 'Explain the concept of OOP.', type: 'Fill in the blanks', subject: 'Computer Science', difficulty: 'Hard' },
  { id: 'qb4', title: 'Which tag is used for a hyperlink?', type: 'MCQ', subject: 'Web Dev', difficulty: 'Easy', options: ['<a>', '<link>', '<href>', '<url>'], correctOption: 0 },
  { id: 'qb5', title: 'Calculate the derivative of x^2', type: 'Numerical', subject: 'Mathematics', difficulty: 'Medium', answer: '2x' },
  { id: 'qb6', title: 'Who wrote "Romeo and Juliet"?', type: 'MCQ', subject: 'Literature', difficulty: 'Easy', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctOption: 1 },
  { id: 'qb7', title: 'Reading Comprehension: Web Development', type: 'Group', subject: 'Web Dev', difficulty: 'Medium', passage: 'Web development is the work involved in developing a website...', subQuestions: [{ title: 'What is web dev?', type: 'MCQ', options: ['A', 'B', 'C', 'D'], correctOption: 0 }] },
];

const MOCK_QUIZ_METADATA = {
  id: '1',
  title: 'HTML & CSS Basics',
  course: 'Web Development Fundamentals',
  duration: '30 mins',
  attempts: 124,
  status: 'Active'
};

// --- TYPES ---
type QuestionType = 'MCQ' | 'Numerical' | 'Fill in the blanks' | 'Group';

interface Question {
  id: string;
  title: string;
  type: QuestionType;
  subject?: string;
  difficulty?: string;
  options?: string[];
  correctOption?: number;
  answer?: string;
  isCustom?: boolean;
  passage?: string;
  subQuestions?: any[];
}

export default function QuizBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const [questions, setQuestions] = useState<Question[]>([
    { ...MOCK_QUESTION_BANK[0], id: 'q1' },
    { ...MOCK_QUESTION_BANK[3], id: 'q2' }
  ]);

  const [slideOver, setSlideOver] = useState<{
    isOpen: boolean;
    type: 'Bank' | 'Custom' | 'Edit' | null;
    editingQuestion?: Question;
  }>({ isOpen: false, type: null });

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showAddChooser, setShowAddChooser] = useState(false);

  // --- HANDLERS ---
  const handleAddFromBank = (qbQuestions: Question[]) => {
    const newQuestions = qbQuestions.map(q => ({
      ...q,
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isCustom: false
    }));
    setQuestions([...questions, ...newQuestions]);
    setSlideOver({ isOpen: false, type: null });
  };

  const handleSaveCustomQuestion = (qData: Partial<Question>) => {
    if (slideOver.type === 'Edit' && slideOver.editingQuestion) {
      setQuestions(prev => prev.map(q => q.id === slideOver.editingQuestion!.id ? { ...q, ...qData } : q));
    } else {
      const newQuestion: Question = {
        id: `custom-${Date.now()}`,
        title: qData.title || 'Untitled Question',
        type: qData.type || 'MCQ',
        subject: qData.subject || 'General',
        difficulty: qData.difficulty || 'Medium',
        options: qData.options,
        correctOption: qData.correctOption,
        answer: qData.answer,
        isCustom: true
      };
      setQuestions([...questions, newQuestion]);
    }
    setSlideOver({ isOpen: false, type: null });
  };

  const handleDeleteQuestion = (qId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== qId));
  };

  const handleEditQuestion = (q: Question) => {
    setSlideOver({ isOpen: true, type: 'Edit', editingQuestion: q });
  };

  return (
    <LayoutShell
      role="manager"
      userName="Manager"
      pageTitle="Quiz Builder"
      activeNavItem="Quizzes"
    >
      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Link href="/manager/quizzes" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                <ChevronLeft size={14} /> Back to Quizzes
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <FileQuestion size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{MOCK_QUIZ_METADATA.title}</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Builder — {questions.length} Questions • {MOCK_QUIZ_METADATA.duration} • {MOCK_QUIZ_METADATA.course}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowPublishModal(true)}
              className="px-6 py-2.5 text-sm font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-700 shadow-md shadow-purple-900/10 transition-all active:scale-95 disabled:opacity-50"
            >
              Save & Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Builder Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Questions List
                <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{questions.length}</span>
              </h2>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileQuestion size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Your quiz is empty</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">Start building your quiz by adding questions from the bank or creating custom ones.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setSlideOver({ isOpen: true, type: 'Bank' })}
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/10"
                  >
                    <Database size={18} /> Add from Bank
                  </button>
                  <button 
                    onClick={() => setSlideOver({ isOpen: true, type: 'Custom' })}
                    className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Plus size={18} /> Create Custom
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={q.id} className="group bg-white border border-slate-200 rounded-2xl p-4 hover:border-purple-300 hover:shadow-md transition-all relative overflow-hidden">
                    <div className="flex gap-4">
                      <div className="pt-1 cursor-grab text-slate-300 hover:text-slate-500">
                        <GripVertical size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            Q{index + 1}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            q.isCustom ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-teal-50 text-teal-600 border border-teal-100'
                          }`}>
                            {q.isCustom ? 'Custom' : 'Bank'}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {q.type}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-relaxed pr-20">{q.title}</h4>
                        {q.type === 'MCQ' && q.options && (
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, i) => (
                              <div key={i} className={`text-xs px-3 py-2 rounded-lg border flex items-center gap-2 ${
                                i === q.correctOption ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' : 'bg-slate-50 border-slate-100 text-slate-600'
                              }`}>
                                {i === q.correctOption && <CheckCircle2 size={12} />}
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                        {(q.type === 'Numerical' || q.type === 'Fill in the blanks') && q.answer && (
                          <div className="mt-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 inline-block">
                            <span className="font-semibold text-slate-700">Answer:</span> {q.answer}
                          </div>
                        )}
                        {q.type === 'Group' && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-slate-500 line-clamp-2 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                              {q.passage}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                                {q.subQuestions?.length || 0} Sub-questions
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-slate-100">
                      <button 
                        onClick={() => handleEditQuestion(q)}
                        className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Question Chooser Area */}
                <div className="pt-4">
                  {showAddChooser ? (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                      <p className="text-sm font-bold text-slate-700 mb-3">Choose question source</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => { setShowAddChooser(false); setSlideOver({ isOpen: true, type: 'Bank' }); }}
                          className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-all text-slate-600 group/btn shadow-sm"
                        >
                          <Database size={28} className="mb-2 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-sm font-bold">From Bank</span>
                        </button>
                        <button 
                          onClick={() => { setShowAddChooser(false); setSlideOver({ isOpen: true, type: 'Custom' }); }}
                          className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-all text-slate-600 group/btn shadow-sm"
                        >
                          <Plus size={28} className="mb-2 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-sm font-bold">Custom</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setShowAddChooser(false)}
                        className="mt-4 text-xs font-bold text-slate-500 hover:text-slate-700 w-full py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowAddChooser(true)}
                      className="w-full py-4 flex items-center justify-center gap-2 text-sm font-bold text-purple-600 bg-purple-50/50 hover:bg-purple-50 rounded-2xl border-2 border-dashed border-purple-200 transition-all active:scale-[0.98]"
                    >
                      <Plus size={18} /> Add Question
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <AlertCircle size={16} className="text-blue-500" />
                Builder Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  Mix Question Bank and Custom questions for better variety.
                </li>
                <li className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  Use MCQ for quick grading and Fill in the blanks for precision.
                </li>
                <li className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                  Drag the handle on the left to reorder questions in your quiz.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* --- SLIDE OVERS --- */}
      {slideOver.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
          <div className="bg-white w-full max-w-2xl h-full overflow-hidden sm:rounded-l-3xl shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${
                  slideOver.type === 'Bank' ? 'bg-teal-50 text-teal-600' : 
                  slideOver.type === 'Custom' ? 'bg-amber-50 text-amber-600' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  {slideOver.type === 'Bank' ? <Database size={22} /> : 
                   slideOver.type === 'Custom' ? <Plus size={22} /> :
                   <Edit2 size={22} />}
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {slideOver.type === 'Bank' ? 'Add from Question Bank' : 
                   slideOver.type === 'Custom' ? 'Create Custom Question' :
                   'Edit Question'}
                </h2>
              </div>
              <button 
                onClick={() => setSlideOver({ isOpen: false, type: null })}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/30">
              {slideOver.type === 'Bank' && (
                <QuestionBankBrowser 
                  onAdd={handleAddFromBank} 
                  existingIds={questions.filter(q => !q.isCustom).map(q => q.id)}
                />
              )}
              {(slideOver.type === 'Custom' || slideOver.type === 'Edit') && (
                <QuestionEditor 
                  initialData={slideOver.editingQuestion}
                  onSave={handleSaveCustomQuestion} 
                  onCancel={() => setSlideOver({ isOpen: false, type: null })} 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200 border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Publish Quiz?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              This will make <strong>{MOCK_QUIZ_METADATA.title}</strong> active for students. 
              It contains <strong>{questions.length} questions</strong> and is linked to <strong>{MOCK_QUIZ_METADATA.course}</strong>.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-3 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
              >
                Keep Drafting
              </button>
              <button 
                onClick={() => {
                  setShowPublishModal(false);
                  window.location.href = '/manager/quizzes';
                }}
                className="px-4 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/20 rounded-2xl transition-all active:scale-95"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutShell>
  );
}

// --- SUB-COMPONENTS ---

function QuestionBankBrowser({ onAdd, existingIds }: { onAdd: (qs: Question[]) => void, existingIds: string[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const filteredBank = useMemo(() => {
    return MOCK_QUESTION_BANK.filter(q => 
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search repository by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100 flex items-center gap-1.5">
            <Filter size={12} /> Subject: All
          </button>
          <button className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
            Type: All
          </button>
          <button className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
            Difficulty: All
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto mb-6 pr-1">
        {filteredBank.map(q => {
          const isSelected = selectedIds.includes(q.id);
          return (
            <div 
              key={q.id} 
              onClick={() => toggleSelect(q.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                isSelected ? 'bg-teal-50 border-teal-300 shadow-md ring-2 ring-teal-500/10' : 'bg-white border-slate-200 hover:border-teal-200 hover:bg-slate-50/50'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                isSelected ? 'bg-teal-500 border-teal-500 text-white' : 'bg-slate-50 border-slate-200'
              }`}>
                {isSelected && <Check size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {q.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                    {q.subject}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug">{q.title}</h4>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">
          {selectedIds.length} questions selected
        </p>
        <div className="flex gap-2">
          <button 
            disabled={selectedIds.length === 0}
            onClick={() => onAdd(MOCK_QUESTION_BANK.filter(q => selectedIds.includes(q.id)) as any)}
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-900/10 disabled:opacity-50 active:scale-95 flex items-center gap-2"
          >
            Add to Quiz <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionEditor({ initialData, onSave, onCancel }: { initialData?: Question, onSave: (q: Partial<Question>) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState<Partial<Question>>(initialData || {
    title: '',
    type: 'MCQ',
    subject: 'General',
    difficulty: 'Medium',
    options: ['', '', '', ''],
    correctOption: 0,
    answer: '',
    passage: '',
    subQuestions: [{ id: Date.now(), title: '', type: 'MCQ', options: ['', '', '', ''], correctOption: 0 }]
  });

  const handleUpdate = (updates: Partial<Question>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleOptionChange = (idx: number, val: string) => {
    const newOptions = [...(formData.options || ['', '', '', ''])];
    newOptions[idx] = val;
    handleUpdate({ options: newOptions });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Question Content <span className="text-red-500">*</span></label>
          <textarea 
            rows={4} 
            value={formData.title}
            onChange={(e) => handleUpdate({ title: e.target.value })}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 resize-none transition-all" 
            placeholder="Type your question here..."
          ></textarea>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Type</label>
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {['MCQ', 'Numerical', 'Fill in the blanks', 'Group'].map(t => (
                <button 
                  key={t}
                  onClick={() => handleUpdate({ type: t as any })}
                  className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                    formData.type === t ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Difficulty</label>
            <select 
              value={formData.difficulty}
              onChange={(e) => handleUpdate({ difficulty: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-purple-500 transition-all bg-white"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        {formData.type === 'MCQ' && (
          <div className="space-y-4 pt-6 border-t border-slate-100 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Answer Options</label>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Select the correct radio</span>
            </div>
            <div className="space-y-3">
              {(formData.options || ['', '', '', '']).map((option, idx) => (
                <div key={idx} className="group/opt flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="correctOption" 
                    checked={formData.correctOption === idx}
                    onChange={() => handleUpdate({ correctOption: idx })}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500 border-slate-300"
                  />
                  <input 
                    type="text" 
                    value={option}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder={`Option ${idx + 1}`}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm transition-all outline-none ${
                      formData.correctOption === idx ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-white focus:border-purple-500'
                    }`}
                  />
                  <button 
                    onClick={() => {
                      const newOpts = (formData.options || []).filter((_, i) => i !== idx);
                      handleUpdate({ options: newOpts });
                    }}
                    className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover/opt:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleUpdate({ options: [...(formData.options || []), ''] })}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 transition-colors p-1"
            >
              <Plus size={14} /> Add Another Option
            </button>
          </div>
        )}

        {(formData.type === 'Numerical' || formData.type === 'Fill in the blanks') && (
          <div className="space-y-2 pt-6 border-t border-slate-100 animate-in fade-in duration-300">
            <label className="text-sm font-semibold text-slate-700">Correct Answer</label>
            <input 
              type="text" 
              value={formData.answer}
              onChange={(e) => handleUpdate({ answer: e.target.value })}
              placeholder={formData.type === 'Numerical' ? 'e.g., 42' : 'e.g., Answer text...'}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all" 
            />
          </div>
        )}

        {formData.type === 'Group' && (
          <div className="space-y-6 pt-6 border-t border-slate-100 animate-in fade-in duration-300">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Passage Content</label>
              <textarea 
                rows={6} 
                value={formData.passage}
                onChange={(e) => handleUpdate({ passage: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 resize-none transition-all" 
                placeholder="Type the reading material here..."
              ></textarea>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Sub-Questions</label>
              </div>

              <div className="space-y-4">
                {(formData.subQuestions || []).map((sq, idx) => (
                  <div key={sq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative group/sq">
                    <button 
                      onClick={() => {
                        const newSQ = (formData.subQuestions || []).filter(s => s.id !== sq.id);
                        handleUpdate({ subQuestions: newSQ });
                      }}
                      className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-600 opacity-0 group-hover/sq:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Sub-Question {idx + 1}</span>
                    <textarea 
                      rows={2}
                      value={sq.title}
                      onChange={(e) => {
                        const newSQ = [...(formData.subQuestions || [])];
                        newSQ[idx].title = e.target.value;
                        handleUpdate({ subQuestions: newSQ });
                      }}
                      placeholder="Sub-question text..."
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select 
                        value={sq.type}
                        onChange={(e) => {
                          const newSQ = [...(formData.subQuestions || [])];
                          newSQ[idx].type = e.target.value as any;
                          handleUpdate({ subQuestions: newSQ });
                        }}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none"
                      >
                        <option value="MCQ">MCQ</option>
                        <option value="Numerical">Numerical</option>
                        <option value="Fill">Fill in blanks</option>
                      </select>
                    </div>

                    {sq.type === 'MCQ' && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Options</p>
                        {(sq.options || ['', '', '', '']).map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <input 
                              type="radio"
                              name={`sq_${sq.id}_correct`}
                              checked={sq.correctOption === oIdx}
                              onChange={() => {
                                const newSQ = [...(formData.subQuestions || [])];
                                newSQ[idx].correctOption = oIdx;
                                handleUpdate({ subQuestions: newSQ });
                              }}
                              className="w-3 h-3 text-purple-600 focus:ring-purple-500"
                            />
                            <input 
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newSQ = [...(formData.subQuestions || [])];
                                const newOpts = [...(newSQ[idx].options || ['', '', '', ''])];
                                newOpts[oIdx] = e.target.value;
                                newSQ[idx].options = newOpts;
                                handleUpdate({ subQuestions: newSQ });
                              }}
                              placeholder={`Option ${oIdx + 1}`}
                              className={`flex-1 rounded-lg border px-3 py-1.5 text-xs outline-none transition-all ${
                                sq.correctOption === oIdx ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 focus:border-purple-500'
                              }`}
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
                          onChange={(e) => {
                            const newSQ = [...(formData.subQuestions || [])];
                            newSQ[idx].answer = e.target.value;
                            handleUpdate({ subQuestions: newSQ });
                          }}
                          placeholder={sq.type === 'Numerical' ? 'e.g., 42' : 'e.g., Answer text...'}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-purple-500 bg-white"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  const newSQ = [...(formData.subQuestions || []), { id: Date.now(), title: '', type: 'MCQ', options: ['', '', '', ''], correctOption: 0 }];
                  handleUpdate({ subQuestions: newSQ });
                }}
                className="mt-4 w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-purple-600 bg-purple-50/50 hover:bg-purple-50 rounded-xl border border-dashed border-purple-200 transition-all active:scale-[0.98]"
              >
                <Plus size={16} /> Add Sub-Question
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-50/30 pb-4 backdrop-blur-sm">
        <button onClick={onCancel} className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors">
          Cancel
        </button>
        <button 
          disabled={!formData.title}
          onClick={() => onSave(formData)}
          className="px-6 py-2.5 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all shadow-lg shadow-purple-900/10 disabled:opacity-50 active:scale-95 flex items-center gap-2"
        >
          <CheckCircle2 size={18} /> {initialData ? 'Update Question' : 'Add to Quiz'}
        </button>
      </div>
    </div>
  );
}

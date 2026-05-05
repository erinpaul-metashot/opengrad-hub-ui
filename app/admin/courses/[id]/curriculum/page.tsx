'use client';

import React, { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import { 
  ChevronRight, 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  PlayCircle, 
  FileQuestion,
  X,
  Check,
  CheckCircle2,
  Video,
  BookOpen,
  Image as ImageIcon,
  Info
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK TYPES ---
type LessonType = 'Video' | 'Quiz';
interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration?: number;
  questionCount?: number;
}
interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

export default function CurriculumBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 'c1',
      title: 'Module 1 — Foundations',
      isExpanded: true,
      lessons: [
        { id: 'l1', title: 'Introduction to Web Dev', type: 'Video', duration: 15 },
        { id: 'l2', title: 'HTML Basics Quiz', type: 'Quiz', questionCount: 5 }
      ]
    }
  ]);

  const [activeChapterForLesson, setActiveChapterForLesson] = useState<string | null>(null);
  const [slideOverState, setSlideOverState] = useState<{ 
    isOpen: boolean, 
    type: LessonType | 'Metadata' | 'Module' | null, 
    chapterId: string | null,
    editingId?: string 
  }>({ isOpen: false, type: null, chapterId: null });
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [courseMetadata, setCourseMetadata] = useState({
    title: 'IPMAT Kerala 2026',
    description: 'Comprehensive preparation for IPMAT Kerala 2026.',
    programme: ['UG'],
    access: 'Paid',
    price: '4999',
    locking: 'Sequential',
    imageUrl: ''
  });

  // --- HANDLERS ---
  const toggleChapter = (id: string) => {
    setChapters(prev => prev.map(c => c.id === id ? { ...c, isExpanded: !c.isExpanded } : c));
  };

  const handleAddChapter = () => {
    const newId = `c${Date.now()}`;
    setChapters([...chapters, { id: newId, title: `New Module ${chapters.length + 1}`, lessons: [], isExpanded: true }]);
  };

  const handleEditChapter = (chapter: Chapter) => {
    setSlideOverState({ isOpen: true, type: 'Module', chapterId: chapter.id, editingId: chapter.id });
  };

  const handleSaveChapter = (title: string) => {
    setChapters(prev => prev.map(c => c.id === slideOverState.editingId ? { ...c, title } : c));
    setSlideOverState({ isOpen: false, type: null, chapterId: null });
  };

  const handleDeleteChapter = (id: string) => {
    if (confirm('Delete this chapter and all its lessons?')) {
      setChapters(prev => prev.filter(c => c.id !== id));
    }
  };

  const openLessonChooser = (chapterId: string) => {
    setActiveChapterForLesson(activeChapterForLesson === chapterId ? null : chapterId);
  };

  const handleChooseLessonType = (chapterId: string, type: LessonType) => {
    setActiveChapterForLesson(null);
    setSlideOverState({ isOpen: true, type, chapterId });
  };

  const handleEditLesson = (chapterId: string, lesson: Lesson) => {
    setSlideOverState({ isOpen: true, type: lesson.type, chapterId, editingId: lesson.id });
  };

  const handleSaveLesson = (lessonData: Partial<Lesson>) => {
    if (!slideOverState.chapterId) return;
    
    if (slideOverState.editingId) {
      // Update existing lesson
      setChapters(prev => prev.map(c => {
        if (c.id === slideOverState.chapterId) {
          return {
            ...c,
            lessons: c.lessons.map(l => l.id === slideOverState.editingId ? { ...l, ...lessonData } : l)
          };
        }
        return c;
      }));
    } else {
      // Add new lesson
      const newLesson: Lesson = {
        id: `l${Date.now()}`,
        title: lessonData.title || 'Untitled Lesson',
        type: (slideOverState.type as LessonType) || 'Video',
        duration: lessonData.duration,
        questionCount: lessonData.questionCount
      };

      setChapters(prev => prev.map(c => {
        if (c.id === slideOverState.chapterId) {
          return { ...c, lessons: [...c.lessons, newLesson], isExpanded: true };
        }
        return c;
      }));
    }
    setSlideOverState({ isOpen: false, type: null, chapterId: null });
  };

  return (
    <LayoutShell
      role="admin"
      userName="Super Admin"
      pageTitle="Course Curriculum Builder"
      activeNavItem="Courses"
    >
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Link href="/admin/courses" className="hover:text-teal-600 transition-colors">Courses</Link>
              <ChevronRight size={14} />
              <Link href={`/admin/courses/${id}`} className="hover:text-teal-600 transition-colors truncate max-w-[120px]">{courseMetadata.title}</Link>
              <ChevronRight size={14} />
              <span className="text-slate-900 font-semibold">Curriculum</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{courseMetadata.title}</h1>
            <p className="text-sm text-slate-500 mt-1">Curriculum Builder — Add modules and lessons to your course.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSlideOverState({ isOpen: true, type: 'Metadata', chapterId: null })}
              className="px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-slate-200 shadow-sm flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit Details
            </button>
            <button 
              disabled={chapters.length === 0 || chapters.every(c => c.lessons.length === 0)}
              onClick={() => setShowPublishModal(true)}
              className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-md shadow-teal-900/10 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              Publish Course
            </button>
          </div>
        </div>

        {/* Chapters Stack */}
        <div className="space-y-4">
          {chapters.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No chapters yet</h3>
              <p className="text-sm text-slate-500 mb-6">Start building your course curriculum by adding the first chapter.</p>
              <button 
                onClick={handleAddChapter}
                className="px-5 py-2.5 text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <Plus size={16} /> Add First Chapter
              </button>
            </div>
          ) : (
            chapters.map((chapter, index) => (
              <div key={chapter.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
                {/* Chapter Header */}
                <div className="flex items-center gap-3 px-4 py-4 bg-slate-50 border-b border-slate-100 group">
                  <div className="cursor-grab p-1 text-slate-400 hover:text-slate-600 active:cursor-grabbing">
                    <GripVertical size={18} />
                  </div>
                  <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => toggleChapter(chapter.id)}>
                    <ChevronRight size={18} className={`text-slate-400 transition-transform ${chapter.isExpanded ? 'rotate-90' : ''}`} />
                    <span className="font-semibold text-slate-700 uppercase tracking-wider text-xs">Chapter {index + 1}</span>
                    <h3 className="font-bold text-slate-900">{chapter.title}</h3>
                    <span className="text-xs text-slate-400 font-medium ml-2 px-2 py-0.5 bg-slate-200/50 rounded-full">{chapter.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEditChapter(chapter); }}
                      className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Lessons List */}
                {chapter.isExpanded && (
                  <div className="p-4 space-y-2 bg-white">
                    {chapter.lessons.length === 0 ? (
                      <div className="text-center py-6 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-sm text-slate-400">Empty chapter. Add a video or quiz.</p>
                      </div>
                    ) : (
                      chapter.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group">
                          <div className="cursor-grab p-1 text-slate-300 hover:text-slate-500 active:cursor-grabbing">
                            <GripVertical size={16} />
                          </div>
                          <div className={`p-2 rounded-lg ${lesson.type === 'Video' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                            {lesson.type === 'Video' ? <PlayCircle size={18} /> : <FileQuestion size={18} />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-slate-900">{lesson.title}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                              <span>{lesson.type}</span>
                              {lesson.duration && <span>• {lesson.duration} mins</span>}
                              {lesson.questionCount && <span>• {lesson.questionCount} questions</span>}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEditLesson(chapter.id, lesson)}
                              className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Add Lesson Area */}
                    <div className="pt-2">
                      {activeChapterForLesson === chapter.id ? (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in zoom-in-95 duration-200">
                          <p className="text-sm font-semibold text-slate-700 mb-3">Choose lesson type</p>
                          <div className="grid grid-cols-2 gap-3">
                            <button 
                              onClick={() => handleChooseLessonType(chapter.id, 'Video')}
                              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors text-slate-600 group/btn"
                            >
                              <Video size={24} className="mb-2 group-hover/btn:scale-110 transition-transform" />
                              <span className="text-sm font-bold">YouTube Video</span>
                            </button>
                            <button 
                              onClick={() => handleChooseLessonType(chapter.id, 'Quiz')}
                              className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 transition-colors text-slate-600 group/btn"
                            >
                              <FileQuestion size={24} className="mb-2 group-hover/btn:scale-110 transition-transform" />
                              <span className="text-sm font-bold">Quiz / Assessment</span>
                            </button>
                          </div>
                          <button 
                            onClick={() => setActiveChapterForLesson(null)}
                            className="mt-3 text-xs font-semibold text-slate-500 hover:text-slate-700 w-full py-2"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => openLessonChooser(chapter.id)}
                          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-teal-600 bg-teal-50/50 hover:bg-teal-50 rounded-xl border border-dashed border-teal-200 transition-colors"
                        >
                          <Plus size={16} /> Add Lesson
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {chapters.length > 0 && (
            <button 
              onClick={handleAddChapter}
              className="w-full py-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 transition-colors"
            >
              <Plus size={18} /> Add Chapter
            </button>
          )}
        </div>
      </div>

      {/* --- SLIDE OVERS --- */}
      {slideOverState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4 sm:p-0">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto sm:rounded-l-2xl shadow-2xl animate-in slide-in-from-right duration-300 relative flex flex-col">
            
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  slideOverState.type === 'Video' ? 'bg-blue-50 text-blue-600' : 
                  slideOverState.type === 'Quiz' ? 'bg-purple-50 text-purple-600' :
                  slideOverState.type === 'Module' ? 'bg-amber-50 text-amber-600' :
                  'bg-teal-50 text-teal-600'
                }`}>
                  {slideOverState.type === 'Video' ? <PlayCircle size={20} /> : 
                   slideOverState.type === 'Quiz' ? <FileQuestion size={20} /> :
                   slideOverState.type === 'Module' ? <GripVertical size={20} /> :
                   <BookOpen size={20} />}
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  {slideOverState.editingId ? 'Edit' : 'Add'} {slideOverState.type === 'Metadata' ? 'Course Details' : slideOverState.type === 'Module' ? 'Module' : slideOverState.type + ' Lesson'}
                </h2>
              </div>
              <button 
                onClick={() => setSlideOverState({ isOpen: false, type: null, chapterId: null })}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {slideOverState.type === 'Video' && (
                <VideoLessonEditor 
                  initialData={slideOverState.editingId ? chapters.find(c => c.id === slideOverState.chapterId)?.lessons.find(l => l.id === slideOverState.editingId) : undefined}
                  onSave={handleSaveLesson} 
                  onCancel={() => setSlideOverState({ isOpen: false, type: null, chapterId: null })} 
                />
              )}
              {slideOverState.type === 'Quiz' && (
                <QuizLessonEditor 
                  initialData={slideOverState.editingId ? chapters.find(c => c.id === slideOverState.chapterId)?.lessons.find(l => l.id === slideOverState.editingId) : undefined}
                  onSave={handleSaveLesson} 
                  onCancel={() => setSlideOverState({ isOpen: false, type: null, chapterId: null })} 
                />
              )}
              {slideOverState.type === 'Module' && (
                <ModuleEditor 
                  initialTitle={chapters.find(c => c.id === slideOverState.chapterId)?.title || ''}
                  onSave={handleSaveChapter}
                  onCancel={() => setSlideOverState({ isOpen: false, type: null, chapterId: null })}
                />
              )}
              {slideOverState.type === 'Metadata' && (
                <CourseMetadataEditor 
                  initialData={courseMetadata}
                  onSave={(data) => {
                    setCourseMetadata(data as any);
                    setSlideOverState({ isOpen: false, type: null, chapterId: null });
                  }}
                  onCancel={() => setSlideOverState({ isOpen: false, type: null, chapterId: null })}
                />
              )}
            </div>

          </div>
        </div>
      )}

      {/* Publish Modal Confirmation */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Publish Course?</h3>
            <p className="text-sm text-slate-600 text-center mb-6">
              This course will be moved from Draft to Active. It contains <strong>{chapters.length} chapters</strong> and <strong>{chapters.reduce((acc, c) => acc + c.lessons.length, 0)} lessons</strong>.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowPublishModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowPublishModal(false);
                  // Simulate redirect back to courses list
                  window.location.href = '/admin/courses';
                }}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-900/10 rounded-xl transition-colors"
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

// --- SUB-COMPONENTS FOR SLIDE-OVERS ---

function VideoLessonEditor({ initialData, onSave, onCancel }: { initialData?: Lesson, onSave: (lesson: Partial<Lesson>) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.duration ? 'https://www.youtube.com/watch?v=mock' : '');
  const [duration, setDuration] = useState(initialData?.duration?.toString() || '');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ title, type: 'Video', duration: duration ? parseInt(duration) : undefined }); }} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Lesson Title <span className="text-red-500">*</span></label>
        <input 
          type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Introduction to Limits"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">YouTube URL <span className="text-red-500">*</span></label>
        <input 
          type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
        {url && (
          <div className="mt-3 aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 flex-col gap-2">
              <PlayCircle size={32} />
              <span className="text-xs font-semibold">Video Preview (Mock)</span>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Duration (minutes)</label>
        <input 
          type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 15"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Notes (optional)</label>
        <textarea 
          rows={4}
          placeholder="Add instructor notes or resources..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-y"
        />
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-4">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md flex items-center gap-2">
          <Check size={16} /> Save Lesson
        </button>
      </div>
    </form>
  );
}

function QuizLessonEditor({ initialData, onSave, onCancel }: { initialData?: Lesson, onSave: (lesson: Partial<Lesson>) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [questions, setQuestions] = useState(initialData?.questionCount 
    ? Array.from({ length: initialData.questionCount }, (_, i) => ({ id: i + 1, type: 'MCQ', text: '', options: ['', '', '', ''], correctOption: 0, answer: '' })) 
    : [{ id: 1, type: 'MCQ', text: '', options: ['', '', '', ''], correctOption: 0, answer: '' }]);

  const updateQuestionType = (id: number, type: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, type } : q));
  };

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, text } : q));
  };

  const updateOption = (qId: number, optIdx: number, val: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOpts = [...(q.options || [])];
        newOpts[optIdx] = val;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  const setCorrectOption = (qId: number, optIdx: number) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, correctOption: optIdx } : q));
  };

  const setAnswer = (qId: number, val: string) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, answer: val } : q));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ title, type: 'Quiz', questionCount: questions.length }); }} className="space-y-8">
      
      {/* Quiz Meta */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Quiz Title <span className="text-red-500">*</span></label>
          <input 
            type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Module 1 Assessment"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Duration (mins)</label>
            <input type="number" placeholder="Unlimited" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Attempts</label>
            <input type="number" placeholder="Unlimited" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none" />
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* Questions Builder */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Questions ({questions.length})</h3>
        </div>
        
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 px-2 py-1 bg-teal-50 rounded-lg">Question {idx + 1}</span>
              <div className="flex gap-2">
                <select 
                  value={q.type} onChange={(e) => updateQuestionType(q.id, e.target.value)}
                  className="text-xs font-semibold rounded-lg border border-slate-200 px-2 py-1 outline-none text-slate-700 bg-white"
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Fill in Blank">Fill in Blank</option>
                  <option value="Numerical">Numerical</option>
                </select>
                <button type="button" className="text-slate-400 hover:text-red-500 transition-colors p-1" onClick={() => setQuestions(qs => qs.filter(x => x.id !== q.id))}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-tight">Question Text</label>
                <textarea 
                  placeholder="Enter question text here..."
                  rows={2} value={q.text} onChange={(e) => updateQuestionText(q.id, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none resize-y bg-white focus:border-teal-500"
                />
              </div>

              {/* Dynamic Type Editor */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                {q.type === 'MCQ' && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-600">Options (Select the correct one)</p>
                    {q.options?.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-3">
                        <input 
                          type="radio" name={`q${q.id}_correct`} 
                          checked={q.correctOption === oIdx} 
                          onChange={() => setCorrectOption(q.id, oIdx)}
                          className="w-4 h-4 text-teal-600 focus:ring-teal-500" 
                        />
                        <input 
                          type="text" placeholder={`Option ${oIdx + 1}`} 
                          value={opt} onChange={(e) => updateOption(q.id, oIdx, e.target.value)}
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none bg-slate-50/50 focus:bg-white focus:border-teal-500" 
                        />
                      </div>
                    ))}
                  </div>
                )}

                {q.type === 'Fill in Blank' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">Expected Answer</label>
                    <input 
                      type="text" placeholder="Type the correct answer..." 
                      value={q.answer} onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500" 
                    />
                  </div>
                )}

                {q.type === 'Numerical' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600">Expected Number</label>
                    <input 
                      type="number" placeholder="Enter the numeric answer..." 
                      value={q.answer} onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={() => setQuestions([...questions, { id: Date.now(), type: 'MCQ', text: '', options: ['', '', '', ''], correctOption: 0, answer: '' }])}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors"
        >
          <Plus size={16} /> Add Question
        </button>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-4 z-10">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md flex items-center gap-2">
          <Check size={16} /> Save Quiz Lesson
        </button>
      </div>
    </form>
  );
}

function ModuleEditor({ initialTitle, onSave, onCancel }: { initialTitle: string, onSave: (title: string) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(initialTitle);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(title); }} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Module Title <span className="text-red-500">*</span></label>
        <input 
          type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Module 1 — Introduction"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-4">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md flex items-center gap-2">
          <Check size={16} /> Save Module
        </button>
      </div>
    </form>
  );
}

function CourseMetadataEditor({ initialData, onSave, onCancel }: { initialData: any, onSave: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    ...initialData,
    currency: 'INR',
    tags: 'math, foundation, competitive'
  });

  const handleProgrammeToggle = (prog: string) => {
    setFormData((prev: any) => ({
      ...prev,
      programme: prev.programme.includes(prog) 
        ? prev.programme.filter((p: string) => p !== prog) 
        : [...prev.programme, prog]
    }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-8 pb-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Course title <span className="text-red-500">*</span></label>
          <input 
            type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></label>
          <textarea 
            required rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Access type</label>
            <div className="flex gap-4">
              {['Free', 'Paid'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="access" value={type} checked={formData.access === type}
                    onChange={(e) => setFormData({...formData, access: e.target.value})}
                    className="w-4 h-4 text-teal-600"
                  />
                  <span className="text-sm font-medium">{type}</span>
                </label>
              ))}
            </div>
            {formData.access === 'Paid' && (
              <div className="flex items-center gap-2 mt-2 animate-in slide-in-from-top-1 fade-in duration-200">
                <select 
                  value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 bg-slate-50 outline-none"
                >
                  <option>INR</option>
                  <option>USD</option>
                </select>
                <input 
                  type="number" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Price"
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-teal-500"
                />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Locking mode</label>
            <div className="flex gap-4">
              {['Open', 'Sequential'].map(mode => (
                <label key={mode} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="locking" value={mode} checked={formData.locking === mode}
                    onChange={(e) => setFormData({...formData, locking: e.target.value})}
                    className="w-4 h-4 text-teal-600"
                  />
                  <span className="text-sm font-medium">{mode}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 block">Programme type</label>
          <div className="flex flex-wrap gap-3">
            {['School', 'UG', 'PG'].map(prog => (
              <label key={prog} className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-colors ${formData.programme.includes(prog) ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-white border-slate-200 text-slate-600'}`}>
                <input 
                  type="checkbox" checked={formData.programme.includes(prog)}
                  onChange={() => handleProgrammeToggle(prog)}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span className="text-sm font-medium">{prog}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Cover image URL</label>
          <div className="flex gap-4">
            <input 
              type="url" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://.../cover.jpg"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
            />
            <div className="w-16 h-12 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
              {formData.imageUrl ? <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-400" />}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tags</label>
          <input 
            type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="e.g., math, beginner"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white pb-4 z-10">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md">
          Save Course Details
        </button>
      </div>
    </form>
  );
}


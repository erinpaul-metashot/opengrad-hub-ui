// Mock data for OpenGrad LMS

export const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Smith',
    programme: 'Full Stack Development',
    progress: 68,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    modulesCount: 4,
    enrolledDate: '2026-02-15',
    estimatedHours: 24,
    status: 'active',
    nextLesson: 'CSS Flexbox Basics',
    nextDueAssignment: { title: 'Assignment 2', dueDate: '2026-05-10' },
    modules: [
      {
        id: 'mod1',
        title: 'HTML Fundamentals',
        progress: 100,
        lessonsCount: 3,
        lessons: [
          { id: 'les1', title: 'HTML Structure', duration: 25, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les2', title: 'Semantic HTML', duration: 20, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les3', title: 'HTML Forms', duration: 30, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
      {
        id: 'mod2',
        title: 'CSS Styling',
        progress: 50,
        lessonsCount: 4,
        lessons: [
          { id: 'les4', title: 'CSS Basics', duration: 25, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les5', title: 'CSS Selectors', duration: 20, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les6', title: 'CSS Flexbox Basics', duration: 35, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les7', title: 'CSS Module Quiz', duration: 15, type: 'quiz', completed: false, quizId: 'quiz1' },
        ]
      },
      {
        id: 'mod3',
        title: 'JavaScript Essentials',
        progress: 25,
        lessonsCount: 3,
        lessons: [
          { id: 'les8', title: 'JavaScript Basics', duration: 30, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les9', title: 'Functions & Scope', duration: 40, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les10', title: 'JavaScript Assignment', duration: 60, type: 'assignment', completed: false, assignmentId: 'assign1' },
        ]
      },
      {
        id: 'mod4',
        title: 'Responsive Design',
        progress: 0,
        lessonsCount: 2,
        lessons: [
          { id: 'les11', title: 'Mobile-First Design', duration: 35, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les12', title: 'Media Queries', duration: 30, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    instructor: 'Sarah Johnson',
    programme: 'Frontend Development',
    progress: 45,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    modulesCount: 5,
    enrolledDate: '2026-03-01',
    estimatedHours: 32,
    status: 'active',
    nextLesson: 'Custom Hooks',
    nextDueAssignment: { title: 'Assignment 1', dueDate: '2026-05-15' },
    modules: [
      {
        id: 'mod5',
        title: 'React Fundamentals Review',
        progress: 100,
        lessonsCount: 3,
        lessons: [
          { id: 'les13', title: 'Components & Props', duration: 30, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les14', title: 'State Management', duration: 35, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les15', title: 'Hooks Introduction', duration: 25, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
      {
        id: 'mod6',
        title: 'Custom Hooks',
        progress: 50,
        lessonsCount: 3,
        lessons: [
          { id: 'les16', title: 'Building Custom Hooks', duration: 40, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les17', title: 'useContext Hook', duration: 30, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les18', title: 'Custom Hooks Quiz', duration: 20, type: 'quiz', completed: false, quizId: 'quiz2' },
        ]
      },
      {
        id: 'mod7',
        title: 'Performance Optimization',
        progress: 0,
        lessonsCount: 4,
        lessons: [
          { id: 'les19', title: 'Memoization', duration: 35, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les20', title: 'useCallback & useMemo', duration: 40, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les21', title: 'Code Splitting', duration: 25, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les22', title: 'Assignment: Optimize App', duration: 90, type: 'assignment', completed: false, assignmentId: 'assign2' },
        ]
      },
      {
        id: 'mod8',
        title: 'Testing React',
        progress: 0,
        lessonsCount: 3,
        lessons: [
          { id: 'les23', title: 'Unit Testing Basics', duration: 35, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les24', title: 'React Testing Library', duration: 40, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les25', title: 'Integration Tests', duration: 30, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
    ]
  },
  {
    id: '3',
    title: 'Database Design & SQL',
    instructor: 'Mike Davis',
    programme: 'Backend Development',
    progress: 30,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    modulesCount: 3,
    enrolledDate: '2026-04-01',
    estimatedHours: 28,
    status: 'active',
    nextLesson: 'Advanced Queries',
    nextDueAssignment: null,
    modules: [
      {
        id: 'mod9',
        title: 'Database Fundamentals',
        progress: 100,
        lessonsCount: 3,
        lessons: [
          { id: 'les26', title: 'RDBMS Concepts', duration: 40, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les27', title: 'Normalization', duration: 35, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les28', title: 'ER Diagrams', duration: 30, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      },
      {
        id: 'mod10',
        title: 'SQL Basics',
        progress: 50,
        lessonsCount: 4,
        lessons: [
          { id: 'les29', title: 'SELECT Queries', duration: 40, type: 'video', completed: true, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les30', title: 'JOINs', duration: 45, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les31', title: 'Aggregations', duration: 35, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les32', title: 'SQL Quiz', duration: 25, type: 'quiz', completed: false, quizId: 'quiz3' },
        ]
      },
      {
        id: 'mod11',
        title: 'Advanced Queries',
        progress: 0,
        lessonsCount: 2,
        lessons: [
          { id: 'les33', title: 'Subqueries & CTEs', duration: 40, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { id: 'les34', title: 'Window Functions', duration: 45, type: 'video', completed: false, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    ]
  }
];

export const mockQuizzes = [
  {
    id: 'quiz1',
    title: 'CSS Flexbox Quiz',
    courseId: '1',
    duration: 15,
    maxAttempts: 3,
    passThreshold: 70,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What does the flex property do?',
        options: ['Changes text color', 'Makes items flexible in a container', 'Adds borders', 'Changes font size'],
        correctAnswer: 1,
        explanation: 'The flex property makes items flexible and adaptive to container size.'
      },
      {
        id: 'q1_group',
        type: 'group',
        passage: 'Web development is the work involved in developing a website for the Internet or an Intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. A more comprehensive list of tasks to which web development commonly refers, may include web engineering, web design, web content development, client liaison, client-side/server-side scripting, web server and network security configuration, and e-commerce development.',
        subQuestions: [
          {
            id: 'q1_g1',
            type: 'mcq',
            question: 'What does web development NOT commonly refer to according to the text?',
            options: ['Web engineering', 'Web design', 'Physical hardware manufacturing', 'E-commerce development'],
            correctAnswer: 2,
            explanation: 'The text lists web engineering, design, and e-commerce but not physical hardware manufacturing.'
          },
          {
            id: 'q1_g2',
            type: 'fill',
            question: 'Web development can range from a simple static page to complex ______ applications.',
            correctAnswer: 'web',
            explanation: 'The text states "complex web applications".'
          }
        ]
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'Which property aligns items along the main axis?',
        options: ['align-items', 'justify-content', 'align-self', 'flex-direction'],
        correctAnswer: 1,
        explanation: 'justify-content aligns flex items along the main axis.'
      },
      {
        id: 'q3',
        type: 'fill',
        question: 'The default value of flex-direction is ______',
        correctAnswer: 'row',
        explanation: 'The default flex-direction is row, which displays items horizontally.'
      },
      {
        id: 'q4',
        type: 'numeric',
        question: 'If flex-basis is 200px and flex-grow is 2, and there are 100px extra space, what is the final width?',
        correctAnswer: 400,
        tolerance: 0,
        explanation: 'flex-basis (200px) + (flex-grow (2)  extra space (100px)) = 200 + 200 = 400px'
      }
    ],
    attempts: [
      { attemptNumber: 1, score: 75, dateAttempted: '2026-04-20', timeSpent: 12, status: 'completed' }
    ]
  },
  {
    id: 'quiz2',
    title: 'Custom Hooks Quiz',
    courseId: '2',
    duration: 20,
    maxAttempts: 2,
    passThreshold: 75,
    showAnswers: true,
    shuffleQuestions: false,
    questions: [
      {
        id: 'q5',
        type: 'mcq',
        question: 'What naming convention should custom hooks follow?',
        options: ['_useHookName', 'useHookName', 'hookName', 'HookName'],
        correctAnswer: 1,
        explanation: 'Custom hooks should start with "use" to follow React conventions.'
      },
      {
        id: 'q6',
        type: 'mcq',
        question: 'Can you use hooks inside loops?',
        options: ['Yes', 'No', 'Only if nested', 'Only at the top level'],
        correctAnswer: 1,
        explanation: 'Hooks must be called at the top level, not inside loops or conditions.'
      }
    ],
    attempts: []
  },
  {
    id: 'quiz3',
    title: 'SQL Fundamentals Quiz',
    courseId: '3',
    duration: 25,
    maxAttempts: 3,
    passThreshold: 70,
    showAnswers: true,
    shuffleQuestions: true,
    questions: [
      {
        id: 'q7',
        type: 'mcq',
        question: 'Which SQL keyword is used to extract data?',
        options: ['EXTRACT', 'SELECT', 'RETRIEVE', 'GET'],
        correctAnswer: 1,
        explanation: 'SELECT is the primary SQL keyword for data extraction.'
      }
    ],
    attempts: []
  }
];

export const mockAssignments = [
  {
    id: 'assign1',
    title: 'JavaScript Functions Task',
    courseId: '1',
    description: 'Write functions to solve 5 different problems using JavaScript. Ensure all functions are well-documented and follow the provided naming conventions.',
    dueDate: '2026-05-20',
    status: 'open',
    grade: null,
    submissionType: ['text', 'file'],
    maxFileSize: 10,
    acceptedFileTypes: ['.js', '.pdf'],
    submissions: []
  },
  {
    id: 'assign2',
    title: 'React App Optimization',
    courseId: '2',
    description: 'Take the provided React application and optimize it using memoization, useCallback, and code splitting. Document your changes and performance gains.',
    dueDate: '2026-05-25',
    status: 'submitted',
    grade: null,
    submissionType: ['text', 'file'],
    maxFileSize: 50,
    acceptedFileTypes: ['.pdf', '.docx'],
    submissions: [
      { 
        id: 'sub1', 
        date: '2026-05-04', 
        files: [{ name: 'optimization_report.pdf', url: '#' }], 
        notes: 'I have optimized the main dashboard components and implemented lazy loading for the settings module.' 
      }
    ]
  },
  {
    id: 'assign3',
    title: 'Database Schema Design',
    courseId: '3',
    description: 'Design a normalized database schema for an e-commerce platform. Include all necessary tables, relationships, and constraints. Provide both ERD and SQL scripts.',
    dueDate: '2026-05-30',
    status: 'graded',
    grade: 85,
    submissionType: ['file'],
    maxFileSize: 20,
    acceptedFileTypes: ['.sql', '.pdf'],
    submissions: [
      { 
        id: 'sub2', 
        date: '2026-05-02', 
        files: [{ name: 'ecommerce_schema_design.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }], 
        feedback: 'Excellent work on normalization. The ERD is very clear. One small note: watch out for redundant indices on foreign keys in the Orders table.',
        gradedDate: '2026-05-04',
        gradedBy: 'Mike Davis'
      }
    ]
  }
];



export const mockLiveClasses = [
  {
    id: 'live1',
    title: 'Weekly Q&A Session - Web Development',
    courseId: '1',
    startTime: new Date('2026-05-05T09:30:00Z'),
    endTime: new Date('2026-05-05T10:30:00Z'),
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'live',
    targetedProgrammes: ['Full Stack Development'],
    recordingLink: null,
    attendance: null
  },
  {
    id: 'live2',
    title: 'React Performance Workshop',
    courseId: '2',
    startTime: new Date('2026-05-06T12:00:00Z'),
    endTime: new Date('2026-05-06T13:00:00Z'),
    meetingLink: 'https://zoom.us/j/987654321',
    status: 'upcoming',
    targetedProgrammes: ['Frontend Development'],
    recordingLink: null,
    attendance: null
  },
  {
    id: 'live3',
    title: 'Database Design Discussion',
    courseId: '3',
    startTime: new Date('2026-05-05T10:00:00Z'),
    endTime: new Date('2026-05-05T11:00:00Z'),
    meetingLink: 'https://zoom.us/j/555666777',
    status: 'past',
    targetedProgrammes: ['Backend Development'],
    recordingLink: 'https://example.com/recording/live3',
    attendance: { status: 'present', joinedAt: new Date('2026-05-05T10:05:00Z') }
  }
];

export const mockCalendarEvents = [
  {
    id: 'evt1',
    type: 'assignment',
    title: 'JavaScript Assignment Due',
    date: '2026-05-20',
    courseId: '1'
  },
  {
    id: 'evt2',
    type: 'liveClass',
    title: 'Q&A Session',
    date: '2026-05-05',
    courseId: '1'
  },
  {
    id: 'evt3',
    type: 'quiz',
    title: 'CSS Flexbox Quiz',
    date: '2026-05-15',
    courseId: '1'
  },
  {
    id: 'evt4',
    type: 'assignment',
    title: 'React Optimization Due',
    date: '2026-05-25',
    courseId: '2'
  },
  {
    id: 'evt5',
    type: 'liveClass',
    title: 'React Performance Workshop',
    date: '2026-05-06',
    courseId: '2'
  }
];

export const mockStudent = {
  id: 'std1',
  name: 'Alex Johnson',
  roll: 'STU001',
  email: 'alex@example.com',
  programme: 'Full Stack Development',
  state: 'active',
  enrolledCourses: ['1', '2', '3'],
  averageGrade: 78
};

export const mockNotifications = [
  {
    id: 'notif1',
    type: 'system',
    title: 'System Maintenance',
    description: 'The platform will be down for scheduled maintenance on May 25th from 2:00 AM to 4:00 AM UTC.',
    timestamp: '2026-05-04T10:00:00Z',
    isRead: false,
  },
  {
    id: 'notif2',
    type: 'assignment',
    title: 'New Assignment: JavaScript Functions',
    description: 'A new assignment has been posted in "Introduction to Web Development".',
    timestamp: '2026-05-03T15:30:00Z',
    isRead: false,
    link: '/student/assignments/assign1',
  },
  {
    id: 'notif3',
    type: 'grade',
    title: 'Assignment Graded',
    description: 'Your submission for "Database Schema Design" has been graded. Score: 85/100.',
    timestamp: '2026-05-04T09:00:00Z',
    isRead: true,
    link: '/student/assignments/assign3',
  },
  {
    id: 'notif4',
    type: 'course',
    title: 'New Course Content',
    description: 'New lessons have been added to "Advanced React Patterns".',
    timestamp: '2026-05-02T11:20:00Z',
    isRead: true,
    link: '/student/courses/2',
  },
  {
    id: 'notif5',
    type: 'live-class',
    title: 'Live Class Starting Soon',
    description: 'The weekly Q&A session for Web Development is starting in 15 minutes.',
    timestamp: '2026-05-05T13:45:00Z',
    isRead: false,
    link: '/student/live-classes',
  },
];

export const mockGlobalQuizzes = [
  {
    id: 'gq1',
    title: 'Full Stack Fundamentals',
    description: 'A comprehensive quiz covering HTML, CSS, and JavaScript basics.',
    duration: 30,
    questionsCount: 3,
    difficulty: 'Beginner',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JS'],
    isNew: true,
    passThreshold: 70,
    maxAttempts: 3,
    showAnswers: true,
    attempts: [],
    questions: [
      {
        id: 'gq1_q1',
        type: 'mcq',
        question: 'Which tag is used for the largest heading in HTML?',
        options: ['<h6>', '<h1>', '<heading>', '<head>'],
        correctAnswer: 1,
        explanation: '<h1> is the standard tag for the main, largest heading.'
      },
      {
        id: 'gq1_q2',
        type: 'mcq',
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'],
        correctAnswer: 2,
        explanation: 'CSS stands for Cascading Style Sheets.'
      },
      {
        id: 'gq1_q3',
        type: 'fill',
        question: 'Which keyword is used to declare a constant in JavaScript?',
        correctAnswer: 'const',
        explanation: 'The const keyword is used to declare variables that cannot be reassigned.'
      },
      {
        id: 'gq1_group',
        type: 'group',
        passage: 'The history of the Internet has its origin in information theory and the efforts of scientists and engineers to build and interconnect computer networks. The Internet Protocol Suite, the set of rules used to communicate between networks and devices on the Internet, arose from research and development in the United States and involved international collaboration, particularly with researchers in the United Kingdom and France.',
        subQuestions: [
          {
            id: 'gq1_g1',
            type: 'mcq',
            question: 'Where did the research for the Internet Protocol Suite primarily arise?',
            options: ['United Kingdom', 'France', 'United States', 'Germany'],
            correctAnswer: 2,
            explanation: 'The text says research and development arose in the United States.'
          },
          {
            id: 'gq1_g2',
            type: 'mcq',
            question: 'Which of these countries was NOT mentioned as being involved in collaboration?',
            options: ['United Kingdom', 'France', 'Japan', 'United States'],
            correctAnswer: 2,
            explanation: 'The text mentions the US, UK, and France.'
          }
        ]
      }
    ]
  },
  {
    id: 'gq2',
    title: 'React Performance Audit',
    description: 'Test your knowledge on React optimization techniques and profiling.',
    duration: 45,
    questionsCount: 2,
    difficulty: 'Advanced',
    category: 'Frontend',
    tags: ['React', 'Performance'],
    isNew: false,
    passThreshold: 80,
    maxAttempts: 2,
    showAnswers: true,
    attempts: [],
    questions: [
      {
        id: 'gq2_q1',
        type: 'mcq',
        question: 'Which hook is used for memoizing expensive calculations?',
        options: ['useCallback', 'useMemo', 'useEffect', 'useRef'],
        correctAnswer: 1,
        explanation: 'useMemo returns a memoized value from a calculation.'
      },
      {
        id: 'gq2_q2',
        type: 'mcq',
        question: 'What is the purpose of React.memo()?',
        options: ['To cache data', 'To prevent component re-renders if props haven\'t changed', 'To manage global state', 'To handle side effects'],
        correctAnswer: 1,
        explanation: 'React.memo is a higher order component that memoizes the rendered output of a component.'
      }
    ]
  },
  {
    id: 'gq3',
    title: 'SQL Mastery Challenge',
    description: 'Advanced SQL queries, indexing strategies, and database design.',
    duration: 40,
    questionsCount: 1,
    difficulty: 'Intermediate',
    category: 'Backend',
    tags: ['SQL', 'Database'],
    isNew: true,
    passThreshold: 75,
    maxAttempts: 5,
    showAnswers: true,
    attempts: [],
    questions: [
      {
        id: 'gq3_q1',
        type: 'mcq',
        question: 'Which clause is used to filter groups in SQL?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctAnswer: 1,
        explanation: 'HAVING is used to filter results after a GROUP BY has been applied.'
      }
    ]
  },
  {
    id: 'gq4',
    title: 'UI/UX Design Principles',
    description: 'Test your understanding of modern design systems and accessibility.',
    duration: 20,
    questionsCount: 1,
    difficulty: 'Beginner',
    category: 'Design',
    tags: ['UI', 'UX', 'Accessibility'],
    isNew: false,
    passThreshold: 60,
    maxAttempts: 1,
    showAnswers: true,
    attempts: [],
    questions: [
      {
        id: 'gq4_q1',
        type: 'mcq',
        question: 'What is the primary goal of accessibility (a11y)?',
        options: ['To make sites look pretty', 'To ensure everyone, including people with disabilities, can use the site', 'To speed up page loading', 'To improve SEO'],
        correctAnswer: 1,
        explanation: 'Accessibility ensures that web content is usable by as many people as possible.'
      }
    ]
  },
];

export const mockSchools = [
  {
    id: 'sch1',
    name: 'Green Valley High School',
    district: 'North District',
    status: 'Active',
    studentsCount: 120,
    averageProgress: 65,
    contactEmail: 'contact@greenvalley.edu'
  },
  {
    id: 'sch2',
    name: 'Lincoln Memorial Academy',
    district: 'East District',
    status: 'Active',
    studentsCount: 85,
    averageProgress: 42,
    contactEmail: 'info@lincolnacademy.edu'
  },
  {
    id: 'sch3',
    name: 'Westside Tech',
    district: 'West District',
    status: 'Needs Attention',
    studentsCount: 200,
    averageProgress: 25,
    contactEmail: 'admin@westsidetech.edu'
  }
];

export const mockFellowStudents = [
  {
    id: 'fstd1',
    name: 'Emma Thompson',
    roll: 'STU101',
    schoolId: 'sch1',
    schoolName: 'Green Valley High School',
    programType: 'Undergraduate',
    districtStatus: 'In District',
    progress: 75,
    courses: ['Introduction to Web Development', 'Advanced React Patterns'],
    statistics: {
      attendance: '95%',
      assignmentsCompleted: 8,
      averageGrade: 82
    }
  },
  {
    id: 'fstd2',
    name: 'James Wilson',
    roll: 'STU102',
    schoolId: 'sch1',
    schoolName: 'Green Valley High School',
    programType: 'Postgraduate',
    districtStatus: 'Out of District',
    progress: 40,
    courses: ['Database Design & SQL'],
    statistics: {
      attendance: '80%',
      assignmentsCompleted: 3,
      averageGrade: 65
    }
  },
  {
    id: 'fstd3',
    name: 'Sophia Martinez',
    roll: 'STU103',
    schoolId: 'sch2',
    schoolName: 'Lincoln Memorial Academy',
    programType: 'Undergraduate',
    districtStatus: 'In District',
    progress: 90,
    courses: ['Introduction to Web Development', 'Database Design & SQL'],
    statistics: {
      attendance: '98%',
      assignmentsCompleted: 12,
      averageGrade: 95
    }
  },
  {
    id: 'fstd4',
    name: 'Liam Chen',
    roll: 'STU104',
    schoolId: 'sch3',
    schoolName: 'Westside Tech',
    programType: 'Undergraduate',
    districtStatus: 'In District',
    progress: 20,
    courses: ['Advanced React Patterns'],
    statistics: {
      attendance: '60%',
      assignmentsCompleted: 1,
      averageGrade: 45
    }
  }
];

export const mockReports = [
  {
    id: 'rep1',
    title: 'Attendance issues in Green Valley',
    type: 'School',
    target: 'Green Valley High School',
    concern: 'Several students from Grade 10 have been consistently absent for the last two weeks. Need to check if there is a transportation issue.',
    status: 'Reported',
    priority: 'High',
    createdAt: '2026-05-01T10:00:00Z',
    author: 'Fellow User',
    mentions: ['@GreenValleyAdmin']
  },
  {
    id: 'rep2',
    title: 'Emma Thompson performance drop',
    type: 'Student',
    target: 'Emma Thompson',
    concern: 'Emma has shown a significant drop in her recent quiz scores. She might need additional support in React patterns.',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2026-04-28T14:30:00Z',
    author: 'Fellow User',
    mentions: ['@SarahJohnson'],
    resolution: 'Conducted a 1:1 session and clarified her doubts regarding Hooks.'
  },
  {
    id: 'rep3',
    title: 'Lack of study materials for SQL',
    type: 'Other',
    target: 'Backend Development Course',
    concern: 'Students are requesting more practice datasets for SQL queries. The current ones are too basic.',
    status: 'Reported',
    priority: 'Low',
    createdAt: '2026-05-04T09:15:00Z',
    author: 'Fellow User',
    mentions: ['@MikeDavis']
  },
  {
    id: 'rep4',
    title: 'Liam Chen connectivity issues',
    type: 'Student',
    target: 'Liam Chen',
    concern: 'Liam is facing frequent internet outages at Westside Tech, affecting his participation in live classes.',
    status: 'Reported',
    priority: 'High',
    createdAt: '2026-05-03T11:45:00Z',
    author: 'Fellow User',
    mentions: ['@WestsideAdmin']
  }
];

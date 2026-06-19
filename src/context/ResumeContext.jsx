import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const initialResumeData = {
  personalInfo: {
    name: 'Alex Morgan',
    title: 'Senior Frontend Engineer',
    email: 'alex.morgan@tech.dev',
    phone: '(555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    website: 'alexmorgan.dev',
    summary: 'Innovative and detail-oriented Frontend Engineer with 5+ years of experience designing, building, and optimizing interactive web applications. Expertise in React, modern JavaScript, and CSS architecture. Dedicated to crafting fluid user experiences and clean, accessible code.',
    avatar: '' // Base64 avatar image if uploaded
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2019-09',
      endDate: '2021-05',
      gpa: '3.9',
      description: 'Specialization in Software Engineering and Human-Computer Interaction.'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2015-09',
      endDate: '2019-06',
      gpa: '3.8',
      description: 'Minor in Data Science. Graduated with Honors.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      position: 'Senior Software Engineer (Frontend)',
      company: 'Innovate Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-08',
      endDate: '',
      current: true,
      description: '• Architected and developed a next-generation SaaS product dashboard using React, reducing load times by 35%.\n• Built and documented a reusable custom component library, increasing team development velocity by 25%.\n• Led accessibility initiatives, achieving full WCAG 2.1 AA compliance across all key product flows.\n• Mentored 4 junior and mid-level developers, conducting weekly code reviews and technical workshops.'
    },
    {
      id: 'exp-2',
      position: 'Software Engineer',
      company: 'ByteCraft Technologies',
      location: 'Austin, TX',
      startDate: '2019-07',
      endDate: '2021-07',
      current: false,
      description: '• Implemented responsive user interfaces for high-traffic web applications, collaborating closely with UX designers.\n• Developed and integrated REST APIs with Express and Node.js, ensuring secure and scalable state transitions.\n• Integrated WebSockets to support real-time user collaboration features, reducing latency by 50%.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'ResumeCraft Engine',
      role: 'Lead Creator',
      technologies: 'React, Node.js, CSS Variables',
      link: 'github.com/alexmorgan/resumecraft',
      description: 'Developed an advanced open-source resume editor featuring side-by-side editing, local JSON persistence, and pixel-perfect PDF export via pure CSS media print rules.'
    },
    {
      id: 'proj-2',
      name: 'DevFlow Kanban Board',
      role: 'Full Stack Developer',
      technologies: 'React, Express, HTML5 Drag-and-Drop',
      link: 'github.com/alexmorgan/devflow',
      description: 'Designed a highly interactive task manager dashboard with drag-and-drop card movements, customized theme accents, and frontend local storage state synchronization.'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript (ES6+)', level: 'Expert', category: 'Languages' },
    { id: 'skill-2', name: 'HTML5 & CSS3', level: 'Expert', category: 'Languages' },
    { id: 'skill-3', name: 'React & Redux', level: 'Expert', category: 'Frameworks' },
    { id: 'skill-4', name: 'Node.js & Express', level: 'Advanced', category: 'Backend' },
    { id: 'skill-5', name: 'Git & GitHub', level: 'Advanced', category: 'Tools' },
    { id: 'skill-6', name: 'REST & GraphQL APIs', level: 'Advanced', category: 'Backend' },
    { id: 'skill-7', name: 'Web Performance Optimization', level: 'Advanced', category: 'Methodologies' },
    { id: 'skill-8', name: 'Responsive Web Design', level: 'Expert', category: 'Methodologies' }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Conversational' }
  ],
  hobbies: [
    { id: 'hob-1', name: 'Landscape Photography' },
    { id: 'hob-2', name: 'Bicycle Touring' },
    { id: 'hob-3', name: 'Open Source Contribution' }
  ],
  customSections: []
};

const initialCustomization = {
  templateId: 'classic',
  themeColor: '#2563eb', // Indigo 600 default
  secondaryColor: '#0d9488', // Teal 600 default
  fontFamily: 'Inter',
  fontSize: 'md',
  margins: 'normal',
  sectionSpacing: 'normal'
};

export const ResumeProvider = ({ children }) => {
  const [activeResumeId, setActiveResumeId] = useState(null);
  const [resumeTitle, setResumeTitle] = useState('My Resume');
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumemaker_current_draft');
    return saved ? JSON.parse(saved) : initialResumeData;
  });
  const [customization, setCustomization] = useState(() => {
    const saved = localStorage.getItem('resumemaker_current_style');
    return saved ? JSON.parse(saved) : initialCustomization;
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('resumemaker_theme');
    return saved || 'dark'; // Dark theme default for premium aesthetics
  });
  const [savedResumes, setSavedResumes] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [atsFeedback, setAtsFeedback] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Sync draft and theme to localStorage
  useEffect(() => {
    localStorage.setItem('resumemaker_current_draft', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resumemaker_current_style', JSON.stringify(customization));
  }, [customization]);

  useEffect(() => {
    localStorage.setItem('resumemaker_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Real-time ATS Calculation
  useEffect(() => {
    calculateAtsScore();
  }, [resumeData]);

  // Fetch resumes from backend Express API on launch
  const fetchSavedResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      if (response.ok) {
        const data = await response.json();
        setSavedResumes(data);
      }
    } catch (error) {
      console.log('Backend server not connected. Falling back to local storage list.');
      // Fallback: load list from local storage of saved profiles
      const list = localStorage.getItem('resumemaker_profiles_list') || '[]';
      setSavedResumes(JSON.parse(list));
    }
  };

  useEffect(() => {
    fetchSavedResumes();
  }, []);

  const calculateAtsScore = () => {
    let score = 0;
    const feedback = [];

    const { personalInfo, education, experience, projects, skills } = resumeData;

    // 1. Personal Information validation (Max 20 points)
    if (personalInfo.name) {
      score += 5;
    } else {
      feedback.push({ type: 'danger', text: 'Full Name is missing.', section: 'personalInfo' });
    }

    if (personalInfo.title) {
      score += 3;
    } else {
      feedback.push({ type: 'warning', text: 'Professional Title is missing.', section: 'personalInfo' });
    }

    if (personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      score += 4;
    } else {
      feedback.push({ type: 'danger', text: 'Provide a valid email address.', section: 'personalInfo' });
    }

    if (personalInfo.phone) {
      score += 4;
    } else {
      feedback.push({ type: 'danger', text: 'Phone number is missing.', section: 'personalInfo' });
    }

    if (personalInfo.location) {
      score += 2;
    } else {
      feedback.push({ type: 'warning', text: 'Location (City, State) is missing.', section: 'personalInfo' });
    }

    if (personalInfo.linkedin || personalInfo.github) {
      score += 2;
    } else {
      feedback.push({ type: 'warning', text: 'No social profile links (LinkedIn/GitHub) found.', section: 'personalInfo' });
    }

    // 2. Summary details (Max 10 points)
    if (personalInfo.summary) {
      const words = personalInfo.summary.split(/\s+/).filter(w => w.length > 0).length;
      if (words >= 30 && words <= 80) {
        score += 10;
      } else if (words < 30) {
        score += 5;
        feedback.push({ type: 'warning', text: 'Summary is a bit short. Aim for 30–80 words.', section: 'personalInfo' });
      } else {
        score += 6;
        feedback.push({ type: 'warning', text: 'Summary is too wordy. Keep it under 80 words.', section: 'personalInfo' });
      }
    } else {
      feedback.push({ type: 'danger', text: 'Professional Summary is missing.', section: 'personalInfo' });
    }

    // 3. Work Experience details (Max 30 points)
    if (experience && experience.length > 0) {
      score += 10;
      let hasSufficientDescriptions = true;
      let hasActionVerbs = false;

      const actionVerbsList = ['architected', 'built', 'led', 'designed', 'developed', 'managed', 'implemented', 'created', 'optimized', 'reduced', 'increased', 'mentored', 'integrated', 'achieved', 'conducted'];

      experience.forEach(exp => {
        if (!exp.description || exp.description.length < 30) {
          hasSufficientDescriptions = false;
        }
        
        if (exp.description) {
          const descLower = exp.description.toLowerCase();
          if (actionVerbsList.some(verb => descLower.includes(verb))) {
            hasActionVerbs = true;
          }
        }
      });

      if (hasSufficientDescriptions) {
        score += 10;
      } else {
        feedback.push({ type: 'warning', text: 'Provide detailed descriptions (bullet points) for all work experience entries.', section: 'experience' });
      }

      if (hasActionVerbs) {
        score += 10;
      } else {
        feedback.push({ type: 'warning', text: 'Include strong action verbs in job descriptions (e.g., Led, Developed, Optimized).', section: 'experience' });
      }
    } else {
      feedback.push({ type: 'danger', text: 'Add at least one Work Experience entry.', section: 'experience' });
    }

    // 4. Education details (Max 15 points)
    if (education && education.length > 0) {
      score += 10;
      let hasDegrees = true;
      education.forEach(edu => {
        if (!edu.degree || !edu.school) {
          hasDegrees = false;
        }
      });
      if (hasDegrees) {
        score += 5;
      } else {
        feedback.push({ type: 'danger', text: 'Degree or school name missing in Education.', section: 'education' });
      }
    } else {
      feedback.push({ type: 'danger', text: 'Add at least one Education entry.', section: 'education' });
    }

    // 5. Skills (Max 15 points)
    if (skills && skills.length > 0) {
      if (skills.length >= 5) {
        score += 15;
      } else {
        score += 8;
        feedback.push({ type: 'warning', text: 'List at least 5 key professional skills.', section: 'skills' });
      }
    } else {
      feedback.push({ type: 'danger', text: 'Add professional skills.', section: 'skills' });
    }

    // 6. Projects (Max 10 points)
    if (projects && projects.length > 0) {
      score += 10;
    } else {
      feedback.push({ type: 'warning', text: 'Adding projects highlights practical expertise.', section: 'projects' });
    }

    setAtsScore(score);
    setAtsFeedback(feedback);
  };

  // State Updaters
  const updatePersonalInfo = (fields) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...fields }
    }));
  };

  const addEducationEntry = () => {
    const newEntry = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEntry]
    }));
  };

  const updateEducationEntry = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, ...fields } : edu)
    }));
  };

  const deleteEducationEntry = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const reorderEducationEntries = (newOrder) => {
    setResumeData(prev => ({ ...prev, education: newOrder }));
  };

  const addExperienceEntry = () => {
    const newEntry = {
      id: `exp-${Date.now()}`,
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newEntry]
    }));
  };

  const updateExperienceEntry = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, ...fields } : exp)
    }));
  };

  const deleteExperienceEntry = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const reorderExperienceEntries = (newOrder) => {
    setResumeData(prev => ({ ...prev, experience: newOrder }));
  };

  const addProjectEntry = () => {
    const newEntry = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      technologies: '',
      link: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newEntry]
    }));
  };

  const updateProjectEntry = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => proj.id === id ? { ...proj, ...fields } : proj)
    }));
  };

  const deleteProjectEntry = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const reorderProjectEntries = (newOrder) => {
    setResumeData(prev => ({ ...prev, projects: newOrder }));
  };

  const addSkill = (name = '', level = 'Intermediate', category = '') => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      name,
      level,
      category
    };
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(sk => sk.id === id ? { ...sk, ...fields } : sk)
    }));
  };

  const deleteSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(sk => sk.id !== id)
    }));
  };

  const addLanguage = (name = '', proficiency = 'Intermediate') => {
    const newLang = {
      id: `lang-${Date.now()}`,
      name,
      proficiency
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const updateLanguage = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(ln => ln.id === id ? { ...ln, ...fields } : ln)
    }));
  };

  const deleteLanguage = (id) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(ln => ln.id !== id)
    }));
  };

  const addHobby = (name = '') => {
    const newHobby = {
      id: `hob-${Date.now()}`,
      name
    };
    setResumeData(prev => ({
      ...prev,
      hobbies: [...prev.hobbies, newHobby]
    }));
  };

  const updateHobby = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.map(hb => hb.id === id ? { ...hb, ...fields } : hb)
    }));
  };

  const deleteHobby = (id) => {
    setResumeData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter(hb => hb.id !== id)
    }));
  };

  const addCustomSection = (title = 'Custom Section') => {
    const newSection = {
      id: `cust-${Date.now()}`,
      title,
      content: ''
    };
    setResumeData(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
  };

  const updateCustomSection = (id, fields) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(cs => cs.id === id ? { ...cs, ...fields } : cs)
    }));
  };

  const deleteCustomSection = (id) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(cs => cs.id !== id)
    }));
  };

  const reorderCustomSections = (newOrder) => {
    setResumeData(prev => ({ ...prev, customSections: newOrder }));
  };

  const updateCustomization = (fields) => {
    setCustomization(prev => ({ ...prev, ...fields }));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Create new blank resume
  const createNewResume = () => {
    setActiveResumeId(`res-${Date.now()}`);
    setResumeTitle('My Resume');
    setResumeData({
      personalInfo: { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', summary: '', avatar: '' },
      education: [],
      experience: [],
      projects: [],
      skills: [],
      languages: [],
      hobbies: [],
      customSections: []
    });
    setCustomization(initialCustomization);
  };

  // Load a resume by ID
  const loadResume = async (id) => {
    // 1. Try server
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const resume = await response.json();
        setActiveResumeId(resume.id);
        setResumeTitle(resume.title || 'Untitled');
        setResumeData(resume.data || initialResumeData);
        setCustomization(resume.customization || initialCustomization);
        return;
      }
    } catch (e) {
      console.log('Unable to load from Express API, loading from localStorage.');
    }

    // 2. Try localStorage
    const saved = localStorage.getItem('resumemaker_profiles');
    if (saved) {
      const list = JSON.parse(saved);
      const resume = list.find(r => r.id === id);
      if (resume) {
        setActiveResumeId(resume.id);
        setResumeTitle(resume.title || 'Untitled');
        setResumeData(resume.data);
        setCustomization(resume.customization);
      }
    }
  };

  // Save Resume to server (or client fallback)
  const saveResumeToServer = async (titleInput) => {
    setIsSaving(true);
    const title = titleInput || resumeTitle;
    setResumeTitle(title);
    
    const id = activeResumeId || `res-${Date.now()}`;
    if (!activeResumeId) {
      setActiveResumeId(id);
    }

    const payload = {
      id,
      title,
      data: resumeData,
      customization,
      templateId: customization.templateId
    };

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log('Saved to server.');
      } else {
        throw new Error('Server returned non-200 status');
      }
    } catch (e) {
      console.log('Saving to localStorage backup.');
      // Save locally
      const listStr = localStorage.getItem('resumemaker_profiles') || '[]';
      const list = JSON.parse(listStr);
      const index = list.findIndex(r => r.id === id);
      
      const enrichedPayload = { ...payload, updatedAt: new Date().toISOString() };
      if (index !== -1) {
        list[index] = enrichedPayload;
      } else {
        enrichedPayload.createdAt = new Date().toISOString();
        list.push(enrichedPayload);
      }
      localStorage.setItem('resumemaker_profiles', JSON.stringify(list));
      
      // Update local listing
      localStorage.setItem(
        'resumemaker_profiles_list', 
        JSON.stringify(list.map(r => ({
          id: r.id,
          title: r.title,
          updatedAt: r.updatedAt,
          templateId: r.templateId,
          personalInfo: { name: r.data.personalInfo.name, email: r.data.personalInfo.email }
        })))
      );
    }
    
    await fetchSavedResumes();
    setIsSaving(false);
  };

  // Delete resume
  const deleteResume = async (id) => {
    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Deleted from server.');
      } else {
        throw new Error('Server error on delete');
      }
    } catch (e) {
      console.log('Deleting from localStorage backup.');
      const listStr = localStorage.getItem('resumemaker_profiles') || '[]';
      const list = JSON.parse(listStr).filter(r => r.id !== id);
      localStorage.setItem('resumemaker_profiles', JSON.stringify(list));
      localStorage.setItem(
        'resumemaker_profiles_list',
        JSON.stringify(list.map(r => ({
          id: r.id,
          title: r.title,
          updatedAt: r.updatedAt,
          templateId: r.templateId,
          personalInfo: { name: r.data.personalInfo.name, email: r.data.personalInfo.email }
        })))
      );
    }
    
    if (activeResumeId === id) {
      setActiveResumeId(null);
    }
    await fetchSavedResumes();
  };

  // Import JSON backup
  const importResume = (jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      if (imported.data && imported.customization) {
        setResumeData(imported.data);
        setCustomization(imported.customization);
        if (imported.title) setResumeTitle(imported.title);
        if (imported.id) setActiveResumeId(imported.id);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Export JSON backup
  const exportResume = () => {
    const payload = {
      id: activeResumeId || `res-${Date.now()}`,
      title: resumeTitle,
      data: resumeData,
      customization
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeTitle.replace(/\s+/g, '_')}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <ResumeContext.Provider value={{
      theme,
      toggleTheme,
      activeResumeId,
      setActiveResumeId,
      resumeTitle,
      setResumeTitle,
      resumeData,
      setResumeData,
      customization,
      updateCustomization,
      savedResumes,
      atsScore,
      atsFeedback,
      isSaving,
      updatePersonalInfo,
      addEducationEntry,
      updateEducationEntry,
      deleteEducationEntry,
      reorderEducationEntries,
      addExperienceEntry,
      updateExperienceEntry,
      deleteExperienceEntry,
      reorderExperienceEntries,
      addProjectEntry,
      updateProjectEntry,
      deleteProjectEntry,
      reorderProjectEntries,
      addSkill,
      updateSkill,
      deleteSkill,
      addLanguage,
      updateLanguage,
      deleteLanguage,
      addHobby,
      updateHobby,
      deleteHobby,
      addCustomSection,
      updateCustomSection,
      deleteCustomSection,
      reorderCustomSections,
      createNewResume,
      loadResume,
      saveResumeToServer,
      deleteResume,
      importResume,
      exportResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

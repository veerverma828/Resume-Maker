import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialResumeData, initialCustomization } from '../constants/defaultResumeData';
import { calculateAtsScore as calculateAtsScoreHelper } from '../utils/atsScoreCalculator';

const ResumeContext = createContext();

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

  const calculateAtsScore = () => {
    const { score, feedback } = calculateAtsScoreHelper(resumeData);
    setAtsScore(score);
    setAtsFeedback(feedback);
  };

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

import React from 'react';
import { User, Briefcase, GraduationCap, Code, Layers, Globe, Smile, FolderPlus } from 'lucide-react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import LanguagesForm from './forms/LanguagesForm';
import HobbiesForm from './forms/HobbiesForm';
import CustomSectionsForm from './forms/CustomSectionsForm';

export default function EditorPanel({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'personalInfo', name: 'Personal Details', icon: <User size={16} /> },
    { id: 'experience', name: 'Work History', icon: <Briefcase size={16} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'projects', name: 'Projects', icon: <FolderPlus size={16} /> },
    { id: 'skills', name: 'Skills', icon: <Code size={16} /> },
    { id: 'languages', name: 'Languages', icon: <Globe size={16} /> },
    { id: 'hobbies', name: 'Hobbies', icon: <Smile size={16} /> },
    { id: 'custom', name: 'Custom Section', icon: <Layers size={16} /> }
  ];

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'skills':
        return <SkillsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'hobbies':
        return <HobbiesForm />;
      case 'custom':
        return <CustomSectionsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {/* Editor Navigation Tabs (Scrollable Pill Layout) */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '8px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none' /* IE/Edge */
      }} className="editor-nav-tabs">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className="btn btn-sm"
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => {
                    setActiveTab(tab.id);
                  });
                } else {
                  setActiveTab(tab.id);
                }
              }}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'var(--bg-card)',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }
              }}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Forms Area */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {renderActiveForm()}
      </div>
    </div>
  );
}

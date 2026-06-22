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
      {/* Editor Navigation Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '12px'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab(tab.id)}
            style={{
              borderColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border-color)',
              backgroundColor: activeTab === tab.id ? 'var(--primary-light)' : 'var(--bg-card)',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-primary)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Editor Forms Area */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {renderActiveForm()}
      </div>
    </div>
  );
}

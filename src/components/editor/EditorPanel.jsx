import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  User, Briefcase, GraduationCap, Code, 
  Layers, Globe, Smile, FolderPlus, Plus, 
  Trash2, ChevronDown, ChevronUp, GripVertical, Image
} from 'lucide-react';

export default function EditorPanel({ activeTab, setActiveTab }) {
  const {
    resumeData,
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
    skills,
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
    reorderCustomSections
  } = useResume();

  const [expandedSection, setExpandedSection] = useState(null);

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

  // Image Upload handler (Base64 conversion)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // HTML5 Drag and Drop Handlers for List Items
  const handleDragStart = (e, index, listType) => {
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.setData('listType', listType);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex, listType) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const incomingType = e.dataTransfer.getData('listType');

    if (incomingType !== listType) return;

    if (listType === 'experience') {
      const items = [...resumeData.experience];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, removed);
      reorderExperienceEntries(items);
    } else if (listType === 'education') {
      const items = [...resumeData.education];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, removed);
      reorderEducationEntries(items);
    } else if (listType === 'projects') {
      const items = [...resumeData.projects];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, removed);
      reorderProjectEntries(items);
    } else if (listType === 'custom') {
      const items = [...resumeData.customSections];
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(targetIndex, 0, removed);
      reorderCustomSections(items);
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
        
        {/* Tab 1: Personal Details */}
        {activeTab === 'personalInfo' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Alex Morgan"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Professional Subtitle</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.title}
                    onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div style={{
                width: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}>
                <label className="form-label">Profile Image</label>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {resumeData.personalInfo.avatar ? (
                    <img 
                      src={resumeData.personalInfo.avatar} 
                      alt="Avatar" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <Image size={28} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
                <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', margin: 0, fontSize: '0.75rem', padding: '4px 10px' }}>
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarChange} 
                    style={{ display: 'none' }} 
                  />
                </label>
                {resumeData.personalInfo.avatar && (
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => updatePersonalInfo({ avatar: '' })}
                    style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                  className="form-input"
                  placeholder="alex@tech.dev"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                  className="form-input"
                  placeholder="(555) 019-2834"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Location (City, State)</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  className="form-input"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Website / Portfolio</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                  className="form-input"
                  placeholder="alexmorgan.dev"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                  className="form-input"
                  placeholder="linkedin.com/in/alexmorgan"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub Profile</label>
                <input
                  type="text"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo({ github: e.target.value })}
                  className="form-input"
                  placeholder="github.com/alexmorgan"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Professional Summary</label>
              <textarea
                value={resumeData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                className="form-textarea"
                placeholder="Brief summary of your professional expertise, achievements, and career focus..."
              />
            </div>
          </div>
        )}

        {/* Tab 2: Work Experience */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Experience List</h3>
              <button className="btn btn-primary btn-sm" onClick={addExperienceEntry}>
                <Plus size={14} /> Add Job
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resumeData.experience.map((exp, index) => (
                <div 
                  key={exp.id} 
                  className="glass-panel"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, 'experience')}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, 'experience')}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Collapsible Header */}
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} onClick={() => setExpandedSection(expandedSection === exp.id ? null : exp.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GripVertical size={16} style={{ color: 'var(--text-muted)', cursor: 'grab' }} onClick={(e) => e.stopPropagation()} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {exp.position || 'New Position'} {exp.company ? `@ ${exp.company}` : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="btn btn-danger btn-icon-only btn-sm"
                        style={{ width: '28px', height: '28px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteExperienceEntry(exp.id);
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                      {expandedSection === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Body details */}
                  {expandedSection === exp.id && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateExperienceEntry(exp.id, { position: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Lead Engineer"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperienceEntry(exp.id, { company: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Google"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperienceEntry(exp.id, { location: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Mountain View, CA"
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '22px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={exp.current || false}
                              onChange={(e) => updateExperienceEntry(exp.id, { current: e.target.checked })}
                            />
                            I currently work here
                          </label>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Start Date</label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperienceEntry(exp.id, { startDate: e.target.value })}
                            className="form-input"
                          />
                        </div>
                        {!exp.current && (
                          <div className="form-group">
                            <label className="form-label" style={{ fontSize: '0.75rem' }}>End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperienceEntry(exp.id, { endDate: e.target.value })}
                              className="form-input"
                            />
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Role Description (One bullet per line recommended)</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperienceEntry(exp.id, { description: e.target.value })}
                          className="form-textarea"
                          rows="4"
                          placeholder="• Built a customized dashboard using React...&#10;• Mentored junior developers..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Education */}
        {activeTab === 'education' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Education Entries</h3>
              <button className="btn btn-primary btn-sm" onClick={addEducationEntry}>
                <Plus size={14} /> Add Degree
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resumeData.education.map((edu, index) => (
                <div 
                  key={edu.id} 
                  className="glass-panel"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, 'education')}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, 'education')}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} onClick={() => setExpandedSection(expandedSection === edu.id ? null : edu.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GripVertical size={16} style={{ color: 'var(--text-muted)', cursor: 'grab' }} onClick={(e) => e.stopPropagation()} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {edu.degree || 'New Degree'} {edu.school ? `@ ${edu.school}` : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="btn btn-danger btn-icon-only btn-sm"
                        style={{ width: '28px', height: '28px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEducationEntry(edu.id);
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                      {expandedSection === edu.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {expandedSection === edu.id && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Degree / Field of Study</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducationEntry(edu.id, { degree: e.target.value })}
                            className="form-input"
                            placeholder="e.g. BS in Computer Science"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>School / University</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducationEntry(edu.id, { school: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Stanford University"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Location</label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => updateEducationEntry(edu.id, { location: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Stanford, CA"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>GPA (Optional)</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducationEntry(edu.id, { gpa: e.target.value })}
                            className="form-input"
                            placeholder="e.g. 3.8/4.0"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Start Date</label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducationEntry(edu.id, { startDate: e.target.value })}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>End Date (or Expected)</label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducationEntry(edu.id, { endDate: e.target.value })}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Academic Details / Accomplishments</label>
                        <textarea
                          value={edu.description}
                          onChange={(e) => updateEducationEntry(edu.id, { description: e.target.value })}
                          className="form-textarea"
                          rows="3"
                          placeholder="Minor in Data Science. Recipient of Dean's Scholarship..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Projects */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Projects Showcase</h3>
              <button className="btn btn-primary btn-sm" onClick={addProjectEntry}>
                <Plus size={14} /> Add Project
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resumeData.projects.map((proj, index) => (
                <div 
                  key={proj.id} 
                  className="glass-panel"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, 'projects')}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, 'projects')}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} onClick={() => setExpandedSection(expandedSection === proj.id ? null : proj.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GripVertical size={16} style={{ color: 'var(--text-muted)', cursor: 'grab' }} onClick={(e) => e.stopPropagation()} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {proj.name || 'New Project'} {proj.role ? `(${proj.role})` : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="btn btn-danger btn-icon-only btn-sm"
                        style={{ width: '28px', height: '28px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProjectEntry(proj.id);
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                      {expandedSection === proj.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {expandedSection === proj.id && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Project Name</label>
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => updateProjectEntry(proj.id, { name: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Kanban Task Dashboard"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Your Role</label>
                          <input
                            type="text"
                            value={proj.role}
                            onChange={(e) => updateProjectEntry(proj.id, { role: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Full Stack Creator"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Technologies Used</label>
                          <input
                            type="text"
                            value={proj.technologies}
                            onChange={(e) => updateProjectEntry(proj.id, { technologies: e.target.value })}
                            className="form-input"
                            placeholder="e.g. React, Node.js, CSS Grid"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" style={{ fontSize: '0.75rem' }}>Project Link (GitHub/Website)</label>
                          <input
                            type="text"
                            value={proj.link}
                            onChange={(e) => updateProjectEntry(proj.id, { link: e.target.value })}
                            className="form-input"
                            placeholder="e.g. github.com/user/project"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Brief Description</label>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProjectEntry(proj.id, { description: e.target.value })}
                          className="form-textarea"
                          rows="3"
                          placeholder="Describe what you built, achievements, or key project modules..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Skills */}
        {activeTab === 'skills' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Professional Skills</h3>
              <button className="btn btn-primary btn-sm" onClick={() => addSkill()}>
                <Plus size={14} /> Add Skill
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '12px'
            }}>
              {resumeData.skills.map(sk => (
                <div 
                  key={sk.id}
                  className="glass-panel"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={sk.name}
                      onChange={(e) => updateSkill(sk.id, { name: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.85rem', padding: '4px 8px', border: 'none', background: 'transparent', fontWeight: 600, width: '80%' }}
                      placeholder="Skill name"
                    />
                    <button 
                      className="btn btn-danger btn-icon-only btn-sm"
                      style={{ width: '22px', height: '22px' }}
                      onClick={() => deleteSkill(sk.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <select
                      value={sk.level}
                      onChange={(e) => updateSkill(sk.id, { level: e.target.value })}
                      className="form-select"
                      style={{ fontSize: '0.75rem', padding: '2px 4px', flex: 1 }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>

                    <input
                      type="text"
                      value={sk.category || ''}
                      onChange={(e) => updateSkill(sk.id, { category: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '0.75rem', padding: '2px 6px', flex: 1, minWidth: 0 }}
                      placeholder="Category"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Languages */}
        {activeTab === 'languages' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Languages</h3>
              <button className="btn btn-primary btn-sm" onClick={() => addLanguage()}>
                <Plus size={14} /> Add Language
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resumeData.languages.map(ln => (
                <div 
                  key={ln.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)'
                  }}
                >
                  <input
                    type="text"
                    value={ln.name}
                    onChange={(e) => updateLanguage(ln.id, { name: e.target.value })}
                    className="form-input"
                    style={{ flex: 2, padding: '6px 10px', fontSize: '0.85rem' }}
                    placeholder="Language (e.g. English)"
                  />
                  <select
                    value={ln.proficiency}
                    onChange={(e) => updateLanguage(ln.id, { proficiency: e.target.value })}
                    className="form-select"
                    style={{ flex: 1, padding: '6px 10px', fontSize: '0.85rem' }}
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Beginner">Beginner</option>
                  </select>
                  <button 
                    className="btn btn-danger btn-icon-only btn-sm"
                    style={{ width: '28px', height: '28px', flexShrink: 0 }}
                    onClick={() => deleteLanguage(ln.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Hobbies */}
        {activeTab === 'hobbies' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Hobbies & Interests</h3>
              <button className="btn btn-primary btn-sm" onClick={() => addHobby()}>
                <Plus size={14} /> Add Hobby
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resumeData.hobbies.map(hb => (
                <div 
                  key={hb.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)'
                  }}
                >
                  <input
                    type="text"
                    value={hb.name}
                    onChange={(e) => updateHobby(hb.id, { name: e.target.value })}
                    className="form-input"
                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '6px 0', fontSize: '0.85rem' }}
                    placeholder="e.g. Photography, Cycling"
                  />
                  <button 
                    className="btn btn-danger btn-icon-only btn-sm"
                    style={{ width: '28px', height: '28px', flexShrink: 0 }}
                    onClick={() => deleteHobby(hb.id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Custom Sections */}
        {activeTab === 'custom' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem' }}>Custom Sections</h3>
              <button className="btn btn-primary btn-sm" onClick={() => addCustomSection()}>
                <Plus size={14} /> Add Section
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resumeData.customSections.map((cs, index) => (
                <div 
                  key={cs.id}
                  className="glass-panel"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index, 'custom')}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index, 'custom')}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }} onClick={() => setExpandedSection(expandedSection === cs.id ? null : cs.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <GripVertical size={16} style={{ color: 'var(--text-muted)', cursor: 'grab' }} onClick={(e) => e.stopPropagation()} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {cs.title || 'Untitled Custom Section'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        className="btn btn-danger btn-icon-only btn-sm"
                        style={{ width: '28px', height: '28px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCustomSection(cs.id);
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                      {expandedSection === cs.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {expandedSection === cs.id && (
                    <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Section Title</label>
                        <input
                          type="text"
                          value={cs.title}
                          onChange={(e) => updateCustomSection(cs.id, { title: e.target.value })}
                          className="form-input"
                          placeholder="e.g. Publications, Certifications"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Section Content (Markdown or plain text)</label>
                        <textarea
                          value={cs.content}
                          onChange={(e) => updateCustomSection(cs.id, { content: e.target.value })}
                          className="form-textarea"
                          rows="4"
                          placeholder="Describe certification details or write your custom items..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

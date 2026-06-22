import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function EducationForm() {
  const {
    resumeData,
    addEducationEntry,
    updateEducationEntry,
    deleteEducationEntry,
    reorderEducationEntries
  } = useResume();

  const [expandedSection, setExpandedSection] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const items = [...resumeData.education];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);
    reorderEducationEntries(items);
  };

  return (
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
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
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
                <div className="form-grid-2col" style={{ gap: '12px' }}>
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

                <div className="form-grid-2col" style={{ gap: '12px' }}>
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

                <div className="form-grid-2col" style={{ gap: '12px' }}>
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
  );
}

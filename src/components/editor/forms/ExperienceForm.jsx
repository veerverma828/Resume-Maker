import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function ExperienceForm() {
  const {
    resumeData,
    addExperienceEntry,
    updateExperienceEntry,
    deleteExperienceEntry,
    reorderExperienceEntries
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
    const items = [...resumeData.experience];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);
    reorderExperienceEntries(items);
  };

  return (
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
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
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
                <div className="form-grid-2col" style={{ gap: '12px' }}>
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

                <div className="form-grid-2col" style={{ gap: '12px' }}>
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

                <div className="form-grid-2col" style={{ gap: '12px' }}>
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
  );
}

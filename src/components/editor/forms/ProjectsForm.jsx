import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function ProjectsForm() {
  const {
    resumeData,
    addProjectEntry,
    updateProjectEntry,
    deleteProjectEntry,
    reorderProjectEntries
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
    const items = [...resumeData.projects];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);
    reorderProjectEntries(items);
  };

  return (
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
                <div className="form-grid-2col" style={{ gap: '12px' }}>
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

                <div className="form-grid-2col" style={{ gap: '12px' }}>
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
  );
}

import React, { useState } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, GripVertical, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function CustomSectionsForm() {
  const {
    resumeData,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    reorderCustomSections
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
    const items = [...resumeData.customSections];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);
    reorderCustomSections(items);
  };

  return (
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
  );
}

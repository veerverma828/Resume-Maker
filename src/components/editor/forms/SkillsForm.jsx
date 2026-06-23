import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsForm() {
  const {
    resumeData,
    addSkill,
    updateSkill,
    deleteSkill
  } = useResume();

  return (
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
                value={sk.name || ''}
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
  );
}

import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export default function LanguagesForm() {
  const {
    resumeData,
    addLanguage,
    updateLanguage,
    deleteLanguage
  } = useResume();

  return (
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
  );
}

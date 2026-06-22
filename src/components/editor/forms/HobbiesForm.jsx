import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export default function HobbiesForm() {
  const {
    resumeData,
    addHobby,
    updateHobby,
    deleteHobby
  } = useResume();

  return (
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
  );
}

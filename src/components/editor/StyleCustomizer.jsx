import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Type, Layout, Sliders } from 'lucide-react';

export default function StyleCustomizer() {
  const { customization, updateCustomization } = useResume();

  const colorPresets = [
    { name: 'Indigo', value: '#2563eb' },
    { name: 'Teal', value: '#0d9488' },
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Slate', value: '#0f172a' }
  ];

  const fontPresets = [
    { name: 'Inter (Clean)', value: 'Inter' },
    { name: 'Roboto (Modern)', value: 'Roboto' },
    { name: 'Outfit (Premium)', value: 'Outfit' },
    { name: 'Playfair (Elegant)', value: 'Playfair Display' },
    { name: 'Lato (Professional)', value: 'Lato' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Template Selector */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Layout size={16} style={{ color: 'var(--primary)' }} /> Layout Template
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { id: 'classic', name: 'Classic Blue' },
            { id: 'minimal', name: 'Minimal Modern' },
            { id: 'sidebar', name: 'Split Sidebar' },
            { id: 'tech', name: 'Tech/Developer' }
          ].map(temp => (
            <button
              key={temp.id}
              className="btn btn-secondary btn-sm"
              onClick={() => updateCustomization({ templateId: temp.id })}
              style={{
                borderColor: customization.templateId === temp.id ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: customization.templateId === temp.id ? 'var(--primary-light)' : 'var(--bg-card)',
                color: customization.templateId === temp.id ? 'var(--primary)' : 'var(--text-primary)',
                fontWeight: customization.templateId === temp.id ? 700 : 500
              }}
            >
              {temp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color Accent */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Palette size={16} style={{ color: 'var(--primary)' }} /> Theme Accent Color
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          {colorPresets.map(color => (
            <button
              key={color.value}
              onClick={() => updateCustomization({ themeColor: color.value })}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: color.value,
                border: customization.themeColor === color.value ? '2px solid var(--text-primary)' : '1px solid transparent',
                cursor: 'pointer',
                transform: customization.themeColor === color.value ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.15s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
              title={color.name}
            />
          ))}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '0.75rem' }}>Custom Color Picker</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="color"
              value={customization.themeColor}
              onChange={(e) => updateCustomization({ themeColor: e.target.value })}
              style={{
                border: 'none',
                width: '40px',
                height: '28px',
                padding: 0,
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'transparent'
              }}
            />
            <input
              type="text"
              value={customization.themeColor}
              onChange={(e) => updateCustomization({ themeColor: e.target.value })}
              className="form-input"
              style={{ padding: '4px 8px', height: '28px', fontSize: '0.85rem', width: '90px' }}
            />
          </div>
        </div>
      </div>

      {/* Typography Selector */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Type size={16} style={{ color: 'var(--primary)' }} /> Font Style
        </h3>
        <select
          value={customization.fontFamily}
          onChange={(e) => updateCustomization({ fontFamily: e.target.value })}
          className="form-select"
          style={{ width: '100%', padding: '8px 12px', fontSize: '0.9rem' }}
        >
          {fontPresets.map(font => (
            <option key={font.value} value={font.value}>{font.name}</option>
          ))}
        </select>
      </div>

      {/* Spacing & Sizes Customizer */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sliders size={16} style={{ color: 'var(--primary)' }} /> Spacing & Size
        </h3>

        {/* Font Size Selector */}
        <div style={{ marginBottom: '14px' }}>
          <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '6px', display: 'block' }}>Font Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {[
              { id: 'sm', name: 'Small' },
              { id: 'md', name: 'Medium' },
              { id: 'lg', name: 'Large' }
            ].map(size => (
              <button
                key={size.id}
                className="btn btn-secondary btn-sm"
                onClick={() => updateCustomization({ fontSize: size.id })}
                style={{
                  padding: '4px',
                  fontSize: '0.75rem',
                  borderColor: customization.fontSize === size.id ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: customization.fontSize === size.id ? 'var(--primary-light)' : 'var(--bg-card)',
                  color: customization.fontSize === size.id ? 'var(--primary)' : 'var(--text-primary)'
                }}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        {/* Margins Selector */}
        <div>
          <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '6px', display: 'block' }}>Page Margins</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {[
              { id: 'compact', name: 'Compact' },
              { id: 'normal', name: 'Normal' },
              { id: 'loose', name: 'Loose' }
            ].map(margin => (
              <button
                key={margin.id}
                className="btn btn-secondary btn-sm"
                onClick={() => updateCustomization({ margins: margin.id })}
                style={{
                  padding: '4px',
                  fontSize: '0.75rem',
                  borderColor: customization.margins === margin.id ? 'var(--primary)' : 'var(--border-color)',
                  backgroundColor: customization.margins === margin.id ? 'var(--primary-light)' : 'var(--bg-card)',
                  color: customization.margins === margin.id ? 'var(--primary)' : 'var(--text-primary)'
                }}
              >
                {margin.name}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

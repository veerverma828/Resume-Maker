import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, Trophy } from 'lucide-react';

export default function AtsOptimizer({ setActiveTab }) {
  const { atsScore, atsFeedback } = useResume();

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 50) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is highly optimized for ATS filters.';
    if (score >= 50) return 'Good start, but adding missing details will increase your score.';
    return 'Attention required. Make critical updates to pass ATS scanner filters.';
  };

  const handleFeedbackClick = (section) => {
    if (section) {
      setActiveTab(section);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* ATS Score Radial Circle */}
      <div className="glass-panel" style={{ 
        padding: '24px', 
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Badge if 80+ */}
        {atsScore >= 80 && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            color: '#f59e0b'
          }} title="ATS Optimized Ready">
            <Trophy size={20} />
          </div>
        )}

        <div style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `6px solid ${getScoreColor(atsScore)}`,
          boxShadow: `0 0 16px ${getScoreColor(atsScore)}33`,
          marginBottom: '16px',
          transition: 'border-color 0.3s ease'
        }}>
          <span style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            fontFamily: 'var(--font-title)',
            color: 'var(--text-primary)'
          }}>
            {atsScore}%
          </span>
        </div>

        <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>ATS Compatibility Grade</h3>
        <p style={{ 
          fontSize: '0.8rem', 
          color: 'var(--text-secondary)', 
          lineHeight: 1.4,
          maxWidth: '220px'
        }}>
          {getScoreMessage(atsScore)}
        </p>
      </div>

      {/* Recommendations Checklist */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '0.95rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={16} style={{ color: 'var(--primary)' }} /> Recommendations List
        </h3>

        {atsFeedback.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '20px 0', 
            gap: '8px',
            color: '#10b981'
          }}>
            <CheckCircle2 size={32} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>All Checks Passed!</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {atsFeedback.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleFeedbackClick(item.section)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-app)',
                  borderLeft: `3px solid ${item.type === 'danger' ? '#ef4444' : '#f59e0b'}`,
                  cursor: item.section ? 'pointer' : 'default',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (item.section) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.section) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-app)';
                  }
                }}
              >
                <div style={{ 
                  color: item.type === 'danger' ? '#ef4444' : '#f59e0b',
                  marginTop: '2px'
                }}>
                  {item.type === 'danger' ? (
                    <AlertTriangle size={15} />
                  ) : (
                    <HelpCircle size={15} />
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.3, fontWeight: 500 }}>
                    {item.text}
                  </span>
                  {item.section && (
                    <span style={{ 
                      fontSize: '0.7rem', 
                      color: 'var(--primary)', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em'
                    }}>
                      Fix in {item.section === 'personalInfo' ? 'Personal Details' : item.section} &rarr;
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Plus, Trash2, Calendar, Edit3, ArrowRight } from 'lucide-react';

export default function Dashboard({ setCurrentView }) {
  const { savedResumes, loadResume, createNewResume, deleteResume, updateCustomization } = useResume();

  const handleEdit = async (id) => {
    await loadResume(id);
    setCurrentView('editor');
  };

  const handleCreateNew = () => {
    createNewResume();
    setCurrentView('editor');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 24px 60px 24px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      {/* Dashboard Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>My Resumes</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Manage your drafts, templates, and resume variations.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          <Plus size={16} /> Create New
        </button>
      </div>

      {/* Main Grid: Add New Card + Saved Resumes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {/* Creation Card */}
        <div 
          className="glass-panel card-hover"
          onClick={handleCreateNew}
          style={{
            height: '220px',
            borderRadius: '12px',
            border: '2px dashed var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            backgroundColor: 'transparent'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-app)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <Plus size={24} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Create from Scratch</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Start with our clean draft</span>
        </div>

        {/* Saved Profiles */}
        {savedResumes.map((resume) => (
          <div 
            key={resume.id}
            className="glass-panel card-hover"
            style={{
              height: '220px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} />
                <span style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--text-muted)'
                }}>
                  {resume.templateId || 'classic'} Template
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {resume.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {resume.personalInfo?.name || 'No name provided'}
              </p>
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '12px',
              marginTop: '12px'
            }}>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                color: 'var(--text-muted)', 
                fontSize: '0.8rem' 
              }}>
                <Calendar size={12} /> {formatDate(resume.updatedAt)}
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button 
                  className="btn btn-secondary btn-icon-only btn-sm"
                  onClick={() => handleEdit(resume.id)}
                  title="Edit Resume"
                  style={{ width: '32px', height: '32px' }}
                >
                  <Edit3 size={14} />
                </button>
                <button 
                  className="btn btn-danger btn-icon-only btn-sm"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${resume.title}"?`)) {
                      deleteResume(resume.id);
                    }
                  }}
                  title="Delete Resume"
                  style={{ width: '32px', height: '32px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

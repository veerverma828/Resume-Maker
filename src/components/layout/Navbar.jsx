import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sun, Moon, ArrowLeft, Save, FileDown, FileUp, Loader2, Sparkles } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView }) {
  const { 
    theme, 
    toggleTheme, 
    resumeTitle, 
    setResumeTitle, 
    saveResumeToServer, 
    isSaving,
    exportResume,
    importResume
  } = useResume();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(resumeTitle);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (tempTitle.trim()) {
      setResumeTitle(tempTitle.trim());
      saveResumeToServer(tempTitle.trim());
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importResume(event.target.result);
      if (success) {
        alert('Resume data imported successfully!');
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setCurrentView('editor');
          });
        } else {
          setCurrentView('editor');
        }
      } else {
        alert('Invalid backup file. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <nav className="glass-panel no-print" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      borderBottom: '1px solid var(--glass-border)',
      marginBottom: currentView === 'editor' ? 0 : '24px'
    }}>
      {/* Left side: Logo & Back action */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {currentView !== 'landing' && (
          <button 
            className="btn btn-secondary btn-icon-only"
            onClick={() => setCurrentView(currentView === 'editor' ? 'dashboard' : 'landing')}
            title="Back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            cursor: 'pointer',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-title)'
          }}
          className={currentView === 'editor' ? 'hidden-mobile' : ''}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <Sparkles size={16} />
          </div>
          <span 
            className="hidden-mobile"
            style={{
              background: 'linear-gradient(to right, var(--text-primary), var(--primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ResumeCraft
          </span>
        </div>
      </div>

      {/* Middle side: Editable Resume Title (when editing) */}
      {currentView === 'editor' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isEditingTitle ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
              autoFocus
              className="form-input navbar-title-input"
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                padding: '4px 10px',
                height: '32px',
                textAlign: 'center'
              }}
            />
          ) : (
            <h2
              onClick={() => {
                setTempTitle(resumeTitle);
                setIsEditingTitle(true);
              }}
              className="navbar-title"
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px dashed var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              title="Click to rename"
            >
              {resumeTitle}
            </h2>
          )}
        </div>
      )}

      {/* Right side: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {currentView === 'editor' && (
          <>
            <button 
              className="btn btn-secondary btn-sm btn-mobile-icon"
              onClick={() => saveResumeToServer()}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span className="hidden-mobile">Save Draft</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm btn-mobile-icon"
              onClick={exportResume}
              title="Export Resume JSON Backup"
            >
              <FileDown size={15} />
              <span className="hidden-mobile">Export JSON</span>
            </button>
          </>
        )}

        {currentView !== 'editor' && (
          <label className="btn btn-secondary btn-sm btn-mobile-icon" style={{ cursor: 'pointer', margin: 0 }}>
            <FileUp size={15} />
            <span className="hidden-mobile">Import JSON</span>
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImport} 
              style={{ display: 'none' }} 
            />
          </label>
        )}

        <button 
          className="btn btn-secondary btn-icon-only"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          style={{ transition: 'all 0.3s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(30deg) scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
}

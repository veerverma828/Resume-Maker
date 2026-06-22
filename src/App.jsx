import React, { useState, useEffect } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import Navbar from './components/layout/Navbar';
import LandingPage from './components/layout/LandingPage';
import Dashboard from './components/layout/Dashboard';
import EditorPanel from './components/editor/EditorPanel';
import StyleCustomizer from './components/editor/StyleCustomizer';
import AtsOptimizer from './components/editor/AtsOptimizer';
import PreviewPanel from './components/editor/PreviewPanel';
import { PenTool, Palette, ShieldAlert, Eye } from 'lucide-react';
import './App.css';

function MainApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [activeEditorTab, setActiveEditorTab] = useState('personalInfo');
  const [mobileActiveView, setMobileActiveView] = useState('editor'); // 'editor' | 'preview'
  
  // Left editor pane section selector: 'content' | 'style' | 'ats'
  const [leftPaneSection, setLeftPaneSection] = useState('content');
  const { atsScore } = useResume();

  const handleNavigate = (view) => {
    const base = import.meta.env.BASE_URL || '/';
    let path = base;
    if (view === 'dashboard') {
      path = `${base}dashboard`;
    } else if (view === 'editor') {
      path = `${base}editor`;
    }
    
    // Normalize duplicate slashes
    path = path.replace(/\/+/g, '/');

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentView(view);
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.endsWith('/dashboard') || path.endsWith('/dashboard/')) {
        setCurrentView('dashboard');
      } else if (path.endsWith('/editor') || path.endsWith('/editor/')) {
        setCurrentView('editor');
      } else {
        setCurrentView('landing');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setCurrentView={handleNavigate} />;
      case 'editor':
        return (
          <div className="app-layout" style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0
          }}>
            {/* Editor Workspace Split Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(350px, 45%) minmax(400px, 55%)',
              flex: 1,
              minHeight: 0,
              overflow: 'hidden'
            }} className={`editor-grid-responsive mobile-show-${mobileActiveView}`}>
              
              {/* Left Column: Form & Design inputs */}
              <div className="editor-column no-print" style={{
                borderRight: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 61px)', // Adjust height relative to navbar
                backgroundColor: 'var(--bg-card)'
              }}>
                {/* Secondary Sidebar Controls */}
                <div style={{
                  display: 'flex',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-app)',
                  padding: '8px 16px',
                  gap: '12px'
                }}>
                  {[
                    { id: 'content', name: 'Content Form', icon: <PenTool size={16} /> },
                    { id: 'style', name: 'Design & Style', icon: <Palette size={16} /> },
                    { id: 'ats', name: `ATS (${atsScore}%)`, icon: <ShieldAlert size={16} /> }
                  ].map(sec => (
                    <button
                      key={sec.id}
                      onClick={() => setLeftPaneSection(sec.id)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        padding: '6px 12px',
                        fontWeight: leftPaneSection === sec.id ? 700 : 500,
                        backgroundColor: leftPaneSection === sec.id ? 'var(--primary)' : 'transparent',
                        color: leftPaneSection === sec.id ? '#ffffff' : 'var(--text-secondary)',
                        borderColor: leftPaneSection === sec.id ? 'var(--primary)' : 'transparent',
                        boxShadow: leftPaneSection === sec.id ? 'var(--shadow-sm)' : 'none'
                      }}
                    >
                      {sec.icon}
                      <span className="hidden-mobile">{sec.name}</span>
                    </button>
                  ))}
                </div>

                {/* Sub Panel Scroll Area */}
                <div className="editor-subpanel">
                  {leftPaneSection === 'content' && (
                    <EditorPanel 
                      activeTab={activeEditorTab} 
                      setActiveTab={setActiveEditorTab} 
                    />
                  )}
                  {leftPaneSection === 'style' && <StyleCustomizer />}
                  {leftPaneSection === 'ats' && (
                    <AtsOptimizer setActiveTab={(tab) => {
                      setLeftPaneSection('content');
                      setActiveEditorTab(tab);
                    }} />
                  )}
                </div>
              </div>

              {/* Right Column: Live A4 preview compile frame */}
              <div className="preview-column" style={{
                height: 'calc(100vh - 61px)',
                overflowY: 'auto',
                padding: '24px',
                backgroundColor: 'var(--bg-app)'
              }}>
                <PreviewPanel />
              </div>

              {/* Floating Mobile Toggle Button */}
              <button 
                className="btn btn-primary mobile-toggle-btn"
                onClick={() => setMobileActiveView(mobileActiveView === 'editor' ? 'preview' : 'editor')}
              >
                {mobileActiveView === 'editor' ? (
                  <>
                    <Eye size={16} />
                    <span>View Preview</span>
                  </>
                ) : (
                  <>
                    <PenTool size={16} />
                    <span>Edit Resume</span>
                  </>
                )}
              </button>

            </div>
          </div>
        );
      case 'landing':
      default:
        return <LandingPage setCurrentView={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentView={currentView} setCurrentView={handleNavigate} />
      {renderView()}
    </div>
  );
}

export default function App() {
  return (
    <ResumeProvider>
      <MainApp />
    </ResumeProvider>
  );
}

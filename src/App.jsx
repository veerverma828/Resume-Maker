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
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setCurrentView(view);
        });
      } else {
        setCurrentView(view);
      }
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      let targetView = 'landing';
      if (path.endsWith('/dashboard') || path.endsWith('/dashboard/')) {
        targetView = 'dashboard';
      } else if (path.endsWith('/editor') || path.endsWith('/editor/')) {
        targetView = 'editor';
      }

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          setCurrentView(targetView);
        });
      } else {
        setCurrentView(targetView);
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
                {/* Secondary Sidebar Controls (Segmented Pill Layout) */}
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)'
                }}>
                  <div style={{
                    display: 'flex',
                    backgroundColor: 'var(--bg-app)',
                    padding: '4px',
                    borderRadius: '10px',
                    gap: '4px',
                    border: '1px solid var(--border-color)'
                  }}>
                    {[
                      { id: 'content', name: 'Content Form', icon: <PenTool size={15} /> },
                      { id: 'style', name: 'Design & Style', icon: <Palette size={15} /> },
                      { id: 'ats', name: `ATS (${atsScore}%)`, icon: <ShieldAlert size={15} /> }
                    ].map(sec => {
                      const isActive = leftPaneSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            if (document.startViewTransition) {
                              document.startViewTransition(() => {
                                setLeftPaneSection(sec.id);
                              });
                            } else {
                              setLeftPaneSection(sec.id);
                            }
                          }}
                          className="btn btn-sm"
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontWeight: isActive ? 600 : 500,
                            backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                            border: 'none',
                            boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          {sec.icon}
                          <span className="hidden-mobile">{sec.name}</span>
                        </button>
                      );
                    })}
                  </div>
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

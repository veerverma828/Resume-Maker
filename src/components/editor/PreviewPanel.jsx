import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ClassicBlue from '../templates/ClassicBlue';
import MinimalModern from '../templates/MinimalModern';
import CreativeSidebar from '../templates/CreativeSidebar';
import TechDeveloper from '../templates/TechDeveloper';
import { Printer, Download } from 'lucide-react';

export default function PreviewPanel() {
  const { resumeData, customization } = useResume();
  const { templateId } = customization;

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'minimal':
        return <MinimalModern data={resumeData} customization={customization} />;
      case 'sidebar':
        return <CreativeSidebar data={resumeData} customization={customization} />;
      case 'tech':
        return <TechDeveloper data={resumeData} customization={customization} />;
      case 'classic':
      default:
        return <ClassicBlue data={resumeData} customization={customization} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%'
    }}>
      {/* Live Preview Header Toolbar */}
      <div 
        className="glass-panel no-print" 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid var(--border-color)'
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Live Document Preview
        </span>
        <button 
          className="btn btn-primary btn-sm"
          onClick={handlePrint}
        >
          <Printer size={15} />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Render Template Frame */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflowY: 'auto',
          padding: '12px 0',
          backgroundColor: 'var(--bg-app)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{
          transform: 'scale(1)',
          transformOrigin: 'top center',
          width: '100%',
          maxWidth: '800px',
          // Mobile scaling adjustment if preview overflows
          '@media (maxWidth: 900px)': {
            transform: 'scale(0.85)'
          }
        }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}

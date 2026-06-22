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
    const resumeElement = document.querySelector('.resume-preview-container');
    if (!resumeElement) return;

    // Create a temporary hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.zIndex = '-1000';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();

    // Copy all style/stylesheet link tags from parent document
    let stylesHTML = '';
    const styleElements = document.querySelectorAll('style, link[rel="stylesheet"]');
    styleElements.forEach(el => {
      stylesHTML += el.outerHTML;
    });

    // Write HTML content into the iframe
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Resume</title>
          ${stylesHTML}
          <style>
            body {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
            }
            .resume-preview-container {
              width: 100% !important;
              max-width: 100% !important;
              height: auto !important;
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              display: block !important;
              transform: none !important; /* Disable any active mobile screen transforms */
            }
            @page {
              size: A4 portrait;
              margin: 0px;
            }
          </style>
        </head>
        <body>
          ${resumeElement.outerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.parent.postMessage('resume-printed', '*');
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Cleanup the iframe after printing is initiated
    const handleMessage = (event) => {
      if (event.data === 'resume-printed') {
        window.removeEventListener('message', handleMessage);
        document.body.removeChild(iframe);
      }
    };
    window.addEventListener('message', handleMessage);
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
          overflowX: 'hidden',
          padding: '12px 0',
          backgroundColor: 'var(--bg-app)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Overflow clip wrapper: keeps 800px A4 layout from pushing page width on mobile */}
        <div style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            transform: 'scale(1)',
            transformOrigin: 'top center',
            width: '100%',
            maxWidth: '800px'
          }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

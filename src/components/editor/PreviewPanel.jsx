import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import ClassicBlue from '../templates/ClassicBlue';
import MinimalModern from '../templates/MinimalModern';
import CreativeSidebar from '../templates/CreativeSidebar';
import TechDeveloper from '../templates/TechDeveloper';
import { Printer, Download, Sparkles } from 'lucide-react';
import { initialResumeData, initialCustomization } from '../../constants/defaultResumeData';

const RESUME_WIDTH = 800; // Fixed A4 width in px

export default function PreviewPanel() {
  const { resumeData, customization, setResumeData, setCustomization } = useResume();
  const { templateId } = customization;

  const handleLoadDemo = () => {
    if (window.confirm("This will overwrite your current draft with sample demo details. Are you sure you want to proceed?")) {
      setResumeData(initialResumeData);
      setCustomization(initialCustomization);
    }
  };
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Compute scale to fit resume within wrapper width
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const compute = () => {
      const containerWidth = el.offsetWidth;
      const newScale = Math.min(1, containerWidth / RESUME_WIDTH);
      setScale(newScale);
    };
    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    const resumeElement = document.querySelector('.resume-preview-container');
    if (!resumeElement) return;

    // Remove any existing print-iframe
    const existingIframe = document.getElementById('print-iframe');
    if (existingIframe) {
      existingIframe.remove();
    }

    // Create a temporary off-screen iframe WITH a fixed physical size of 800px x 1131px
    // This forces mobile browsers to render the document inside a standard A4-ratio desktop viewport.
    const iframe = document.createElement('iframe');
    iframe.id = 'print-iframe';
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.top = '-9999px';
    iframe.style.width = '800px';
    iframe.style.height = '1131px';
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
          <meta name="viewport" content="width=800, initial-scale=1.0">
          ${stylesHTML}
          <style>
            @page {
              size: A4 portrait;
              margin: 0px !important;
            }
            html, body {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 800px !important;
              min-width: 800px !important;
              max-width: 800px !important;
              height: auto !important;
              min-height: auto !important;
              overflow: visible !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .resume-preview-container {
              width: 800px !important;
              min-width: 800px !important;
              max-width: 800px !important;
              height: auto !important;
              min-height: auto !important;
              aspect-ratio: auto !important;
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              overflow: visible !important;
              transform: none !important; /* Disable any active mobile screen transforms */
            }
          </style>
        </head>
        <body>
          ${resumeElement.outerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.focus();
                window.print();
                window.parent.postMessage('resume-printed', '*');
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();

    // Cleanup the iframe after printing is completed or a safety timeout is reached
    let cleanupTimeout;
    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(cleanupTimeout);
      const el = document.getElementById('print-iframe');
      if (el) el.remove();
    };

    const handleMessage = (event) => {
      if (event.data === 'resume-printed') {
        cleanup();
      }
    };

    window.addEventListener('message', handleMessage);
    // Safety fallback: Clean up the iframe after 10 seconds to avoid memory leaks
    cleanupTimeout = setTimeout(cleanup, 10000);
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleLoadDemo}
            title="Load template with sample demo data"
          >
            <Sparkles size={15} />
            <span>Load Demo Data</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handlePrint}
          >
            <Printer size={15} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Render Template Frame */}
      <div 
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '12px 0',
          backgroundColor: 'var(--bg-app)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Outer clipping wrapper — measures available width and centers content */}
        <div
          ref={wrapperRef}
          style={{
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {/* Inner container: fixed at 800px, scaled down to fit, centered automatically */}
          <div style={{
            width: `${RESUME_WIDTH}px`,
            transformOrigin: 'top center',
            transform: `scale(${scale})`,
            // Collapse the empty space that remains after scaling
            marginBottom: `${-(RESUME_WIDTH * 1.414 * (1 - scale))}px`,
            flexShrink: 0
          }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

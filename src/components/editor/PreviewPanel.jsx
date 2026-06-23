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
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [actualHeight, setActualHeight] = useState(RESUME_WIDTH * 1.414);

  // Compute scale to fit resume within wrapper width and measure dynamic height
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const compute = () => {
      const containerWidth = wrapper.offsetWidth;
      const newScale = Math.min(1, containerWidth / RESUME_WIDTH);
      setScale(newScale);
      setActualHeight(inner.offsetHeight || (RESUME_WIDTH * 1.414));
    };

    compute();

    const observer = new ResizeObserver(compute);
    observer.observe(wrapper);
    observer.observe(inner);

    return () => observer.disconnect();
  }, [resumeData, customization]);

  const handlePrint = () => {
    const resumeElement = document.querySelector('.resume-preview-container');
    if (!resumeElement) return;

    // Copy all style/stylesheet link tags from parent document
    let stylesHTML = '';
    const styleElements = document.querySelectorAll('style, link[rel="stylesheet"]');
    styleElements.forEach(el => {
      stylesHTML += el.outerHTML;
    });

    // Open a new tab. Mobile browsers correctly respect the viewport meta tag
    // on a top-level page, unlike inside iframes where it is ignored.
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      // Popup was blocked — fall back to a simple window.print() as a last resort
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <!--
            width=800 tells mobile browsers to lay out the page as if the viewport
            is 800px wide, matching the fixed resume width so nothing is miniaturized.
          -->
          <meta name="viewport" content="width=800, initial-scale=1.0, shrink-to-fit=no">
          ${stylesHTML}
          <style>
            @page {
              size: A4 portrait;
              margin: 0mm;
            }
            html, body {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 800px !important;
              min-width: 800px !important;
              max-width: 800px !important;
              /* height: auto so the browser only prints as many pages as content needs */
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
              /* Override the default min-height so a short resume doesn't force a blank second page */
              height: auto !important;
              min-height: auto !important;
              aspect-ratio: auto !important;
              box-shadow: none !important;
              margin: 0 !important;
              border: none !important;
              overflow: visible !important;
              transform: none !important;
            }
          </style>
        </head>
        <body>
          ${resumeElement.outerHTML}
          <script>
            // Trigger print automatically once the page is fully loaded
            window.onload = function() {
              setTimeout(function() {
                window.focus();
                window.print();
                // Close the tab after the print dialog is dismissed
                window.onafterprint = function() {
                  window.close();
                };
              }, 400);
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
      {/* Live Preview Header Toolbar */}
      <div className="glass-panel preview-toolbar no-print">
        <span className="preview-toolbar-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Live Document Preview
        </span>
        <div className="preview-toolbar-actions">
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
          <div 
            ref={innerRef}
            style={{
              width: `${RESUME_WIDTH}px`,
              transformOrigin: 'top center',
              transform: `scale(${scale})`,
              // Collapse the empty space that remains after scaling
              marginBottom: `${-(actualHeight * (1 - scale))}px`,
              flexShrink: 0
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}

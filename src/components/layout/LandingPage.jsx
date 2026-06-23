import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, FileText, CheckCircle, Smartphone, Award, ExternalLink, ArrowRight } from 'lucide-react';

export default function LandingPage({ setCurrentView }) {
  const { createNewResume } = useResume();
  const [typedText, setTypedText] = useState('');
  const [loopIndex, setLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ['Professional Resumes', 'ATS-Optimized CVs', 'Career Break-Throughs'];
  const typingSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenWords = 2000;

  // Typewriter effect
  useEffect(() => {
    let timer;
    const currentWord = words[loopIndex % words.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setLoopIndex(loopIndex + 1);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopIndex]);

  const templatesList = [
    {
      id: 'classic',
      name: 'Classic Executive',
      desc: 'Traditional deep-blue balanced structure. The gold standard for business and finance positions.',
      color: '#2563eb',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="10" y="12" width="80" height="6" fill="#2563eb" rx="1" />
          <rect x="10" y="22" width="30" height="3" fill="#94a3b8" rx="0.5" />
          <line x1="10" y1="35" x2="90" y2="35" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="10" y="44" width="20" height="5" fill="#2563eb" rx="1" />
          <rect x="10" y="54" width="80" height="2" fill="#cbd5e1" rx="0.5" />
          <rect x="10" y="59" width="70" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="10" y="70" width="20" height="5" fill="#2563eb" rx="1" />
          <rect x="10" y="80" width="80" height="2" fill="#cbd5e1" rx="0.5" />
          <rect x="10" y="85" width="75" height="2" fill="#e2e8f0" rx="0.5" />
        </svg>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal Modern',
      desc: 'Clean single-column aesthetics with airy spacing. Best for consultants and creative roles.',
      color: '#0f172a',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="20" r="8" fill="#e2e8f0" />
          <rect x="30" y="32" width="40" height="4" fill="#0f172a" rx="1" />
          <rect x="40" y="40" width="20" height="2" fill="#94a3b8" rx="0.5" />
          <rect x="15" y="55" width="70" height="3" fill="#0f172a" rx="0.5" />
          <rect x="15" y="62" width="70" height="15" fill="#f8fafc" rx="1" />
          <rect x="15" y="85" width="70" height="3" fill="#0f172a" rx="0.5" />
          <rect x="15" y="92" width="70" height="15" fill="#f8fafc" rx="1" />
        </svg>
      )
    },
    {
      id: 'sidebar',
      name: 'Split Sidebar',
      desc: 'Eye-catching split screen with dark sidebar highlights. Perfect for standing out in design and marketing.',
      color: '#0d9488',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M 5,5 H 35 V 135 H 5 Z" fill="#0d9488" opacity="0.15" />
          <circle cx="20" cy="22" r="7" fill="#0d9488" />
          <rect x="10" y="36" width="20" height="3" fill="#0d9488" rx="0.5" />
          <rect x="10" y="44" width="15" height="2" fill="#94a3b8" rx="0.5" />
          <rect x="10" y="50" width="15" height="2" fill="#94a3b8" rx="0.5" />
          <rect x="42" y="15" width="45" height="6" fill="#0d9488" rx="1" />
          <rect x="42" y="26" width="30" height="3" fill="#cbd5e1" rx="0.5" />
          <rect x="42" y="42" width="45" height="20" fill="#f8fafc" rx="1" />
          <rect x="42" y="70" width="45" height="20" fill="#f8fafc" rx="1" />
        </svg>
      )
    },
    {
      id: 'tech',
      name: 'Tech Developer',
      desc: 'Engineered layout featuring code link placeholders and structured tag layout. Ideal for engineers.',
      color: '#4f46e5',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="10" y="12" width="50" height="6" fill="#4f46e5" rx="1" />
          <rect x="10" y="21" width="30" height="3" fill="#0d9488" rx="0.5" />
          <rect x="10" y="32" width="80" height="8" fill="#f1f5f9" rx="1" />
          <rect x="15" y="35" width="15" height="2" fill="#4f46e5" rx="0.5" />
          <rect x="35" y="35" width="20" height="2" fill="#94a3b8" rx="0.5" />
          <rect x="10" y="48" width="80" height="2" stroke="#e2e8f0" strokeDasharray="3,3" />
          <rect x="10" y="58" width="40" height="30" fill="#fafafa" rx="1" />
          <rect x="55" y="58" width="35" height="30" fill="#fafafa" rx="1" />
        </svg>
      )
    },
    {
      id: 'executive',
      name: 'Executive Dark',
      desc: 'Commanding dark-navy header with crisp white typography. Built for senior leadership and C-suite roles.',
      color: '#0f172a',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="5" y="5" width="90" height="36" rx="3" fill="#0f172a" />
          <rect x="10" y="13" width="45" height="5" fill="#ffffff" rx="1" opacity="0.9" />
          <rect x="10" y="22" width="28" height="3" fill="#60a5fa" rx="0.5" />
          <rect x="10" y="29" width="55" height="2" fill="#475569" rx="0.5" />
          <rect x="10" y="50" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="43" y="51" width="47" height="1" fill="#e2e8f0" rx="0.5" />
          <rect x="14" y="58" width="76" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="14" y="63" width="60" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="10" y="75" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="43" y="76" width="47" height="1" fill="#e2e8f0" rx="0.5" />
          <rect x="14" y="84" width="76" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="14" y="89" width="50" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="10" y="101" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="43" y="102" width="47" height="1" fill="#e2e8f0" rx="0.5" />
          <rect x="14" y="110" width="30" height="6" fill="#f1f5f9" rx="2" />
          <rect x="48" y="110" width="20" height="6" fill="#f1f5f9" rx="2" />
        </svg>
      )
    },
    {
      id: 'elegant',
      name: 'Elegant Serif',
      desc: 'Centered, symmetrical layout with decorative dividers and a circular avatar. Great for creatives and writers.',
      color: '#9333ea',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="18" r="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
          <rect x="25" y="30" width="50" height="5" fill="#0f172a" rx="1" />
          <rect x="33" y="39" width="34" height="3" fill="#9333ea" rx="0.5" />
          <line x1="15" y1="47" x2="42" y2="47" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="50" cy="47" r="2" fill="#9333ea" />
          <line x1="58" y1="47" x2="85" y2="47" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="20" y="53" width="60" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="30" y="63" width="40" height="3" fill="#0f172a" rx="1" />
          <line x1="15" y1="70" x2="85" y2="70" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="10" y="75" width="80" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="10" y="80" width="65" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="15" y="92" width="20" height="6" fill="#f3e8ff" rx="3" />
          <rect x="40" y="92" width="20" height="6" fill="#f3e8ff" rx="3" />
          <rect x="65" y="92" width="20" height="6" fill="#f3e8ff" rx="3" />
        </svg>
      )
    },
    {
      id: 'academic',
      name: 'Academic',
      desc: 'Scholarly left-border accent lines with structured sections. Crafted for researchers, academics, and grad students.',
      color: '#059669',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="10" y="12" width="48" height="5" fill="#0f172a" rx="1" />
          <rect x="10" y="20" width="30" height="3" fill="#059669" rx="0.5" />
          <line x1="10" y1="30" x2="90" y2="30" stroke="#e2e8f0" strokeWidth="1.5" />
          <rect x="10" y="38" width="3" height="18" fill="#059669" rx="1" />
          <rect x="17" y="40" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="17" y="47" width="65" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="17" y="52" width="55" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="10" y="64" width="3" height="18" fill="#059669" rx="1" />
          <rect x="17" y="66" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="17" y="73" width="65" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="17" y="78" width="50" height="2" fill="#f1f5f9" rx="0.5" />
          <rect x="10" y="90" width="3" height="18" fill="#059669" rx="1" />
          <rect x="17" y="92" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="17" y="99" width="22" height="5" fill="#d1fae5" rx="2" />
          <rect x="43" y="99" width="22" height="5" fill="#d1fae5" rx="2" />
          <rect x="69" y="99" width="15" height="5" fill="#d1fae5" rx="2" />
        </svg>
      )
    },
    {
      id: 'bold',
      name: 'Bold Impact',
      desc: 'Full-width vibrant header with card-style sections. Designed to make a memorable first impression.',
      color: '#e11d48',
      layoutIcon: (
        <svg viewBox="0 0 100 140" style={{ width: '100%', height: '100%', fill: 'none' }}>
          <rect x="5" y="5" width="90" height="130" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="5" y="5" width="90" height="40" rx="3" fill="#e11d48" />
          <circle cx="82" cy="10" r="14" fill="rgba(255,255,255,0.08)" />
          <circle cx="70" cy="30" r="10" fill="rgba(255,255,255,0.05)" />
          <rect x="12" y="14" width="48" height="6" fill="#ffffff" rx="1" opacity="0.95" />
          <rect x="12" y="24" width="32" height="3" fill="rgba(255,255,255,0.7)" rx="0.5" />
          <rect x="12" y="30" width="52" height="2" fill="rgba(255,255,255,0.4)" rx="0.5" />
          <rect x="10" y="53" width="80" height="18" fill="#f8fafc" rx="2" />
          <rect x="13" y="56" width="3" height="12" fill="#e11d48" rx="1" />
          <rect x="20" y="57" width="35" height="3" fill="#0f172a" rx="0.5" />
          <rect x="20" y="63" width="50" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="10" y="77" width="80" height="18" fill="#f8fafc" rx="2" />
          <rect x="13" y="80" width="3" height="12" fill="#e11d48" rx="1" />
          <rect x="20" y="81" width="30" height="3" fill="#0f172a" rx="0.5" />
          <rect x="20" y="87" width="50" height="2" fill="#e2e8f0" rx="0.5" />
          <rect x="10" y="103" width="24" height="6" fill="#ffe4e6" rx="3" />
          <rect x="38" y="103" width="24" height="6" fill="#ffe4e6" rx="3" />
          <rect x="66" y="103" width="24" height="6" fill="#ffe4e6" rx="3" />
        </svg>
      )
    }
  ];

  const handleSelectTemplate = (tempId) => {
    // Pass templateId directly into createNewResume to avoid a React batching race
    // condition where setCustomization(initialCustomization) from createNewResume could
    // overwrite the subsequent updateCustomization({ templateId }) call.
    createNewResume(tempId);
    setCurrentView('editor');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0 24px 60px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '80px 20px 60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '50px',
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--primary-light-border)',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={14} /> Built for Career Success
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          fontWeight: 850,
          maxWidth: '1100px',
          margin: 0
        }}>
          Craft the Perfect Resume for
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            minHeight: '1.25em',
            marginTop: '8px'
          }}>
            {typedText}
            {/* Blinking cursor */}
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '0.85em',
              backgroundColor: 'var(--primary)',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'pulse 1.2s infinite',
              WebkitTextFillColor: 'initial'
            }}></span>
            {/* Invisible ghost text matching the remainder of the word to hold spacing */}
            <span style={{ 
              opacity: 0, 
              userSelect: 'none', 
              pointerEvents: 'none',
              WebkitTextFillColor: 'initial'
            }}>
              {(words[loopIndex % words.length] || '').substring(typedText.length)}
            </span>
          </div>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          lineHeight: 1.6,
          margin: 0
        }}>
          Create ATS-optimized, high-impact resumes in minutes. Live side-by-side editing, premium print-ready templates, and instant PDF download.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentView('dashboard')}
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              const el = document.getElementById('templates-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            Explore Templates
          </button>
        </div>
      </section>

      {/* Feature Badges Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        margin: '20px 0 80px 0'
      }}>
        <div className="glass-panel card-hover" style={{ padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6',
            marginBottom: '16px'
          }}>
            <FileText size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>ATS-Friendly Scoring</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Our built-in scoring system scans your details, formatting, and action verbs to ensure your CV passes screening filters.
          </p>
        </div>

        <div className="glass-panel card-hover" style={{ padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981',
            marginBottom: '16px'
          }}>
            <CheckCircle size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Live Side-by-Side Editing</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Type your experience in the form and watch the final resume preview update instantly. No guessing, no formatting delays.
          </p>
        </div>

        <div className="glass-panel card-hover" style={{ padding: '24px', borderRadius: '16px', textAlign: 'left' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b',
            marginBottom: '16px'
          }}>
            <Award size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Pixel-Perfect PDF</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Engineered CSS print directives deliver perfectly aligned A4 pages when downloading, hiding editor controls completely.
          </p>
        </div>
      </section>

      {/* Templates Showcase Grid */}
      <section id="templates-section" style={{ padding: '40px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '12px' }}>Choose a Professional Template</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Pick from 8 meticulously crafted designs. Customize layout, colors, and margins in real-time.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px'
        }}>
          {templatesList.map((temp) => (
            <div
              key={temp.id}
              className="glass-panel card-hover"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => handleSelectTemplate(temp.id)}
            >
              {/* Template Preview Representation */}
              <div style={{
                height: '320px',
                backgroundColor: 'var(--bg-app)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  boxShadow: 'var(--shadow-md)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease'
                }}>
                  {temp.layoutIcon}
                </div>
              </div>

              {/* Template info */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{temp.name}</h3>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: temp.color
                  }}></div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4, flex: 1 }}>
                  {temp.desc}
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', marginTop: '12px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTemplate(temp.id);
                  }}
                >
                  Use Template <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

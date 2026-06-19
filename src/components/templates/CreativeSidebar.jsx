import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

export default function CreativeSidebar({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return { body: '0.8rem', h1: '1.6rem', h2: '1rem', h3: '0.85rem' };
    if (fontSize === 'lg') return { body: '0.94rem', h1: '2.1rem', h2: '1.3rem', h3: '1.05rem' };
    return { body: '0.86rem', h1: '1.85rem', h2: '1.15rem', h3: '0.95rem' }; // Medium default
  };

  const getPaddingStyle = () => {
    // Creative sidebar handles padding internally inside left/right divs, but we customize standard page heights
    if (margins === 'compact') return { left: '20px 16px', right: '24px 28px' };
    if (margins === 'loose') return { left: '36px 28px', right: '40px 48px' };
    return { left: '28px 20px', right: '32px 36px' }; // Normal default
  };

  const getSpacingStyle = () => {
    if (sectionSpacing === 'compact') return '10px';
    if (sectionSpacing === 'loose') return '24px';
    return '16px'; // Normal default
  };

  const size = getFontSizeClass();
  const padding = getPaddingStyle();
  const spacing = getSpacingStyle();

  return (
    <div 
      className="resume-preview-container" 
      style={{
        ...fontStyle,
        fontSize: size.body,
        lineHeight: 1.4,
        color: '#334155',
        display: 'grid',
        gridTemplateColumns: '1fr 1.8fr',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Left Sidebar (Theme Accent Background, Dark Text Styling) */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRight: '1px solid #e2e8f0',
        padding: padding.left,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        color: '#1e293b'
      }}>
        {/* Avatar */}
        {personalInfo.avatar ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <img 
              src={personalInfo.avatar} 
              alt="Avatar"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '12px',
                objectFit: 'cover',
                border: `3px solid ${themeColor}`,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }}
            />
          </div>
        ) : (
          <div style={{ height: '10px' }}></div>
        )}

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: themeColor,
            borderBottom: `1.5px solid ${themeColor}`,
            paddingBottom: '3px'
          }}>
            Contact Details
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.74rem', color: '#475569', overflowWrap: 'anywhere' }}>
            {personalInfo.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LinkIcon size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.website}
              </span>
            )}
            {personalInfo.linkedin && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Linkedin size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Github size={12} style={{ color: themeColor, flexShrink: 0 }} /> {personalInfo.github}
              </span>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: themeColor,
              borderBottom: `1.5px solid ${themeColor}`,
              paddingBottom: '3px'
            }}>
              Skills
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map(sk => (
                <span 
                  key={sk.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    color: '#334155',
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 500
                  }}
                >
                  {sk.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: themeColor,
              borderBottom: `1.5px solid ${themeColor}`,
              paddingBottom: '3px'
            }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.74rem', color: '#475569' }}>
              {languages.map(ln => (
                <div key={ln.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>{ln.name}</span>
                  <span>{ln.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {hobbies && hobbies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: themeColor,
              borderBottom: `1.5px solid ${themeColor}`,
              paddingBottom: '3px'
            }}>
              Hobbies
            </h3>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#475569', lineHeight: 1.4 }}>
              {hobbies.map(h => h.name).join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Right Column (Wider, Main Resume Content) */}
      <div style={{
        padding: padding.right,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing
      }}>
        {/* Name / Title */}
        <header>
          <h1 style={{
            fontSize: size.h1,
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 2px 0',
            letterSpacing: '-0.02em'
          }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p style={{
            fontSize: size.h2,
            color: themeColor,
            fontWeight: 600,
            margin: 0
          }}>
            {personalInfo.title || 'Professional Title'}
          </p>
        </header>

        {/* Summary Description */}
        {personalInfo.summary && (
          <section>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{
              fontSize: size.h3,
              fontWeight: 700,
              color: '#0f172a',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '2px',
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Professional Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                    <span>{exp.position}</span>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginBottom: '4px' }}>
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{
              fontSize: size.h3,
              fontWeight: 700,
              color: '#0f172a',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '2px',
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {education.map(edu => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                    <span>{edu.degree}</span>
                    <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginBottom: '2px' }}>
                    <span>{edu.school}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</span>
                    <span>{edu.location}</span>
                  </div>
                  {edu.description && (
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569' }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{
              fontSize: size.h3,
              fontWeight: 700,
              color: '#0f172a',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '2px',
              margin: '0 0 4px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Projects Showcase
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.84rem', color: '#0f172a' }}>
                    <span>{proj.name} {proj.role ? `| ${proj.role}` : ''}</span>
                    {proj.link && (
                      <span style={{ fontSize: '0.75rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <LinkIcon size={10} /> {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500, display: 'block', margin: '2px 0' }}>
                      Tech Stack: {proj.technologies}
                    </span>
                  )}
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
            {customSections.map(cs => (
              <section key={cs.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', pageBreakInside: 'avoid' }}>
                <h2 style={{
                  fontSize: size.h3,
                  fontWeight: 700,
                  color: '#0f172a',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '2px',
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {cs.title}
                </h2>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569', whiteSpace: 'pre-wrap' }}>{cs.content}</p>
              </section>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

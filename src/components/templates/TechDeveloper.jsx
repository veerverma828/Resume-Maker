import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin, Code as CodeIcon } from 'lucide-react';

export default function TechDeveloper({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return { body: '0.8rem', h1: '1.65rem', h2: '1.05rem', h3: '0.86rem' };
    if (fontSize === 'lg') return { body: '0.96rem', h1: '2.2rem', h2: '1.35rem', h3: '1.08rem' };
    return { body: '0.88rem', h1: '1.9rem', h2: '1.2rem', h3: '0.96rem' }; // Medium default
  };

  const getPaddingStyle = () => {
    if (margins === 'compact') return '20px 28px';
    if (margins === 'loose') return '44px 52px';
    return '32px 40px'; // Normal default
  };

  const getSpacingStyle = () => {
    if (sectionSpacing === 'compact') return '10px';
    if (sectionSpacing === 'loose') return '24px';
    return '16px'; // Normal default
  };

  const size = getFontSizeClass();

  // Group skills by category for organized tech CVs
  const skillsByCategory = skills.reduce((acc, curr) => {
    const cat = curr.category || 'Core Technologies';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(curr);
    return acc;
  }, {});

  return (
    <div 
      className="resume-preview-container" 
      style={{
        ...fontStyle,
        padding: getPaddingStyle(),
        fontSize: size.body,
        lineHeight: 1.4,
        color: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: getSpacingStyle(),
        backgroundColor: '#ffffff'
      }}
    >
      {/* Tech Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: `2px dashed ${themeColor}66`,
        paddingBottom: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{
              fontSize: size.h1,
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              margin: 0
            }}>
              {personalInfo.name || 'Your Name'}
            </h1>
            <CodeIcon size={20} style={{ color: themeColor, opacity: 0.7 }} />
          </div>
          <p style={{
            fontSize: size.h2,
            color: themeColor,
            fontWeight: 600,
            fontFamily: 'var(--font-mono), monospace',
            margin: '2px 0 8px 0'
          }}>
            &lt;{personalInfo.title || 'Software Engineer'} /&gt;
          </p>

          {/* Socials / Contacts in flex grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 12px',
            fontSize: '0.76rem',
            color: '#475569',
            fontFamily: 'var(--font-mono), monospace'
          }}>
            {personalInfo.email && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Mail size={11} style={{ color: themeColor }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Phone size={11} style={{ color: themeColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={11} style={{ color: themeColor }} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <LinkIcon size={11} style={{ color: themeColor }} /> {personalInfo.website}
              </span>
            )}
            {personalInfo.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Linkedin size={11} style={{ color: themeColor }} /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Github size={11} style={{ color: themeColor }} /> {personalInfo.github}
              </span>
            )}
          </div>
        </div>

        {/* Profile Avatar */}
        {personalInfo.avatar && (
          <img 
            src={personalInfo.avatar} 
            alt="Profile Avatar"
            style={{
              width: '75px',
              height: '75px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: `2px solid ${themeColor}`,
              marginLeft: '16px'
            }}
          />
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <p style={{ color: '#334155', fontSize: '0.84rem', margin: 0, lineHeight: 1.45 }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 4px 0',
            fontFamily: 'var(--font-mono), monospace'
          }}>
            // 01. WORK EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ 
                pageBreakInside: 'avoid', 
                borderLeft: `2px solid ${themeColor}40`, 
                paddingLeft: '10px',
                marginLeft: '2px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{exp.position}</span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono), monospace' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '2px' }}>
                  <span>{exp.company}</span>
                  <span style={{ fontStyle: 'italic' }}>{exp.location}</span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  whiteSpace: 'pre-wrap',
                  color: '#334155'
                }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 4px 0',
            fontFamily: 'var(--font-mono), monospace'
          }}>
            // 02. INDEPENDENT PROJECTS
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ 
                pageBreakInside: 'avoid',
                borderLeft: `2px solid ${themeColor}40`, 
                paddingLeft: '10px',
                marginLeft: '2px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{proj.name} {proj.role ? `(${proj.role})` : ''}</span>
                  {proj.link && (
                    <span style={{ fontSize: '0.74rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px', fontFamily: 'var(--font-mono), monospace' }}>
                      <LinkIcon size={10} /> {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500, display: 'block', fontFamily: 'var(--font-mono), monospace', margin: '1px 0' }}>
                    [tech-stack]: {proj.technologies}
                  </span>
                )}
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Grid - Broken by Categories */}
      {skills && skills.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '6px', pageBreakInside: 'avoid' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 4px 0',
            fontFamily: 'var(--font-mono), monospace'
          }}>
            // 03. TECHNICAL CAPABILITIES
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.keys(skillsByCategory).map(catName => (
              <div key={catName} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 700, color: themeColor, width: '120px', flexShrink: 0, textAlign: 'right', fontFamily: 'var(--font-mono), monospace' }}>
                  {catName}:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {skillsByCategory[catName].map(sk => (
                    <span 
                      key={sk.id}
                      style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontSize: '0.74rem',
                        color: '#334155',
                        fontWeight: 500
                      }}
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            color: '#0f172a',
            margin: '0 0 4px 0',
            fontFamily: 'var(--font-mono), monospace'
          }}>
            // 04. ACADEMIC EDUCATION
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{edu.degree}</span>
                  <span style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'var(--font-mono), monospace' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#475569' }}>
                  <span>{edu.school}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</span>
                  <span style={{ fontStyle: 'italic' }}>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacingStyle() }}>
          {customSections.map(cs => (
            <section key={cs.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', pageBreakInside: 'avoid' }}>
              <h2 style={{
                fontSize: size.h3,
                fontWeight: 700,
                color: '#0f172a',
                margin: '0 0 4px 0',
                fontFamily: 'var(--font-mono), monospace'
              }}>
                // [CUSTOM]: {cs.title.toUpperCase()}
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{cs.content}</p>
            </section>
          ))}
        </div>
      )}

      {/* Languages & Hobbies compact footer */}
      {(languages.length > 0 || hobbies.length > 0) && (
        <div style={{ 
          borderTop: '1px solid #e2e8f0', 
          paddingTop: '8px', 
          display: 'flex', 
          gap: '24px', 
          fontSize: '0.75rem', 
          color: '#475569',
          fontFamily: 'var(--font-mono), monospace',
          pageBreakInside: 'avoid'
        }}>
          {languages.length > 0 && (
            <div>
              <span style={{ fontWeight: 700, color: themeColor }}>[languages]:</span>{' '}
              {languages.map(ln => `${ln.name} (${ln.proficiency})`).join(', ')}
            </div>
          )}
          {hobbies.length > 0 && (
            <div>
              <span style={{ fontWeight: 700, color: themeColor }}>[interests]:</span>{' '}
              {hobbies.map(h => h.name).join(', ')}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

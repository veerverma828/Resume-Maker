import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

/**
 * Bold Impact Template
 * Full-width vibrant colored header block, strong typography.
 * Great for creatives, marketers, and designers.
 */
export default function BoldImpact({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSize = () => {
    if (fontSize === 'sm') return { body: '0.8rem', h1: '2.2rem', h2: '1rem', h3: '0.84rem' };
    if (fontSize === 'lg') return { body: '0.97rem', h1: '3rem', h2: '1.35rem', h3: '1.02rem' };
    return { body: '0.88rem', h1: '2.6rem', h2: '1.15rem', h3: '0.92rem' };
  };

  const getBodyPad = () => {
    if (margins === 'compact') return '20px 28px';
    if (margins === 'loose') return '36px 52px';
    return '28px 40px';
  };

  const getHeaderPad = () => {
    if (margins === 'compact') return '24px 28px';
    if (margins === 'loose') return '40px 52px';
    return '32px 40px';
  };

  const getSpacing = () => {
    if (sectionSpacing === 'compact') return '12px';
    if (sectionSpacing === 'loose') return '26px';
    return '18px';
  };

  const size = getFontSize();
  const spacing = getSpacing();

  const SectionHeading = ({ children }) => (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '4px',
        height: '20px',
        backgroundColor: themeColor,
        borderRadius: '2px',
        flexShrink: 0
      }} />
      <h2 style={{
        fontSize: size.h3,
        fontWeight: 800,
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        margin: 0
      }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: '1.5px', backgroundColor: '#f1f5f9' }} />
    </div>
  );

  return (
    <div
      className="resume-preview-container"
      style={{
        ...fontStyle,
        fontSize: size.body,
        lineHeight: 1.5,
        color: '#1e293b',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Bold full-width header */}
      <header style={{
        backgroundColor: themeColor,
        padding: getHeaderPad(),
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          right: '80px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
          {personalInfo.avatar && (
            <img
              src={personalInfo.avatar}
              alt="Profile"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.5)',
                flexShrink: 0
              }}
            />
          )}
          <div>
            <h1 style={{
              fontSize: size.h1,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 4px 0',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              textShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {personalInfo.name || 'Your Name'}
            </h1>
            <p style={{
              fontSize: size.h2,
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              margin: '0 0 14px 0',
              letterSpacing: '0.03em'
            }}>
              {personalInfo.title || 'Creative Professional'}
            </p>

            {/* Contact chips */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 14px',
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.8)'
            }}>
              {personalInfo.email && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={11} /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={11} /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={11} /> {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Linkedin size={11} /> {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Github size={11} /> {personalInfo.github}
                </span>
              )}
              {personalInfo.website && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LinkIcon size={11} /> {personalInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div style={{
        padding: getBodyPad(),
        display: 'flex',
        flexDirection: 'column',
        gap: spacing
      }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>About Me</SectionHeading>
            <p style={{
              margin: '0 0 0 14px',
              fontSize: '0.85rem',
              color: '#475569',
              lineHeight: 1.65
            }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Experience</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '14px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{
                  pageBreakInside: 'avoid',
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${themeColor}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{exp.position}</span>
                      {exp.company && (
                        <span style={{ color: themeColor, fontWeight: 600, fontSize: '0.84rem' }}> @ {exp.company}</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.73rem', color: '#94a3b8', flexShrink: 0 }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div style={{ fontSize: '0.77rem', color: '#64748b', fontStyle: 'italic', marginBottom: '4px' }}>
                      {exp.location}
                    </div>
                  )}
                  <p style={{ margin: 0, fontSize: '0.81rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Education</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '14px' }}>
              {education.map(edu => (
                <div key={edu.id} style={{
                  pageBreakInside: 'avoid',
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${themeColor}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>{edu.degree}</span>
                    <span style={{ fontSize: '0.73rem', color: '#94a3b8', flexShrink: 0 }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.79rem', color: '#64748b' }}>
                    {edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}{edu.location ? ` · ${edu.location}` : ''}
                  </div>
                  {edu.description && <p style={{ margin: '2px 0 0', fontSize: '0.77rem', color: '#475569' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Projects</SectionHeading>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              paddingLeft: '14px'
            }}>
              {projects.map(proj => (
                <div key={proj.id} style={{
                  pageBreakInside: 'avoid',
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  borderTop: `3px solid ${themeColor}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.86rem' }}>
                      {proj.name}{proj.role ? ` | ${proj.role}` : ''}
                    </span>
                    {proj.link && (
                      <span style={{ fontSize: '0.71rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                        <LinkIcon size={9} /> Link
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <span style={{ fontSize: '0.71rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>
                      {proj.technologies}
                    </span>
                  )}
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#475569' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && customSections.map(cs => (
          <section key={cs.id} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>{cs.title}</SectionHeading>
            <p style={{ margin: '0 0 0 14px', fontSize: '0.81rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{cs.content}</p>
          </section>
        ))}

        {/* Skills / Languages / Hobbies */}
        {(skills?.length > 0 || languages?.length > 0 || hobbies?.length > 0) && (
          <section style={{ pageBreakInside: 'avoid' }}>
            {skills && skills.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <SectionHeading>Skills</SectionHeading>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '14px' }}>
                  {skills.map(sk => (
                    <span key={sk.id} style={{
                      backgroundColor: `${themeColor}18`,
                      color: themeColor,
                      border: `1px solid ${themeColor}30`,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '0.74rem',
                      fontWeight: 600
                    }}>
                      {sk.name}{sk.level ? ` · ${sk.level}` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(languages?.length > 0 || hobbies?.length > 0) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingLeft: '14px' }}>
                {languages && languages.length > 0 && (
                  <div>
                    <SectionHeading>Languages</SectionHeading>
                    {languages.map(ln => (
                      <div key={ln.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px', paddingLeft: '14px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{ln.name}</span>
                        <span style={{ color: '#64748b' }}>{ln.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}
                {hobbies && hobbies.length > 0 && (
                  <div>
                    <SectionHeading>Interests</SectionHeading>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', paddingLeft: '14px' }}>
                      {hobbies.map(h => h.name).join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

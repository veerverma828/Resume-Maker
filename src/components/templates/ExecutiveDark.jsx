import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

export default function ExecutiveDark({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSize = () => {
    if (fontSize === 'sm') return { body: '0.81rem', h1: '1.9rem', h2: '1rem', h3: '0.82rem' };
    if (fontSize === 'lg') return { body: '0.97rem', h1: '2.5rem', h2: '1.3rem', h3: '1.0rem' };
    return { body: '0.89rem', h1: '2.2rem', h2: '1.15rem', h3: '0.91rem' };
  };

  const getPadding = () => {
    if (margins === 'compact') return { header: '24px 32px', body: '20px 32px' };
    if (margins === 'loose') return { header: '44px 56px', body: '36px 56px' };
    return { header: '32px 44px', body: '28px 44px' };
  };

  const getSpacing = () => {
    if (sectionSpacing === 'compact') return '12px';
    if (sectionSpacing === 'loose') return '26px';
    return '18px';
  };

  const size = getFontSize();
  const pad = getPadding();
  const spacing = getSpacing();

  // Darken the theme color for the header
  const headerBg = '#0f172a';

  const SectionHeading = ({ children }) => (
    <h2 style={{
      fontSize: size.h3,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: themeColor,
      margin: '0 0 8px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{
        display: 'inline-block',
        width: '18px',
        height: '2px',
        backgroundColor: themeColor,
        borderRadius: '1px',
        flexShrink: 0
      }} />
      {children}
      <span style={{
        flex: 1,
        height: '1px',
        backgroundColor: '#e2e8f0',
        display: 'inline-block'
      }} />
    </h2>
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
      {/* Dark Executive Header */}
      <header style={{
        backgroundColor: headerBg,
        padding: pad.header,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: size.h1,
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p style={{
            fontSize: size.h2,
            color: themeColor,
            fontWeight: 600,
            margin: '0 0 16px 0',
            letterSpacing: '0.02em'
          }}>
            {personalInfo.title || 'Executive Title'}
          </p>
          {/* Contact row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px 20px',
            fontSize: '0.76rem',
            color: '#94a3b8'
          }}>
            {personalInfo.email && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={11} style={{ color: themeColor }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={11} style={{ color: themeColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={11} style={{ color: themeColor }} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Linkedin size={11} style={{ color: themeColor }} /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Github size={11} style={{ color: themeColor }} /> {personalInfo.github}
              </span>
            )}
            {personalInfo.website && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <LinkIcon size={11} style={{ color: themeColor }} /> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
        {personalInfo.avatar && (
          <img
            src={personalInfo.avatar}
            alt="Profile"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: `2.5px solid ${themeColor}`,
              flexShrink: 0
            }}
          />
        )}
      </header>

      {/* Body */}
      <div style={{
        padding: pad.body,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing
      }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Professional Summary</SectionHeading>
            <p style={{
              margin: 0,
              fontSize: '0.86rem',
              color: '#334155',
              lineHeight: 1.6,
              paddingLeft: '26px'
            }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Professional Experience</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '26px' }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{exp.position}</span>
                      {exp.company && (
                        <span style={{ color: themeColor, fontWeight: 600, fontSize: '0.84rem' }}> · {exp.company}</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && (
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px', fontStyle: 'italic' }}>
                      {exp.location}
                    </div>
                  )}
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '26px' }}>
              {education.map(edu => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{edu.degree}</span>
                      {edu.school && (
                        <span style={{ color: '#475569', fontSize: '0.83rem' }}> — {edu.school}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {edu.location && <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>{edu.location}</div>}
                  {edu.description && <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#475569' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>Key Projects</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '26px' }}>
              {projects.map(proj => (
                <div key={proj.id} style={{ pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.89rem' }}>
                      {proj.name}{proj.role ? ` | ${proj.role}` : ''}
                    </span>
                    {proj.link && (
                      <span style={{ fontSize: '0.74rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                        <LinkIcon size={10} /> {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', margin: '1px 0' }}>
                      {proj.technologies}
                    </span>
                  )}
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155' }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections && customSections.length > 0 && customSections.map(cs => (
          <section key={cs.id} style={{ pageBreakInside: 'avoid' }}>
            <SectionHeading>{cs.title}</SectionHeading>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', whiteSpace: 'pre-wrap', paddingLeft: '26px' }}>{cs.content}</p>
          </section>
        ))}

        {/* Skills / Languages / Hobbies */}
        {(skills?.length > 0 || languages?.length > 0 || hobbies?.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: skills?.length > 0 ? '2fr 1fr' : '1fr', gap: '20px', pageBreakInside: 'avoid' }}>
            {skills && skills.length > 0 && (
              <div>
                <SectionHeading>Core Competencies</SectionHeading>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingLeft: '26px' }}>
                  {skills.map(sk => (
                    <span key={sk.id} style={{
                      backgroundColor: '#f1f5f9',
                      border: `1px solid #e2e8f0`,
                      color: '#1e293b',
                      padding: '3px 10px',
                      borderRadius: '3px',
                      fontSize: '0.75rem',
                      fontWeight: 500
                    }}>
                      {sk.name}{sk.level ? ` (${sk.level})` : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {languages && languages.length > 0 && (
                <div>
                  <SectionHeading>Languages</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '0.78rem', paddingLeft: '26px' }}>
                    {languages.map(ln => (
                      <div key={ln.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>{ln.name}</span>
                        <span style={{ color: '#64748b' }}>{ln.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {hobbies && hobbies.length > 0 && (
                <div>
                  <SectionHeading>Interests</SectionHeading>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569', paddingLeft: '26px' }}>
                    {hobbies.map(h => h.name).join(' · ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

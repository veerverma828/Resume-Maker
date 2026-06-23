import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

/**
 * Academic Template
 * Clean, scholarly design with left-border accent lines for sections.
 * Ideal for researchers, academics, and graduate students.
 */
export default function Academic({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSize = () => {
    if (fontSize === 'sm') return { body: '0.79rem', h1: '1.7rem', h2: '0.96rem', h3: '0.82rem' };
    if (fontSize === 'lg') return { body: '0.95rem', h1: '2.3rem', h2: '1.2rem', h3: '1.0rem' };
    return { body: '0.86rem', h1: '2.0rem', h2: '1.07rem', h3: '0.9rem' };
  };

  const getPadding = () => {
    if (margins === 'compact') return '22px 28px';
    if (margins === 'loose') return '44px 52px';
    return '32px 42px';
  };

  const getSpacing = () => {
    if (sectionSpacing === 'compact') return '12px';
    if (sectionSpacing === 'loose') return '26px';
    return '18px';
  };

  const size = getFontSize();

  const SectionHeading = ({ children }) => (
    <h2 style={{
      fontSize: size.h3,
      fontWeight: 700,
      color: '#0f172a',
      margin: '0 0 10px 0',
      paddingLeft: '12px',
      borderLeft: `3px solid ${themeColor}`,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      lineHeight: 1.3
    }}>
      {children}
    </h2>
  );

  return (
    <div
      className="resume-preview-container"
      style={{
        ...fontStyle,
        fontSize: size.body,
        lineHeight: 1.5,
        color: '#334155',
        backgroundColor: '#ffffff',
        padding: getPadding(),
        display: 'flex',
        flexDirection: 'column',
        gap: getSpacing()
      }}
    >
      {/* Header */}
      <header style={{
        borderBottom: `2px solid #e2e8f0`,
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
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
              margin: '0 0 10px 0'
            }}>
              {personalInfo.title || 'Researcher / Academic'}
            </p>
          </div>
          {personalInfo.avatar && (
            <img
              src={personalInfo.avatar}
              alt="Profile"
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '4px',
                objectFit: 'cover',
                border: `2px solid ${themeColor}`
              }}
            />
          )}
        </div>

        {/* Contact info in one line */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px 18px',
          fontSize: '0.75rem',
          color: '#475569'
        }}>
          {personalInfo.email && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={11} style={{ color: themeColor }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={11} style={{ color: themeColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={11} style={{ color: themeColor }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <LinkIcon size={11} style={{ color: themeColor }} /> {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Linkedin size={11} style={{ color: themeColor }} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Github size={11} style={{ color: themeColor }} /> {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary / Research Statement */}
      {personalInfo.summary && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Research Statement</SectionHeading>
          <p style={{
            margin: 0,
            fontSize: '0.84rem',
            color: '#334155',
            lineHeight: 1.65,
            borderLeft: `3px solid #e2e8f0`,
            paddingLeft: '12px'
          }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Education — given prominence in academic template */}
      {education && education.length > 0 && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Education</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '12px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{
                pageBreakInside: 'avoid',
                borderLeft: `2px solid #e2e8f0`,
                paddingLeft: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{edu.degree}</span>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0, marginLeft: '8px' }}>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '2px' }}>
                  {edu.school}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}{edu.location ? ` · ${edu.location}` : ''}
                </div>
                {edu.description && <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Experience</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '12px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{
                pageBreakInside: 'avoid',
                borderLeft: `2px solid #e2e8f0`,
                paddingLeft: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{exp.position}</span>
                    {exp.company && (
                      <span style={{ color: themeColor, fontWeight: 600 }}>, {exp.company}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0, marginLeft: '8px' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && (
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginBottom: '3px' }}>{exp.location}</div>
                )}
                <p style={{ margin: 0, fontSize: '0.81rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications / Projects */}
      {projects && projects.length > 0 && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Publications & Projects</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '12px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{
                pageBreakInside: 'avoid',
                borderLeft: `2px solid #e2e8f0`,
                paddingLeft: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                    {proj.name}{proj.role ? ` (${proj.role})` : ''}
                  </span>
                  {proj.link && (
                    <span style={{ fontSize: '0.73rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                      <LinkIcon size={10} /> {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontStyle: 'italic', marginBottom: '2px' }}>
                    {proj.technologies}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: '0.79rem', color: '#475569' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map(cs => (
        <section key={cs.id} style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>{cs.title}</SectionHeading>
          <p style={{ margin: 0, fontSize: '0.81rem', color: '#334155', whiteSpace: 'pre-wrap', paddingLeft: '24px' }}>{cs.content}</p>
        </section>
      ))}

      {/* Skills / Languages / Hobbies */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', pageBreakInside: 'avoid' }}>
        {skills && skills.length > 0 && (
          <div>
            <SectionHeading>Technical Skills</SectionHeading>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingLeft: '12px' }}>
              {skills.map(sk => (
                <span key={sk.id} style={{
                  backgroundColor: `${themeColor}15`,
                  border: `1px solid ${themeColor}40`,
                  color: '#1e293b',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  fontSize: '0.73rem',
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
              <div style={{ paddingLeft: '12px' }}>
                {languages.map(ln => (
                  <div key={ln.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
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
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569', paddingLeft: '12px' }}>
                {hobbies.map(h => h.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

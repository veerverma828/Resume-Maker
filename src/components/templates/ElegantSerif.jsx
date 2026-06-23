import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

export default function ElegantSerif({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSize = () => {
    if (fontSize === 'sm') return { body: '0.8rem', h1: '2rem', h2: '0.95rem', h3: '0.83rem' };
    if (fontSize === 'lg') return { body: '0.96rem', h1: '2.7rem', h2: '1.2rem', h3: '1rem' };
    return { body: '0.88rem', h1: '2.35rem', h2: '1.05rem', h3: '0.9rem' };
  };

  const getPadding = () => {
    if (margins === 'compact') return '20px 28px';
    if (margins === 'loose') return '44px 56px';
    return '32px 44px';
  };

  const getSpacing = () => {
    if (sectionSpacing === 'compact') return '10px';
    if (sectionSpacing === 'loose') return '22px';
    return '15px';
  };

  const size = getFontSize();
  const spacing = getSpacing();

  const Divider = ({ style = {} }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '0 auto',
      ...style
    }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#cbd5e1' }} />
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: themeColor,
        flexShrink: 0
      }} />
      <div style={{ flex: 1, height: '1px', backgroundColor: '#cbd5e1' }} />
    </div>
  );

  const SectionHeading = ({ children }) => (
    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
      <h2 style={{
        fontSize: size.h3,
        fontWeight: 700,
        color: '#1e293b',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        margin: '0 0 6px 0'
      }}>
        {children}
      </h2>
      <Divider />
    </div>
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
        gap: spacing
      }}
    >
      {/* Centered Header */}
      <header style={{ textAlign: 'center', paddingBottom: '16px' }}>
        {personalInfo.avatar && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img
              src={personalInfo.avatar}
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `3px solid ${themeColor}`
              }}
            />
          </div>
        )}
        <h1 style={{
          fontSize: size.h1,
          fontWeight: 800,
          color: '#0f172a',
          margin: '0 0 4px 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <p style={{
          fontSize: size.h2,
          color: themeColor,
          fontWeight: 600,
          margin: '0 0 12px 0',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          {personalInfo.title || 'Professional Title'}
        </p>

        {/* Contact row – inline centered */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 16px',
          fontSize: '0.76rem',
          color: '#64748b'
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
          {personalInfo.website && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <LinkIcon size={11} style={{ color: themeColor }} /> {personalInfo.website}
            </span>
          )}
        </div>
        <div style={{ marginTop: '16px' }}>
          <Divider />
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Profile</SectionHeading>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: '#475569',
            lineHeight: 1.65,
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Experience</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: `1px dotted #cbd5e1`,
                  paddingBottom: '3px',
                  marginBottom: '4px'
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.91rem' }}>{exp.position}</span>
                    {exp.company && (
                      <span style={{ color: themeColor, fontSize: '0.84rem', fontWeight: 600 }}> · {exp.company}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0 }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pageBreakInside: 'avoid' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.89rem' }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                    {edu.school}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}{edu.location ? ` · ${edu.location}` : ''}
                  </div>
                  {edu.description && <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#475569' }}>{edu.description}</p>}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic', flexShrink: 0, marginLeft: '8px' }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>Projects</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                    {proj.name}{proj.role ? ` | ${proj.role}` : ''}
                  </span>
                  {proj.link && (
                    <span style={{ fontSize: '0.73rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                      <LinkIcon size={10} /> {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: '0.74rem', color: '#64748b', fontStyle: 'italic', margin: '1px 0' }}>
                    {proj.technologies}
                  </div>
                )}
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map(cs => (
        <section key={cs.id} style={{ pageBreakInside: 'avoid' }}>
          <SectionHeading>{cs.title}</SectionHeading>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', whiteSpace: 'pre-wrap', textAlign: 'center' }}>{cs.content}</p>
        </section>
      ))}

      {/* Skills / Languages / Hobbies */}
      {(skills?.length > 0 || languages?.length > 0 || hobbies?.length > 0) && (
        <section style={{ pageBreakInside: 'avoid' }}>
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: languages?.length > 0 || hobbies?.length > 0 ? '14px' : 0 }}>
              <SectionHeading>Skills</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px' }}>
                {skills.map(sk => (
                  <span key={sk.id} style={{
                    border: `1px solid ${themeColor}`,
                    color: themeColor,
                    padding: '2px 10px',
                    borderRadius: '20px',
                    fontSize: '0.74rem',
                    fontWeight: 500
                  }}>
                    {sk.name}{sk.level ? ` · ${sk.level}` : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
          {(languages?.length > 0 || hobbies?.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
              {languages && languages.length > 0 && (
                <div>
                  <SectionHeading>Languages</SectionHeading>
                  {languages.map(ln => (
                    <div key={ln.id} style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', marginBottom: '3px' }}>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{ln.name}</span>
                      <span style={{ color: '#94a3b8' }}>·</span>
                      <span style={{ color: '#64748b' }}>{ln.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}
              {hobbies && hobbies.length > 0 && (
                <div>
                  <SectionHeading>Interests</SectionHeading>
                  <p style={{ textAlign: 'center', margin: 0, fontSize: '0.76rem', color: '#64748b' }}>
                    {hobbies.map(h => h.name).join(' · ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

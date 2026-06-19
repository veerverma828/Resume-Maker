import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

export default function MinimalModern({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return { body: '0.8rem', h1: '1.7rem', h2: '1.05rem', h3: '0.85rem' };
    if (fontSize === 'lg') return { body: '0.96rem', h1: '2.3rem', h2: '1.35rem', h3: '1.05rem' };
    return { body: '0.88rem', h1: '2rem', h2: '1.2rem', h3: '0.95rem' }; // Medium default
  };

  const getPaddingStyle = () => {
    if (margins === 'compact') return '24px 32px';
    if (margins === 'loose') return '48px 56px';
    return '36px 44px'; // Normal default
  };

  const getSpacingStyle = () => {
    if (sectionSpacing === 'compact') return '12px';
    if (sectionSpacing === 'loose') return '26px';
    return '18px'; // Normal default
  };

  const size = getFontSizeClass();

  return (
    <div 
      className="resume-preview-container" 
      style={{
        ...fontStyle,
        padding: getPaddingStyle(),
        fontSize: size.body,
        lineHeight: 1.45,
        color: '#2d3748',
        display: 'flex',
        flexDirection: 'column',
        gap: getSpacingStyle(),
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header Info Centered */}
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '10px'
      }}>
        {personalInfo.avatar && (
          <img 
            src={personalInfo.avatar} 
            alt="Avatar"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `1.5px solid ${themeColor}`,
              marginBottom: '12px'
            }}
          />
        )}
        <h1 style={{
          fontSize: size.h1,
          fontWeight: 650,
          color: '#1a202c',
          letterSpacing: '-0.02em',
          margin: '0 0 2px 0'
        }}>
          {personalInfo.name || 'Your Name'}
        </h1>
        <p style={{
          fontSize: size.h2,
          color: themeColor,
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: '0 0 12px 0'
        }}>
          {personalInfo.title || 'Professional Subtitle'}
        </p>

        {/* Contact Links Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px 14px',
          fontSize: '0.78rem',
          color: '#718096'
        }}>
          {personalInfo.email && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Mail size={11} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Phone size={11} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <MapPin size={11} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <LinkIcon size={11} /> {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Linkedin size={11} /> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Github size={11} /> {personalInfo.github}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <p style={{ color: '#4a5568', fontSize: '0.84rem', margin: 0, textAlign: 'justify' }}>
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
            color: '#1a202c',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', margin: 0 }}>
                    {exp.position} <span style={{ fontWeight: 400, color: '#718096' }}>at {exp.company}</span>
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a0aec0', fontStyle: 'italic', marginBottom: '4px' }}>
                  {exp.location}
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#4a5568', whiteSpace: 'pre-wrap' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            color: '#1a202c',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', margin: 0 }}>
                    {edu.degree} <span style={{ fontWeight: 400, color: '#718096' }}>from {edu.school}</span>
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#718096' }}>
                  {edu.location} {edu.gpa ? `| GPA: ${edu.gpa}` : ''}
                </div>
                {edu.description && (
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#4a5568' }}>{edu.description}</p>
                )}
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
            color: '#1a202c',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1a202c', margin: 0 }}>
                    {proj.name} {proj.role ? `(${proj.role})` : ''}
                  </h3>
                  {proj.link && (
                    <span style={{ fontSize: '0.75rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <LinkIcon size={10} /> {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <span style={{ fontSize: '0.74rem', color: '#718096', display: 'block', margin: '2px 0' }}>
                    Tech Stack: {proj.technologies}
                  </span>
                )}
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#4a5568' }}>{proj.description}</p>
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
                color: '#1a202c',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px',
                margin: '0 0 6px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {cs.title}
              </h2>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#4a5568', whiteSpace: 'pre-wrap' }}>{cs.content}</p>
            </section>
          ))}
        </div>
      )}

      {/* Skills / Languages / Hobbies Flex Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginTop: '4px',
        pageBreakInside: 'avoid'
      }}>
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 style={{
              fontSize: size.h3,
              fontWeight: 700,
              color: '#1a202c',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '2px',
              margin: '0 0 6px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Skills
            </h2>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#4a5568', lineHeight: 1.5 }}>
              {skills.map(sk => `${sk.name} (${sk.level || 'Intermediate'})`).join(', ')}
            </p>
          </div>
        )}

        {/* Languages & Hobbies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {languages && languages.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#1a202c',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px',
                margin: '0 0 4px 0',
                textTransform: 'uppercase'
              }}>
                Languages
              </h3>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#4a5568' }}>
                {languages.map(ln => `${ln.name} (${ln.proficiency})`).join(', ')}
              </p>
            </div>
          )}

          {hobbies && hobbies.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#1a202c',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px',
                margin: '0 0 4px 0',
                textTransform: 'uppercase'
              }}>
                Interests
              </h3>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#4a5568' }}>
                {hobbies.map(h => h.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

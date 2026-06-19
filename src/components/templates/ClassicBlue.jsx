import React from 'react';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

export default function ClassicBlue({ data, customization }) {
  const { personalInfo, education, experience, projects, skills, languages, hobbies, customSections } = data;
  const { themeColor, fontFamily, fontSize, margins, sectionSpacing } = customization;

  // Custom typography setup
  const fontStyle = {
    fontFamily: `var(--font-${fontFamily.toLowerCase().replace(/\s+/g, '')}, ${fontFamily}), sans-serif`
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return { body: '0.82rem', h1: '1.8rem', h2: '1.1rem', h3: '0.9rem' };
    if (fontSize === 'lg') return { body: '0.98rem', h1: '2.4rem', h2: '1.4rem', h3: '1.1rem' };
    return { body: '0.9rem', h1: '2.1rem', h2: '1.25rem', h3: '1rem' }; // Medium default
  };

  const getPaddingStyle = () => {
    if (margins === 'compact') return '24px 32px';
    if (margins === 'loose') return '48px 56px';
    return '36px 44px'; // Normal default
  };

  const getSpacingStyle = () => {
    if (sectionSpacing === 'compact') return '10px';
    if (sectionSpacing === 'loose') return '24px';
    return '16px'; // Normal default
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
        color: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: getSpacingStyle(),
        backgroundColor: '#ffffff'
      }}
    >
      {/* Header Info */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2.5px solid ${themeColor}`,
        paddingBottom: '14px'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: size.h1,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 4px 0'
          }}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p style={{
            fontSize: size.h2,
            color: themeColor,
            fontWeight: 600,
            margin: '0 0 10px 0'
          }}>
            {personalInfo.title || 'Professional Subtitle'}
          </p>

          {/* Socials / Contacts */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px 16px',
            fontSize: '0.78rem',
            color: '#475569'
          }}>
            {personalInfo.email && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={12} style={{ color: themeColor }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={12} style={{ color: themeColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} style={{ color: themeColor }} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <LinkIcon size={12} style={{ color: themeColor }} /> {personalInfo.website}
              </span>
            )}
            {personalInfo.linkedin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Linkedin size={12} style={{ color: themeColor }} /> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Github size={12} style={{ color: themeColor }} /> {personalInfo.github}
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
              width: '85px',
              height: '85px',
              borderRadius: '6px',
              objectFit: 'cover',
              border: `2px solid ${themeColor}`,
              marginLeft: '20px'
            }}
          />
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ pageBreakInside: 'avoid' }}>
          <p style={{ fontStyle: 'italic', color: '#334155', fontSize: '0.88rem', margin: 0 }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: themeColor,
            margin: '0 0 4px 0',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px'
          }}>
            Work Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{exp.position}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#475569', marginBottom: '4px' }}>
                  <span>{exp.company}</span>
                  <span style={{ fontStyle: 'italic' }}>{exp.location}</span>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.82rem',
                  whiteSpace: 'pre-wrap',
                  color: '#334155',
                  paddingLeft: '6px'
                }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: themeColor,
            margin: '0 0 4px 0',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px'
          }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{edu.degree}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#475569', marginBottom: '2px' }}>
                  <span>{edu.school}{edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</span>
                  <span style={{ fontStyle: 'italic' }}>{edu.location}</span>
                </div>
                {edu.description && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#475569' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{
            fontSize: size.h3,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: themeColor,
            margin: '0 0 4px 0',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '2px'
          }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#0f172a' }}>
                  <span>{proj.name} {proj.role ? `| ${proj.role}` : ''}</span>
                  {proj.link && (
                    <span style={{ fontSize: '0.78rem', color: themeColor, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <LinkIcon size={10} /> {proj.link}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, display: 'block', margin: '1px 0' }}>
                    Technologies: {proj.technologies}
                  </span>
                )}
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacingStyle() }}>
          {customSections.map(cs => (
            <section key={cs.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', pageBreakInside: 'avoid' }}>
              <h2 style={{
                fontSize: size.h3,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: themeColor,
                margin: '0 0 4px 0',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px'
              }}>
                {cs.title}
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#334155', whiteSpace: 'pre-wrap' }}>{cs.content}</p>
            </section>
          ))}
        </div>
      )}

      {/* Skills / Languages / Hobbies Flex Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginTop: '4px',
        pageBreakInside: 'avoid'
      }}>
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 style={{
              fontSize: size.h3,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: themeColor,
              margin: '0 0 8px 0',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '2px'
            }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map(sk => (
                <span 
                  key={sk.id}
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    border: '1px solid #e2e8f0'
                  }}
                >
                  {sk.name} {sk.level ? `(${sk.level})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages & Hobbies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {languages && languages.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: themeColor,
                margin: '0 0 4px 0',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px'
              }}>
                Languages
              </h3>
              <div style={{ fontSize: '0.78rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {languages.map(ln => (
                  <div key={ln.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{ln.name}</span>
                    <span style={{ color: '#64748b' }}>{ln.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hobbies && hobbies.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: themeColor,
                margin: '0 0 4px 0',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '2px'
              }}>
                Hobbies
              </h3>
              <p style={{ margin: 0, fontSize: '0.76rem', color: '#475569' }}>
                {hobbies.map(h => h.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

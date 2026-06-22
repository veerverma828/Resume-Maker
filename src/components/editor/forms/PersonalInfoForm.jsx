import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Image } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={resumeData.personalInfo.name}
              onChange={(e) => updatePersonalInfo({ name: e.target.value })}
              className="form-input"
              placeholder="e.g. Alex Morgan"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Subtitle</label>
            <input
              type="text"
              value={resumeData.personalInfo.title}
              onChange={(e) => updatePersonalInfo({ title: e.target.value })}
              className="form-input"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
        </div>

        {/* Photo Upload Section */}
        <div style={{
          width: '150px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <label className="form-label">Profile Image</label>
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {resumeData.personalInfo.avatar ? (
              <img 
                src={resumeData.personalInfo.avatar} 
                alt="Avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <Image size={28} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', margin: 0, fontSize: '0.75rem', padding: '4px 10px' }}>
            Upload Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              style={{ display: 'none' }} 
            />
          </label>
          {resumeData.personalInfo.avatar && (
            <button 
              className="btn btn-danger btn-sm"
              onClick={() => updatePersonalInfo({ avatar: '' })}
              style={{ fontSize: '0.7rem', padding: '2px 8px' }}
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            className="form-input"
            placeholder="alex@tech.dev"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            className="form-input"
            placeholder="(555) 019-2834"
          />
        </div>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label className="form-label">Location (City, State)</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            className="form-input"
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website / Portfolio</label>
          <input
            type="text"
            value={resumeData.personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            className="form-input"
            placeholder="alexmorgan.dev"
          />
        </div>
      </div>

      <div className="form-grid-2col">
        <div className="form-group">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="text"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            className="form-input"
            placeholder="linkedin.com/in/alexmorgan"
          />
        </div>
        <div className="form-group">
          <label className="form-label">GitHub Profile</label>
          <input
            type="text"
            value={resumeData.personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            className="form-input"
            placeholder="github.com/alexmorgan"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          value={resumeData.personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          className="form-textarea"
          placeholder="Brief summary of your professional expertise, achievements, and career focus..."
        />
      </div>
    </div>
  );
}

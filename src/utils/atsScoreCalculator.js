export function calculateAtsScore(resumeData) {
  let score = 0;
  const feedback = [];

  const { personalInfo, education, experience, projects, skills } = resumeData || {};

  // 1. Personal Information validation (Max 20 points)
  if (personalInfo) {
    if (personalInfo.name) {
      score += 5;
    } else {
      feedback.push({ type: 'danger', text: 'Full Name is missing.', section: 'personalInfo' });
    }

    if (personalInfo.title) {
      score += 3;
    } else {
      feedback.push({ type: 'warning', text: 'Professional Title is missing.', section: 'personalInfo' });
    }

    if (personalInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      score += 4;
    } else {
      feedback.push({ type: 'danger', text: 'Provide a valid email address.', section: 'personalInfo' });
    }

    if (personalInfo.phone) {
      score += 4;
    } else {
      feedback.push({ type: 'danger', text: 'Phone number is missing.', section: 'personalInfo' });
    }

    if (personalInfo.location) {
      score += 2;
    } else {
      feedback.push({ type: 'warning', text: 'Location (City, State) is missing.', section: 'personalInfo' });
    }

    if (personalInfo.linkedin || personalInfo.github) {
      score += 2;
    } else {
      feedback.push({ type: 'warning', text: 'No social profile links (LinkedIn/GitHub) found.', section: 'personalInfo' });
    }

    // 2. Summary details (Max 10 points)
    if (personalInfo.summary) {
      const words = personalInfo.summary.split(/\s+/).filter(w => w.length > 0).length;
      if (words >= 30 && words <= 80) {
        score += 10;
      } else if (words < 30) {
        score += 5;
        feedback.push({ type: 'warning', text: 'Summary is a bit short. Aim for 30–80 words.', section: 'personalInfo' });
      } else {
        score += 6;
        feedback.push({ type: 'warning', text: 'Summary is too wordy. Keep it under 80 words.', section: 'personalInfo' });
      }
    } else {
      feedback.push({ type: 'danger', text: 'Professional Summary is missing.', section: 'personalInfo' });
    }
  } else {
    feedback.push({ type: 'danger', text: 'Personal Information section is missing.', section: 'personalInfo' });
  }

  // 3. Work Experience details (Max 30 points)
  if (experience && experience.length > 0) {
    score += 10;
    let hasSufficientDescriptions = true;
    let hasActionVerbs = false;

    const actionVerbsList = ['architected', 'built', 'led', 'designed', 'developed', 'managed', 'implemented', 'created', 'optimized', 'reduced', 'increased', 'mentored', 'integrated', 'achieved', 'conducted'];

    experience.forEach(exp => {
      if (!exp.description || exp.description.length < 30) {
        hasSufficientDescriptions = false;
      }
      
      if (exp.description) {
        const descLower = exp.description.toLowerCase();
        if (actionVerbsList.some(verb => descLower.includes(verb))) {
          hasActionVerbs = true;
        }
      }
    });

    if (hasSufficientDescriptions) {
      score += 10;
    } else {
      feedback.push({ type: 'warning', text: 'Provide detailed descriptions (bullet points) for all work experience entries.', section: 'experience' });
    }

    if (hasActionVerbs) {
      score += 10;
    } else {
      feedback.push({ type: 'warning', text: 'Include strong action verbs in job descriptions (e.g., Led, Developed, Optimized).', section: 'experience' });
    }
  } else {
    feedback.push({ type: 'danger', text: 'Add at least one Work Experience entry.', section: 'experience' });
  }

  // 4. Education details (Max 15 points)
  if (education && education.length > 0) {
    score += 10;
    let hasDegrees = true;
    education.forEach(edu => {
      if (!edu.degree || !edu.school) {
        hasDegrees = false;
      }
    });
    if (hasDegrees) {
      score += 5;
    } else {
      feedback.push({ type: 'danger', text: 'Degree or school name missing in Education.', section: 'education' });
    }
  } else {
    feedback.push({ type: 'danger', text: 'Add at least one Education entry.', section: 'education' });
  }

  // 5. Skills (Max 15 points)
  if (skills && skills.length > 0) {
    if (skills.length >= 5) {
      score += 15;
    } else {
      score += 8;
      feedback.push({ type: 'warning', text: 'List at least 5 key professional skills.', section: 'skills' });
    }
  } else {
    feedback.push({ type: 'danger', text: 'Add professional skills.', section: 'skills' });
  }

  // 6. Projects (Max 10 points)
  if (projects && projects.length > 0) {
    score += 10;
  } else {
    feedback.push({ type: 'warning', text: 'Adding projects highlights practical expertise.', section: 'projects' });
  }

  return { score, feedback };
}

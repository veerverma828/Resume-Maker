export const initialResumeData = {
  personalInfo: {
    name: 'Alex Morgan',
    title: 'Senior Frontend Engineer',
    email: 'alex.morgan@tech.dev',
    phone: '(555) 019-2834',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    website: 'alexmorgan.dev',
    summary: 'Innovative and detail-oriented Frontend Engineer with 5+ years of experience designing, building, and optimizing interactive web applications. Expertise in React, modern JavaScript, and CSS architecture. Dedicated to crafting fluid user experiences and clean, accessible code.',
    avatar: '' // Base64 avatar image if uploaded
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2019-09',
      endDate: '2021-05',
      gpa: '3.9',
      description: 'Specialization in Software Engineering and Human-Computer Interaction.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      position: 'Senior Software Engineer (Frontend)',
      company: 'Innovate Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-08',
      endDate: '',
      current: true,
      description: '• Architected and developed a next-generation SaaS product dashboard using React, reducing load times by 35%.\n• Built and documented a reusable custom component library, increasing team development velocity by 25%.'
    },
    {
      id: 'exp-2',
      position: 'Software Engineer',
      company: 'ByteCraft Technologies',
      location: 'Austin, TX',
      startDate: '2019-07',
      endDate: '2021-07',
      current: false,
      description: '• Implemented responsive user interfaces for high-traffic web applications, collaborating closely with UX designers.\n• Developed and integrated REST APIs with Express and Node.js, ensuring secure and scalable state transitions.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'ResumeCraft Engine',
      role: 'Lead Creator',
      technologies: 'React, Node.js, CSS Variables',
      link: 'github.com/alexmorgan/resumecraft',
      description: 'Developed an advanced open-source resume editor featuring side-by-side editing, local JSON persistence, and pixel-perfect PDF export via pure CSS media print rules.'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript (ES6+)', level: 'Expert', category: 'Languages' },
    { id: 'skill-2', name: 'HTML5 & CSS3', level: 'Expert', category: 'Languages' },
    { id: 'skill-3', name: 'React & Redux', level: 'Expert', category: 'Frameworks' },
    { id: 'skill-4', name: 'Node.js & Express', level: 'Advanced', category: 'Backend' },
    { id: 'skill-5', name: 'Git & GitHub', level: 'Advanced', category: 'Tools' },
    { id: 'skill-8', name: 'Responsive Web Design', level: 'Expert', category: 'Methodologies' }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Conversational' }
  ],
  hobbies: [
    { id: 'hob-1', name: 'Landscape Photography' },
    { id: 'hob-3', name: 'Open Source Contribution' }
  ],
  customSections: []
};

export const initialCustomization = {
  templateId: 'classic',
  themeColor: '#2563eb', // Indigo 600 default
  secondaryColor: '#0d9488', // Teal 600 default
  fontFamily: 'Inter',
  fontSize: 'md',
  margins: 'normal',
  sectionSpacing: 'normal'
};

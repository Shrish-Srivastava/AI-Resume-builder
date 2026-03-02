import type { ResumeData } from '@/types/resume';

export const sampleResume: ResumeData = {
  personal: {
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary:
    'Full-stack engineer with 5+ years building web applications. Strong focus on React, TypeScript, and clean architecture. Passionate about developer experience and accessible design.',
  education: [
    {
      id: 'edu-1',
      institution: 'State University',
      degree: 'B.S.',
      field: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
      description: 'Relevant coursework: Data Structures, Algorithms, Databases.',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      description: 'Lead frontend initiatives. Built design system used by 3 product teams. Reduced bundle size by 20%.',
    },
    {
      id: 'exp-2',
      company: 'Startup Inc',
      role: 'Software Engineer',
      location: 'Remote',
      startDate: '2020',
      endDate: '2022',
      description: 'Developed customer dashboard and API integrations. Collaborated with product and design.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Open Source CLI',
      url: 'https://github.com/alex/example',
      description: 'Developer tool for local workflows. 2k+ GitHub stars.',
      tech: 'TypeScript, Node.js',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Figma'],
  links: {
    github: 'https://github.com/alex',
    linkedin: 'https://linkedin.com/in/alexchen',
  },
};

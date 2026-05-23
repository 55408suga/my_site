import type { LocaleContent } from '@/lib/types';

export const en: LocaleContent = {
  meta: {
    title: 'Kazushi Suga — Software Engineer',
    description:
      'Backend-leaning software engineer. Faculty of Science and Technology, Keio University. Working with Go, Python, JavaScript, AWS, and Linux.',
  },
  about: {
    title: 'About',
    role: 'Software Engineer · Keio University',
    bio: "I'm a backend-leaning software engineer working primarily with Go and Python. Studying at Keio University's Faculty of Science and Technology, I'm digging into modern web stacks and infrastructure tooling alongside coursework.",
  },
  education: {
    title: 'Education',
    items: [
      {
        period: '2025 — Present',
        institution: 'Keio University, Faculty of Science and Technology',
        detail: 'Second-year undergraduate',
      },
    ],
  },
  experience: {
    title: 'Experience',
    items: [],
    placeholder: '— Currently building professional experience.',
  },
  skills: {
    title: 'Skills',
    label: 'Stack I actively work with',
  },
  projects: {
    title: 'Projects',
    label: 'Auto-fetched from GitHub',
    empty: 'Could not load repositories.',
  },
  contact: {
    title: 'Contact',
    text: 'For inquiries or collaboration, please reach me on GitHub.',
  },
  switcher: {
    label: 'JP',
  },
  footer: {
    rights: '© Kazushi Suga',
  },
};

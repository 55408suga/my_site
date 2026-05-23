export type Locale = 'ja' | 'en';

export interface RepoCard {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  url: string;
  isPinned: boolean;
}

export interface EducationItem {
  period: string;
  institution: string;
  detail: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  detail: string;
}

export interface LocaleContent {
  meta: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    role: string;
    bio: string;
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  experience: {
    title: string;
    items: ExperienceItem[];
    placeholder: string;
  };
  skills: {
    title: string;
    label: string;
  };
  projects: {
    title: string;
    label: string;
    empty: string;
  };
  contact: {
    title: string;
    text: string;
  };
  switcher: {
    label: string;
  };
  footer: {
    rights: string;
  };
}

export const SKILLS = [
  'Python',
  'JavaScript',
  'Java',
  'Go',
  'Git',
  'Linux',
  'Docker',
  'SQL',
  'AWS',
] as const;

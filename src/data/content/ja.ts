import type { LocaleContent } from '@/lib/types';

export const ja: LocaleContent = {
  meta: {
    title: 'Kazushi Suga — Software Engineer',
    description:
      'バックエンド志向のソフトウェアエンジニア。慶應義塾大学 理工学部。Python / JavaScript / Go / AWS / Linux を中心に開発しています。',
  },
  about: {
    title: 'About',
    role: 'Software Engineer · Keio University',
    bio: '主に Go と Python を用いてバックエンド寄りの開発をしています。慶應義塾大学 理工学部で学びながら、モダンな Web 技術とインフラ領域に関心を持って手を動かしています。',
  },
  education: {
    title: 'Education',
    items: [
      {
        period: '2025 — 現在',
        institution: '慶應義塾大学 理工学部',
        detail: '2 年生',
      },
    ],
  },
  experience: {
    title: 'Experience',
    items: [],
    placeholder: '— 現在、経歴を蓄積中です。',
  },
  skills: {
    title: 'Skills',
    label: '実際に手を動かしている技術',
  },
  projects: {
    title: 'Projects',
    label: 'GitHub から自動取得',
    empty: 'リポジトリ情報を取得できませんでした。',
  },
  contact: {
    title: 'Contact',
    text: 'お問い合わせは GitHub からお願いします。',
  },
  switcher: {
    label: 'EN',
  },
  footer: {
    rights: '© Kazushi Suga',
  },
};

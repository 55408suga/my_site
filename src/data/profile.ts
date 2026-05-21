export const profile = {
  name: {
    ja: 'Kazushi Suga',
    en: 'Kazushi Suga',
  },
  kanjiName: '須賀 和士',
  github: '55408suga',
  repoAllowlist: ['my_site'] as readonly string[],
  socials: [
    {
      kind: 'github' as const,
      label: 'GitHub',
      url: 'https://github.com/55408suga',
    },
  ],
} as const;

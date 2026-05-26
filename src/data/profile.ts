export const profile = {
  name: {
    ja: 'Kazushi Suga',
    en: 'Kazushi Suga',
  },
  kanjiName: '須賀 和士',
  github: '55408suga',
  repoAllowlist: ['my_site', 'vote-site', 'go-rss-reader', 'Flask-TodoApp'] as readonly string[],
  wipRepos: ['go-rss-reader'] as readonly string[],
  repoTechs: {
    my_site: ['Astro', 'TypeScript', 'Tailwind CSS'],
    'vote-site': ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    'go-rss-reader': ['Go', 'Echo', 'PostgreSQL', 'Docker'],
    'Flask-TodoApp': ['Flask', 'React', 'GraphQL', 'Docker'],
  } as Record<string, readonly string[]>,
  socials: [
    {
      kind: 'github' as const,
      label: 'GitHub',
      url: 'https://github.com/55408suga',
    },
  ],
} as const;

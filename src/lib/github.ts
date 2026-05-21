import fs from 'node:fs';
import path from 'node:path';
import type { RepoCard } from './types';

const USER = '55408suga';
const REPOS_JSON = path.join(process.cwd(), 'src/data/repos.json');
const MAX_REPOS = 8;

interface GqlPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
}

interface GqlResponse {
  data?: { user?: { pinnedItems?: { nodes?: GqlPinnedRepo[] } } };
  errors?: Array<{ message: string }>;
}

interface RestRepo {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  language: string | null;
}

const GH_GRAPHQL = `query Pinned($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          pushedAt
          stargazerCount
          primaryLanguage { name }
        }
      }
    }
  }
}`;

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = {
    'User-Agent': '55408suga-portfolio-build',
    Accept: 'application/vnd.github+json',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function fetchPinned(): Promise<RepoCard[]> {
  if (!process.env.GITHUB_TOKEN) return [];
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GH_GRAPHQL, variables: { login: USER } }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as GqlResponse;
  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);
  }
  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.map((n) => ({
    name: n.name,
    description: n.description,
    url: n.url,
    pushedAt: n.pushedAt,
    stars: n.stargazerCount,
    language: n.primaryLanguage?.name ?? null,
    isPinned: true,
  }));
}

async function fetchOneRepo(name: string): Promise<RepoCard | null> {
  const res = await fetch(`https://api.github.com/repos/${USER}/${name}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    console.warn(`[github] skipping ${name}: HTTP ${res.status}`);
    return null;
  }
  const r = (await res.json()) as RestRepo;
  return {
    name: r.name,
    description: r.description,
    url: r.html_url,
    pushedAt: r.pushed_at,
    stars: r.stargazers_count,
    language: r.language,
    isPinned: false,
  };
}

let cached: Promise<RepoCard[]> | null = null;

export function fetchProjectRepos(allowlist: readonly string[]): Promise<RepoCard[]> {
  if (!cached) cached = doFetch(allowlist);
  return cached;
}

async function doFetch(allowlist: readonly string[]): Promise<RepoCard[]> {
  try {
    const [pinned, listed] = await Promise.all([
      fetchPinned(),
      Promise.all(allowlist.map((n) => fetchOneRepo(n))).then((xs) =>
        xs.filter((x): x is RepoCard => x !== null),
      ),
    ]);

    const map = new Map<string, RepoCard>();
    for (const r of pinned) map.set(r.name, r);
    for (const r of listed) {
      const existing = map.get(r.name);
      if (existing) {
        existing.isPinned = existing.isPinned || r.isPinned;
        continue;
      }
      map.set(r.name, r);
    }

    const sorted = [...map.values()]
      .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())
      .slice(0, MAX_REPOS);

    fs.mkdirSync(path.dirname(REPOS_JSON), { recursive: true });
    fs.writeFileSync(REPOS_JSON, JSON.stringify(sorted, null, 2));
    return sorted;
  } catch (err) {
    console.warn('[github] live fetch failed, attempting cached fallback:', err);
    if (fs.existsSync(REPOS_JSON)) {
      const raw = fs.readFileSync(REPOS_JSON, 'utf8');
      return JSON.parse(raw) as RepoCard[];
    }
    return [];
  }
}

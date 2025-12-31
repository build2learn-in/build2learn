import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

/**
 * Author interface defining the structure of author data
 */
export interface Author {
  displayName: string;
  githubUsername: string;
  bio?: string;
  githubUrl: string; // Generated from githubUsername
}

/**
 * Raw author data from YAML file (before processing)
 */
interface RawAuthor {
  displayName: string;
  githubUsername: string;
  bio?: string;
}

/**
 * Cache for loaded authors to avoid repeated file reads
 */
let authorsCache: Record<string, RawAuthor> | null = null;

/**
 * Loads all authors from the authors.yaml file
 * @returns Record of author keys to author data
 */
function loadAuthors(): Record<string, RawAuthor> {
  if (authorsCache) {
    return authorsCache;
  }

  try {
    const authorsPath = path.join(process.cwd(), 'src/data/authors.yaml');
    const fileContents = fs.readFileSync(authorsPath, 'utf8');
    authorsCache = yaml.parse(fileContents);
    return authorsCache || {};
  } catch (error) {
    console.error('Error loading authors.yaml:', error);
    return {};
  }
}

/**
 * Gets a single author by their key
 * @param authorKey - The key of the author (e.g., 'bhavani', 'build2learn')
 * @returns Author object with all details including generated githubUrl
 */
export function getAuthor(authorKey: string): Author {
  const authors = loadAuthors();
  const rawAuthor = authors[authorKey];

  if (!rawAuthor) {
    throw new Error(
      `Author "${authorKey}" not found in authors.yaml. ` +
        `Please add them to src/data/authors.yaml before using in blog posts.`
    );
  }

  return {
    ...rawAuthor,
    githubUrl: `https://github.com/${rawAuthor.githubUsername}`,
  };
}

/**
 * Gets multiple authors by their keys
 * @param authorKeys - Array of author keys
 * @returns Array of Author objects
 */
export function getAuthors(authorKeys: string[]): Author[] {
  return authorKeys.map((key) => getAuthor(key));
}

/**
 * Gets all available authors
 * @returns Record of all authors
 */
export function getAllAuthors(): Record<string, Author> {
  const authors = loadAuthors();
  const result: Record<string, Author> = {};

  for (const [key, rawAuthor] of Object.entries(authors)) {
    result[key] = {
      ...rawAuthor,
      githubUrl: `https://github.com/${rawAuthor.githubUsername}`,
    };
  }

  return result;
}

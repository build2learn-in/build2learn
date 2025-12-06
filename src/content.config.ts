import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
    // Array of author keys, defaults to ['build2learn'] if not specified
    authors: z.array(z.string()),
  }),
});

const project = defineCollection({
  // Load Markdown and MDX files in the `src/content/project/` directory.
  loader: glob({ base: './src/content/project', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    participants: z.array(z.string()),
    photo: z.string().optional(),
    eventDate: z.coerce.date(),
    projectTitle: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    githubRepo: z.string().optional(),
    demoUrl: z.string().optional(),
    linkedinMention: z.string().optional(),
  }),
});

const event = defineCollection({
  loader: glob({ base: './src/content/event', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eventDate: z.coerce.date(),
    eventTime: z.string(),
    registrationDeadline: z.coerce.date(),
    heroImage: z.string().optional(),
    registration_link: z.string(),
    venue: z.string(),
    venue_address: z.string(),
    venue_location: z.string(),
    maxParticipants: z.number().optional(),
  }),
});

export const collections = { blog, project, event };

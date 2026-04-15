import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
  }),
});

const kb = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/kb' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { blog, kb };

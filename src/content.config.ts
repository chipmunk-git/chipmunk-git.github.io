import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const webUrl = z.url({ protocol: /^https?$/ });

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: text,
    description: text,
    date: z.coerce.date().optional(),
    period: text.optional(),
    type: z.enum(['personal', 'team']).optional(),
    team: z.number().int().positive().optional(),
    role: z.array(text).default([]),
    stack: z.array(text).default([]),
    category: text.optional(),
    thumbnail: image().optional(),
    thumbnailAlt: text.optional(),
    repository: webUrl.optional(),
    featured: z.boolean().default(false),
    status: z.enum(['completed', 'in-progress', 'experiment']).optional(),
    draft: z.boolean().default(true),
    sample: z.boolean().default(false),
  }).refine((data) => !data.thumbnail || Boolean(data.thumbnailAlt), {
    message: 'thumbnail이 있으면 thumbnailAlt를 작성해야 합니다.',
    path: ['thumbnailAlt'],
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    title: text,
    description: text,
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: text.optional(),
    tags: z.array(text).default([]),
    project: reference('projects').optional(),
    draft: z.boolean().default(true),
    sample: z.boolean().default(false),
    thumbnail: image().optional(),
    thumbnailAlt: text.optional(),
  }).refine((data) => !data.updated || data.updated >= data.date, {
    message: 'updated는 date보다 이전일 수 없습니다.',
    path: ['updated'],
  }).refine((data) => !data.thumbnail || Boolean(data.thumbnailAlt), {
    message: 'thumbnail이 있으면 thumbnailAlt를 작성해야 합니다.',
    path: ['thumbnailAlt'],
  }),
});

export const collections = { projects, blog };

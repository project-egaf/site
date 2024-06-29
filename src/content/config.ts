import { defineCollection, z } from 'astro:content';

const works = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		dateAdded: z.coerce.date(),
		lastUpdated: z.coerce.date().optional()
	})
})

export const collections = { works };

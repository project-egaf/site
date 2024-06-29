import { defineAction, z } from 'astro:actions';
import { db, eq, Works } from 'astro:db';

export const server = {
    bounty: defineAction({
        accept: "form",
        input: z.object({
            id: z.number()
        }),
        handler: async ({ id }) => {
            const [work] = await db.select().from(Works).where(eq(Works.id, id));
            try {
                await db.update(Works).set({ requested: true, requestedTimes: work.requestedTimes + 1 }).where(eq(Works.id, id));
            } catch(err) {
                return {
                    success: false
                }
            }
            return { success: true };
        }
    })
}
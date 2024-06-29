import { defineAction, z } from 'astro:actions';
import { db, eq, Works } from 'astro:db';
import { Categories } from '../consts';


interface AddWorkHandler {
    name: string;
    lastUpdated?: Date;
    qty?: number;
    description?: string;
    requested?: boolean;
    requestedTimes?: number;
    createdon?: Date
    category: Categories;
}

async function addWorkHandler({ name, category, lastUpdated = new Date(), qty = 1, description, requested = false, requestedTimes = 0, createdon = new Date() }: AddWorkHandler): Promise<{ error: string, success: boolean }> {
    try {
        const result = await db.insert(Works).values({
            name,
            lastUpdated,
            qty,
            description,
            requested,
            requestedTimes,
            createdon,
            category
        });
    } catch(err: any) {
        return {
            success: false,
            error: err.message
        }
    }

    return { success: true, error: '' }
}


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
            } catch(err:any) {
                return {
                    success: false,
                    error: err.message,
                }
            }
            return { success: true, error: '' };
        }
    }),
    addWork: defineAction({
        accept:'form',
        input: z.object({
            name: z.string(),
            lastUpdated: z.coerce.date(),
            qty: z.coerce.number(),
            description: z.coerce.string().optional(),
            requested: z.coerce.boolean(),
            requestedTimes: z.number(),
            createdon: z.coerce.date().optional(),
            category: z.number(),
        }),
        handler: addWorkHandler
    })
}
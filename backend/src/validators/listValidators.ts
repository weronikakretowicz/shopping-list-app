import { z } from 'zod';

export const createListSchema = z.object({
    name: z.string()
        .min(2, { message: 'List name must have at least 2 characters' }),
    items: z.array(z.string()).optional(),
});

export const updateListSchema = z.object({
    name: z.string().min(2).optional(),
    items: z.array(z.string()).optional(),
});

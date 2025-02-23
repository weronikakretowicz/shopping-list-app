import { z } from 'zod';

const itemSchema = z.object({
    name: z.string().min(4, { message: 'Item name must have at least 1 character' }),
    quantity: z.number().min(1, { message: 'Item quantity must be at least 1' }).optional(),
    unit: z.string().optional(),
});

export const createListSchema = z.object({
    name: z.string()
        .min(2, { message: 'List name must have at least 2 characters' }),
    items: z.array(itemSchema),
});

export const updateListSchema = z.object({
    name: z.string().min(2).optional(),
    items: z.array(itemSchema).optional(),
});

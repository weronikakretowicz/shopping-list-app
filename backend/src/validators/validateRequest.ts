import { z, ZodSchema } from 'zod';
import { Context } from 'hono';

export const validateRequest = (schema: ZodSchema) => {
    return async (c: Context, next: () => Promise<void>) => {
        try {
            const body = await c.req.json();
            schema.parse(body);
            await next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return c.json({ errors: error.errors }, 400);
            }
            return c.json({ error: 'Invalid request data' }, 400);
        }
    };
};

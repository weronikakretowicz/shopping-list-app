import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string()
        .min(3, { message: 'Username must have at least 3 characters' })
        .max(30, { message: 'Username can have max 30 characters' }),
    email: z.string()
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(6, { message: 'Password must have at least 6 characters' }),
});

export const loginSchema = z.object({
    email: z.string()
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(6, { message: 'Password must have at least 6 characters' }),
});

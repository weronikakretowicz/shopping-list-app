import { Hono } from 'hono';
import { MyEnv } from './types';

export const app = new Hono<{ Bindings: MyEnv }>();

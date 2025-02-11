import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => c.text('Backend działa! 🚀'));

// Uruchomienie serwera w Node.js
serve({
    fetch: app.fetch,
    port: 3001,
});

console.log('🚀 Backend działa na http://localhost:3001');

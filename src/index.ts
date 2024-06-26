import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { booksRouter } from './books/books.router';
import { readFileSync } from 'fs';


const app = new Hono();

// Route definitions for books database
app.route("/books", booksRouter);

// Health check endpoint
app.get('/', async (c) => {
  try {
    let html = readFileSync('./index.html', 'utf8');
    return c.html(html);
  } catch (error: any) {
    return c.json({ error: error.message, status: 500 });
  }
});

app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.text('Internal Server Error', 500);
});

app.notFound((c) => {
  return c.text('Not Found!', 404);
});

const port = process.env.PORT || 8000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});


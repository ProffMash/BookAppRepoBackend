import { Context } from "hono";
import { booksService, getBookById, createBook, updateBook, deleteBook, searchBooks } from "./books.service";

export const booksController = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await booksService(limit);
        if (data == null || data.length == 0) {
            return c.text("Books not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getBook = async (c: Context) => {
    try {
        const id = c.req.param('id');

        const data = await getBookById(id);
        if (!data) {
            return c.text("Book not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createBookController = async (c: Context) => {
    try {
        const body = await c.req.json();

        const data = await createBook(body);
        return c.json(data, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateBookController = async (c: Context) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json();

        const data = await updateBook(id, body);
        if (!data) {
            return c.text("Book not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteBookController = async (c: Context) => {
    try {
        const id = c.req.param('id');

        const data = await deleteBook(id);
        if (!data) {
            return c.text("Book not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const searchBooksController = async (c: Context) => {
    try {
        const searchTerm = c.req.query('searchTerm') ?? '';
        
        const data = await searchBooks(searchTerm);
        if (!data || data.length === 0) {
            return c.text("Books not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

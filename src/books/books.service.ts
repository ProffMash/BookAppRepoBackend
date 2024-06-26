import { eq, like } from "drizzle-orm";
import db from "../drizzle/db";
import { books } from "../drizzle/schema";

// Fetch all books or limited by the given number
export const booksService = async (limit?: number) => {
    if (limit) {
        return await db.query.books.findMany({
            limit: limit,
        });
    }
    return await db.query.books.findMany();
};

// Fetch one book by id
export const getBookById = async (id: string) => {
    return await db.query.books.findFirst({
        where: eq(books.id, id)
    });
};

// Create a new book
export const createBook = async (data: typeof books.$inferInsert) => {
    await db.insert(books).values(data)
    return "book created successfuly";
};

// Update a book by id
export const updateBook = async (id: string, data: Partial<typeof books.$inferInsert>) => {
    await db.update(books).set(data).where(eq(books.id, id));
    return "book updated successfully"
};

// Delete a book by id
export const deleteBook = async (id: string) => {
    await db.delete(books).where(eq(books.id, id));
    return "book deleted successfully"
};

// Search for books by a search term (e.g., title)
export const searchBooks = async (searchTerm: string) => {
    return await db.query.books.findMany({
        where: like(books.title, `%${searchTerm}%`)
    });
};

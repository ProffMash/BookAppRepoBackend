import { pgTable, varchar, integer, timestamp, serial, pgEnum } from "drizzle-orm/pg-core";
import { sql, relations } from "drizzle-orm";


export const books = pgTable('books', {
    id: varchar('id', { length: 4 }).notNull().primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 100 }).notNull(),
    year: integer('year').notNull()
});

export const bookRoleEnum = pgEnum("book_role", ["admin", "user"]);

export const AuthOnBooksTable = pgTable("auth_on_books", {
    id: serial("id").primaryKey(),
    bookId: varchar("book_id", { length: 4 }).notNull().references(() => books.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 255 }),
    username: varchar("username", { length: 255 }),
    role: bookRoleEnum("role").default("user")
});

export const AuthOnBooksTableRelations = relations(AuthOnBooksTable, ({ one }) => ({
    book: one(books, { fields: [AuthOnBooksTable.bookId], references: [books.id] })
}));


export type AuthOnBooksInsert = typeof AuthOnBooksTable.$inferInsert;
export type AuthOnBooksSelect = typeof AuthOnBooksTable.$inferSelect;


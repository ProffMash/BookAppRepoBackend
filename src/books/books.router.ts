import { Hono } from "hono";
import { booksController, getBook, createBookController, updateBookController, deleteBookController, searchBooksController } from "./books.controller";

export const booksRouter = new Hono();

booksRouter.get("/", booksController);
booksRouter.get("/:id", getBook);
booksRouter.post("/", createBookController);
booksRouter.put("/:id", updateBookController);
booksRouter.delete("/:id", deleteBookController);
booksRouter.get("/search", searchBooksController);

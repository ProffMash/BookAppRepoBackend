DO $$ BEGIN
 CREATE TYPE "public"."book_role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_on_books" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" varchar(4) NOT NULL,
	"password" varchar(255),
	"username" varchar(255),
	"role" "book_role" DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" varchar(4) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(100) NOT NULL,
	"year" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_on_books" ADD CONSTRAINT "auth_on_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

import "dotenv/config";
// import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"
import assert from "assert"

assert(process.env.DATABASE_URL, "DATABASE_URL is not set in the .env file")

export const sql = neon (process.env.DATABASE_URL as string)  //get the database url from the environment)


const db = drizzle(sql, { schema, logger: true });  //create a drizzle instance

export default db;  //export the drizzle instance
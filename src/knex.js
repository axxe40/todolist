import knex from "knex";

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */

const config = {
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // ssl: { rejectUnauthorized: false },
    },
};

let cached = global.pg;
if (!cached) cached = global.pg = {};

export function getPgKnext() {
    if (!cached.instance) cached.instance = knex(config);
    return cached.instance;
}
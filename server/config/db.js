import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const missing = [];
if (!DB_HOST) missing.push("DB_HOST");
if (!DB_USER) missing.push("DB_USER");
if (!DB_PASS) missing.push("DB_PASS");
if (!DB_NAME) missing.push("DB_NAME");

if (missing.length > 0) {
  console.error(`Missing required DB env vars: ${missing.join(", ")}`);
  throw new Error("Database configuration incomplete. See server/config/db.js and .env");
}

console.log(`DB config: host=${DB_HOST}, database=${DB_NAME}, user=${DB_USER}`);

export const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

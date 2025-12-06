// server/scripts/createUser.js
import bcrypt from "bcrypt";
import { db } from "../config/db.js";

const run = async () => {
  const password = "Password123"; // change as desired
  const hash = await bcrypt.hash(password, 10);
  const name = "Gabriel Altea";
  const email = "gabriel@example.com";
  const role = "admin";

  const [res] = await db.query("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)", [name, email, hash, role]);
  console.log("Inserted user id:", res.insertId);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });

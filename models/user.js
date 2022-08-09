import { query } from "../db/index.js";

//return habits using account_id
export async function getUserById(id) {
  const res = await query("SELECT * FROM users WHERE user_id = $1;", [id]);
  return res.rows;
}

//return user using username
export async function getAllUsers() {
  const res = await query(`SELECT * FROM users ;`);
  return res.rows;
}

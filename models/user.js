import { query } from "../db/index.js";

//return habits using account_id
export async function getUserById(id) {
  const res = await query("SELECT * FROM users WHERE user_id = $1;", [id]);
  return res.rows;
}

//return all habits using username
export async function getUserByUsername(username) {
  const res = await query(
    `SELECT * FROM users WHERE username LIKE '%' || $1 || '%';`,
    [username]
  );
  return res.rows;
}

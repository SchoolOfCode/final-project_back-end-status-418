import { query } from "../db/index.js";

//return portfolio by account_id
export async function getUserById(id) {
  const res = await query("SELECT * FROM user WHERE user.account_id = $1;", [
    id,
  ]);
  return res.rows;
}

//return all portfolios based on designer name
export async function getUserByUsername(username) {
  const res = await query(
    `SELECT * FROM user WHERE user.username LIKE '%' || $1 || '%';`,
    [username]
  );
  return res.rows;
}

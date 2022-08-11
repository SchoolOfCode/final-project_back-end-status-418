import { query } from "../db/index.js";

//return all users
export async function getAllUsers() {
  const res = await query(`SELECT * FROM users;`);
  return res.rows;
}

//return habits using account_id
export async function getUserById(id) {
  const res = await query("SELECT * FROM users WHERE user_id = $1;", [id]);
  return res.rows;
}

// post new user ID from Auth0
export async function addNewUser(newUser) {
  const { user_id, username } = newUser;
  const res = await query(
    `INSERT INTO users(user_id, username) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;`,
    [user_id, username]
  );
  return res.rows;
}

// change username
export async function changeUsername(newUsername, id) {
  const res = await query(
    `UPDATE users SET username = $1 WHERE user_id = $2 RETURNING *`,
    [newUsername, id]
  );
  return res.rows;
}

// delete user
export async function deleteUser(id) {
  const res = await query(`DELETE FROM users WHERE user_id = $1`, [id]);
  return res.rows;
}

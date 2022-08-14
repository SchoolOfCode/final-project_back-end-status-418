import { query } from "../db/index.js";

/** Return all habits in habits table */
export async function getAllHabits() {
  const res = await query(
    "SELECT * FROM habits INNER JOIN users ON users.user_id = userId ORDER BY created_at"
  );
  return res.rows;
}

/** Return habit by its id. Expects a number */
export async function getHabitById(id) {
  const res = await query(
    "SELECT * FROM habits INNER JOIN users ON users.user_id = userId WHERE id = $1;",
    [id]
  );
  return res.rows;
}

/** Return all habits by userId. Expects a string */
export async function getHabitsByUserId(user) {
  const res = await query(
    "SELECT * FROM habits INNER JOIN users ON users.user_id = userId WHERE Userid = $1",
    [user]
  );
  return res.rows;
}

// 📝NOTE📝 The values
// *️⃣ everyday = true
// *️⃣ fr_reps = null
// *️⃣ fr_interval = null
// have been ❌HARD-CODED❌
// This is MVP behaviour
// Will need to be updated when additional functionality is added
/** Create an entire new habit. Expects data of the format (JSON): {"name": string, "description": string, "userId": string} */
export async function addNewHabit(h) {
  const sql = `INSERT INTO habits (name, description, userId, everyday, frequency_reps, frequency_interval) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [h.name, h.description, h.userId, true, null, null];
  const res = await query(sql, values);
  return res.rows;
}

/** Update a habit. Expects data of the format {name: string, description: string, userId: string} */
export async function fullUpdateofHabit(id, h) {
  const sql = `UPDATE habits SET name = $1, description = $2, userid = $3, updated_at = NOW() WHERE id = $4 RETURNING *;`;
  const values = [h.name, h.description, h.userId, id];
  const res = await query(sql, values);
  return res.rows;
}

export async function deleteHabit(id) {
  const sql = `DELETE FROM habits WHERE id = $1 RETURNING *;`;
  const res = await query(sql, [id]);
  console.log(res.rows);
  return res.rows;
}

//Update habit name
export async function updateHabitName(id, name) {
  const sql = ` UPDATE habits SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING*;`;
  const res = await query(sql, [name, id]);
  console.log(res.rows);
  return res.rows;
}

// Update habit description

export async function updateHabitDescription(id, description) {
  const sql = ` UPDATE habits SET description = $1, updated_at = NOW() WHERE id = $2 RETURNING*;`;
  const res = await query(sql, [description, id]);
  console.log(res.rows);
  return res.rows;
}

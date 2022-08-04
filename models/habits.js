import { query } from "../db/index.js";

/** Return all habits in habits table */
export async function getAllHabits() {
	const res = await query("SELECT * FROM habits");
	return res.rows;
}

/** Return habit by its id */
export async function getHabitById(id) {
	const res = await query("SELECT * FROM habits WHERE habits.id = $1;", [id]);
	return res.rows;
}

export async function getHabitsByUserId(user) {
	const res = await query("SELECT * FROM habits WHERE userId = $1", [user]);
	return res.rows;
}

// 📝NOTE📝 The values
// *️⃣ everyday = true
// *️⃣ fr_reps = null
// *️⃣ fr_interval = null
// have been ❌HARD-CODED❌
// This is MVP behaviour
// Will need to be updated when additional functionality is added
export async function addNewHabit(h) {
	const sql = `INSERT INTO habits (name, description, userId, everyday, frequency_reps, frequency_interval) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
	const values = [h.name, h.description, h.userId, true, null, null];
	const res = await query(sql, values);
	return res.rows;
}

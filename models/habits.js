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

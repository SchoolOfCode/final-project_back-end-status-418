import { query } from "../db/index.js";

/** Return all habits in habits table */
export async function getAllHabits() {
	const res = await query("SELECT * FROM habits");
	return res.rows;
}

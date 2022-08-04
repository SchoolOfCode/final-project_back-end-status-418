import { query } from "../db/index.js";

export async function getAllByIDAndDate(id) {
  const res = await query(
    `SELECT * FROM calendar INNER JOIN habits
    ON calendar.habit_id = habits.id 
    WHERE habit_id = $1`,
    [id]
  );
  return res.rows;
}

// date_updated to evenutally change when status is changed

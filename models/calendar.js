import { query } from "../db/index.js";

export async function getAllByID(id) {
  const res = await query(
    `SELECT * FROM calendar INNER JOIN habits
    ON calendar.habit_id = habits.id 
    WHERE habit_id = $1`,
    [id]
  );
  return res.rows;
}

export async function getAllByIDAndDate(id, date) {
  const res = await query(
    `SELECT * FROM calendar INNER JOIN habits
        ON calendar.habit_id = habits.id
        WHERE habit_id = $1 AND date = $2`,
    [id, date]
  );
  return res.rows[0];
}

export async function changeStatus(id, newStatus) {
  const res = await query(
    `UPDATE calendar SET status = $1, updated_at = NOW() WHERE habit_id = $2 RETURNING *`,
    [newStatus, id]
  );
  return res.rows;
}

export async function newCalendarEntry(habitItem) {
  const { habit_id, date, status } = habitItem;
  const res = await query(
    `INSERT INTO calendar(habit_id, date, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
    [habit_id, date, status]
  );
  return res.rows;
}

export async function deleteCalendarEntry(id, date) {
  const res = await query(
    `DELETE FROM calendar WHERE habit_id = $1 AND date = $2`,
    [id, date]
  );
  return res.rows;
}

export async function deleteAllCalendarEntriesByID(id) {
  const res = await query(`DELETE FROM calendar WHERE habit_id = $1`, [id]);
  return res.rows;
}

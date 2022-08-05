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
    `ALTER TYPE status_options RENAME VALUE 'complete' TO 'skip' WHERE habit_id = $3`,
    [newStatus, id]
  );
  return res.rows[0];
}

export async function newCalendarEntry(habitItem) {
  const { habit_id, date, status } = habitItem;
  const res = await query(
    `INSERT INTO calendar(habit_id, date, status) VALUES ($1, $2, $3) RETURNING * ON CONFLICT DO NOTHING`,
    [habit_id, date, status]
  );
  return res.rows[0];
}

// date_updated to evenutally change when status is changed

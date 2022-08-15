import { query } from "../db/index.js";

export async function getAllByID(id) {
  const res = await query(
    `SELECT calendar.date, calendar.status, habits.name, habits.userid, habits.id 
    FROM calendar INNER JOIN habits
    ON calendar.habit_id = habits.id 
    WHERE habit_id = $1 ORDER BY date`,
    [id]
  );
  return res.rows;
}

export async function getAllByIDAndDate(id, date) {
  const res = await query(
    `SELECT calendar.date, calendar.status, habits.name, habits.userid, habits.id
     FROM calendar INNER JOIN habits
      ON calendar.habit_id = habits.id
      WHERE habit_id = $1 AND date = $2`,
    [id, date]
  );
  return res.rows;
}

export async function getByIDAndUserID(id, userID) {
  const res = await query(
    `
  SELECT calendar.date, calendar.status, habits.name, habits.userid, habits.id
  FROM calendar INNER JOIN habits
  ON calendar.habit_id = habits.id
  WHERE habit_id = $1 AND userId = $2 ORDER BY date`,
    [id, userID]
  );
  return res.rows;
}

export async function changeStatus(id, newStatus, date) {
  const res = await query(
    `UPDATE calendar SET status = $1, updated_at = NOW() WHERE habit_id = $2 AND date = $3 RETURNING *`,
    [newStatus, id, date]
  );
  return res.rows;
}

export async function newCalendarEntry(habitItem) {
  const { habit_id, date, status } = habitItem;
  const res = await query(
    `INSERT INTO calendar(habit_id, date, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *`,
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

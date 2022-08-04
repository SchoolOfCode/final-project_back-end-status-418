import { calendar } from "./libs/calendar.js";
import { query } from "../index.js";

async function populateCalendarTable() {
  for (let i = 0; i < calendar.length; i++) {
    const res = await query(
      `INSERT INTO calendar (habit_id, date, status) VALUES ($1, $2, $3) RETURNING *`,
      [calendar[i].habit_id, calendar[i].date, calendar[i].status]
    );
    console.log(res.rows);
  }
}

populateCalendarTable();

import { query } from "../index.js";
import { habits } from "./libs/habits.js";

async function populateHabitsTable() {
  let res;
  for (let i = 0; i < habits.length; i++) {
    const sql = `INSERT INTO habits (name, description, userId, everyday, frequency_reps, frequency_interval) VALUES ($1, $2, $3, $4, $5, $6)`;
    const data = [
      habits[i].name,
      habits[i].description,
      habits[i].userId,
      habits[i].everyday,
      habits[i].frequency.fr_reps,
      habits[i].frequency.fr_interval,
    ];
    res = await query(sql, data);
  }
  console.log(`${res.command} : populated habits table`);
}

console.log("populating habits table...");
populateHabitsTable();

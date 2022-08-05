import { query } from "../index.js";
//import "dotenv/config";
import { user } from "./lib/user.js";

async function populateUserTable() {
  for (let i = 0; i < user.length; i++) {
    await query(`INSERT INTO user (account_id, username) VALUES ($1, $2);`, [
      user[i].account_id,
      user[i].username,
    ]);
    res = await query(sql, data);
  }
  console.log(`${res.command} : populated user table`);
}

populateUserTable();

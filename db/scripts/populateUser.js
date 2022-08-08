import { query } from "../index.js";
//import "dotenv/config";
import { user } from "./lib/user.js";

async function populateUserTable() {
  for (let i = 0; i < user.length; i++) {
    await query(`INSERT INTO user (username) VALUES ($1);`, [user[i].username]);
    res = await query(sql, data);
  }
  console.log(`${res.command} : populated user table`);
}

populateUserTable();

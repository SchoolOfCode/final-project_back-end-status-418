import { query } from "../index.js";

async function deleteUserTable() {
  const sql = `DROP TABLE users;`;
  const res = await query(sql);
  console.log(`${res.command}: user table deleted`);
}

console.log("deleting user table...");
deleteUserTable();

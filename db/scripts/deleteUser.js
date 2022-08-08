import { query } from "../index.js";

async function deleteUserTable() {
  const SQL = `DROP TABLE IF EXISTS user`;
  const res = await query(SQL);
  console.log(`${res.command} : user table deleted`);
}

console.log("deleting user table...");
deleteUserTable();

import { query } from "../index.js";
//import "dotenv/config";
async function createUserTable() {
  const SQL = `CREATE TABLE IF NOT EXISTS 
      user(
          account_id TEXT 
          username TEXT 
  );`;
  const res = await query(SQL);
  console.log(`${res.command} : user table created`);
}
createUserTable();

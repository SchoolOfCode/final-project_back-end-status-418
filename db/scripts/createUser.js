import { query } from "../index.js";

// extract ID from JWT
async function createUserTable() {
	const SQL = `CREATE TABLE IF NOT EXISTS 
      users(
        user_id TEXT NOT NULL,  
        username TEXT,
        PRIMARY KEY(user_id)
  );`;
	const res = await query(SQL);
	console.log(`${res.command} : user table created`);
}
createUserTable();

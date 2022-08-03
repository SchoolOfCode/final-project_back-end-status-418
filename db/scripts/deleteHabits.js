import { query } from "../index.js";

async function deleteHabitsTable() {
	const SQL = `DROP TABLE IF EXISTS habits`;
	const res = await query(SQL);
	console.log(`${res.command} : habits table deleted`);
}

console.log("deleting habits table...");
deleteHabitsTable();

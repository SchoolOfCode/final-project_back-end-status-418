import { query } from "../index.js";

async function deleteHabitsTable() {
	const SQL = `DROP TABLE IF EXISTS habits`;
	const res = await query(SQL);
	console.log(`${res.command}: deleted habits table`);
}

deleteHabitsTable();

import { query } from "../index.js";

async function deleteCalendarTable() {
	let SQL = `DROP TABLE IF EXISTS calendar`;
	let res = await query(SQL);
	console.log(`${res.command} : calendar table deleted`);
	SQL = `DROP TYPE IF EXISTS STATUS_OPTIONS`;
	res = await query(SQL);
	console.log(`${res.command} : data type STATUS_OPTIONS deleted`);
}

console.log("deleting calendar table...");
deleteCalendarTable();

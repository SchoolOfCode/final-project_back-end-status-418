import { query } from "../index.js";

async function createCalendarTable() {
	const SQL = `CREATE TABLE IF NOT EXISTS 
    calendar(
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        habit_id INT,
        date TEXT,
        date_updated TIMESTAMPTZ,
        status STATUS_OPTIONS
);`;
	const res = await query(SQL);
	console.log(`${res.command} : calendar table created`);
}

/**Check if STATUS_OPTIONS type exists in the calendar table before creating it.
STATUS_OPTIONS is a custom data type for complete/skip/miss/incomplete */

async function checkStatusOps() {
	//define the frequency_interval options
	// prettier-ignore
	const statusOptions = ['complete', 'skip', 'miss', 'incomplete'];

	const sql = `SELECT typname FROM pg_type WHERE typcategory = 'E'`;
	const res = await query(sql);

	const exists =
		Object.fromEntries(
			Object.entries(res.rows[0]).filter(
				([key, value]) => value === "status_options"
			)
		).typname === "status_options";
	console.log(exists);

	if (!exists) {
		// const qry = "CREATE TYPE STATUS_OPTIONS as ENUM ($1, $2, $3, $4);";
		// const res = await query(qry, statusOptions);
		const qry =
			"CREATE TYPE STATUS_OPTIONS as ENUM ('complete', 'skip', 'miss', 'incomplete');";
		const res = await query(qry);
		console.log(`${res.command}: created type status_options`);
	} else {
		console.log("OK : data type status_options already exists");
	}
}
console.log("checking whether data type status_options exists...");
await checkStatusOps();
console.log("creating calendar table...");
await createCalendarTable();

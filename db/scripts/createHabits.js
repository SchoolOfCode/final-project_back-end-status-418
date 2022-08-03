import { query } from "../index.js";
// import "dotenv/config";

/**Check if FREQ_OPTIONS type exists in the habits table before creating it.
FREQ_OPTIONS is a custom data type for daily/weekly/monthly */

async function checkFreqOps() {
	//define the frequency_interval options
	const typeOptions = ["daily", "weekly", "monthly"];

	const sql = `SELECT typname FROM pg_type WHERE typcategory = 'E'`;
	const res = await query(sql);

	const exists =
		Object.fromEntries(
			Object.entries(res.rows[0]).filter(
				([key, value]) => value === "freq_options"
			)
		).typname === "freq_options";

	if (!exists) {
		const query = "CREATE TYPE FREQ_OPTIONS as ENUM ($1, $2, $3);";
		const res = await query(query, typeOptions);
		console.log(`${res.command}: created type freq_options`);
	} else {
		console.log("data type freq_options already exists");
	}
}

async function createHabitsTable() {
	const SQL = `CREATE TABLE IF NOT EXISTS 
    habits(
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        name TEXT, 
        description TEXT, 
        userId TEXT, 
        everyday BOOLEAN,
        frequency_reps SMALLINT,
        frequency_interval FREQ_OPTIONS,
        date_created TIMESTAMPTZ
);`;
	const res = await query(SQL);
	console.log(`${res.command} : habits table created`);
}

// async () => {
// 	await checkFreqOps();
// 	await createHabitsTable();
// };

console.log("checking whether data type freq_options exists...");
await checkFreqOps();
console.log("creating habits table...");
await createHabitsTable();

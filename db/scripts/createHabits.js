import { query } from "../index.js";
// import "dotenv/config";

//Create a custom data type for daily/weekly/monthly only
const setFreqIntervalTypes =
	"CREATE TYPE FREQ_OPTIONS as ENUM ('daily', 'weekly', 'monthly'); ";

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

async function createHabitsTable() {
	const res = await query(setFreqIntervalTypes + SQL);
	console.log(res.command, ": created habits table");
}

createHabitsTable();

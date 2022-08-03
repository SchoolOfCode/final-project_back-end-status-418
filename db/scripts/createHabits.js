import { query } from "../index.js";
// import "dotenv/config";

//Create a custom data type for daily/weekly/monthly only
const setFreqIntervalTypes =
	"CREATE TYPE freq_options as ENUM ('daily', 'weekly', 'monthly');";

async function createHabitsTable() {
	await query(
		`${setFreqIntervalTypes} 
        CREATE TABLE IF NOT EXISTS 
        habits(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
            name TEXT, 
            description TEXT, 
            userId TEXT, 
            everyday BOOLEAN,
            frequency_reps SMALLINT
            frequency_interval setFreqIntervalTypes
            date_created TIMESTAMPTZ
	    );`
	);
}
createHabitsTable();

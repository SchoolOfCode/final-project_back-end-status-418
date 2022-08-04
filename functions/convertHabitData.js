/** Converts the database data to the backend object structure (i.e. with frequency_reps and frequency_interval nested as an object under the key 'frequency').
 * Expects an array as input. */
export default function convertHabitData(dataFromSqlQuery) {
	let convertedData = [];
	dataFromSqlQuery.map((h, index) => {
		convertedData[index] = {
			id: h.id,
			name: h.name,
			description: h.description,
			userId: h.userid,
			everyday: h.everyday,
			frequency: {
				fr_reps: h.frequency_reps,
				fr_interval: h.frequency_interval,
			},
		};
	});
	return convertedData;
}

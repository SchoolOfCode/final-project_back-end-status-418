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

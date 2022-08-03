//fr_quantity ?? fr_count?? fr_period ?? fr_reps

const habits = [
	{
		id: 1,
		name: "Walk the dog",
		description: "Every day after work I'll grab the dog's leash",
		userId: "abc123",
		everyday: true,
		frequency: { fr_reps: null, fr_interval: null },
		date_created: new Date(),
	},
	{
		id: 2,
		name: "Drink water",
		description: "Keep a jug full of water by my desk",
		userId: "xyz123",
		everyday: false,
		frequency: { fr_reps: 8, fr_interval: "daily" },
		date_created: new Date(),
	},
	{
		id: 3,
		name: "Go to gym",
		description:
			"On Mon, Wed and Fri I'll leave my gym bag by the front door",
		userId: "abc123",
		everyday: false,
		frequency: { fr_reps: 3, fr_interval: "weekly" },
		date_created: new Date(),
	},
];

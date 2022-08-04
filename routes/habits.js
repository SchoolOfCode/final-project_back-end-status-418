import express from "express";
const router = express.Router();

//prettier-ignore
import { getAllHabits, getHabitById, getHabitsByUserId, addNewHabit } from "../models/habits.js";

import convertHabitData from "../functions/convertHabitData.js";

// 🌍 GET
// all habits - includes search query for userId
router.get("/", async (req, res) => {
	// Get all habits by userId – via search query
	if (req.query.userId !== undefined) {
		console.log(req.query.userId);
		const result = await getHabitsByUserId(req.query.userId);
		const convertedData = convertHabitData(result);

		const payload = {
			success: true,
			message: `Data for userId = ${req.query.userId}`,
			data: convertedData,
		};
		return res.json(payload);
	}

	const result = await getAllHabits();
	const convertedData = convertHabitData(result);

	const payload = {
		success: true,
		message: `All data on habits table`,
		data: convertedData,
	};
	return res.json(payload);
});

// 🌍 GET
//Get by habit id
router.get("/:id", async (req, res) => {
	const result = await getHabitById(Number(req.params.id));
	const convertedData = convertHabitData(result);
	const payload = {
		success: true,
		message: `Data for habit id = ${req.params.id}`,
		data: convertedData,
	};
	if (result.length < 1) {
		return res.json({
			success: false,
			message: "Habit id not found in database",
		});
	} else {
		return res.json(payload);
	}
});

// 📩 POST
// Add entire habit (must be received as body of request, in correct format)

// TODO: Check that body of the request is in the correct format and return an error message if not
//TODO: create the addNewHabit model

router.post("/", async (req, res) => {
	const result = await addNewHabit(req.body);
	const convertedData = convertHabitData(result);
	const payload = {
		success: true,
		message: `Created new habit (${convertedData[0].name}) for user ${convertedData[0].userId}`,
		data: convertedData,
	};

	return res.status(201).json(payload);
});

export default router;

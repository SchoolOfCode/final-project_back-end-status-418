import express from "express";
const router = express.Router();

//prettier-ignore
import { getAllHabits, getHabitById, getHabitsByUserId } from "../models/habits.js";
import convertHabitData from "../functions/convertHabitData.js";

//Get all habits - includes search query for userId
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

export default router;

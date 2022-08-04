import express from "express";
const router = express.Router();

import { getAllHabits, getHabitById } from "../models/habits.js";

//Get all habits - includes search query for userId
router.get("/", async (req, res) => {
	const result = await getAllHabits();
	const payload = {
		success: true,
		message: `All data on habits table`,
		data: result,
	};
	return res.json(payload);
});

//Get by habit id
router.get("/:id", async (req, res) => {
	const result = await getHabitById(Number(req.params.id));
	const payload = {
		success: true,
		message: `Data for habit id = ${req.params.id}`,
		data: result,
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

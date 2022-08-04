import express from "express";
const router = express.Router();

import { getAllHabits } from "../models/habits.js";

router.get("/", async (req, res) => {
	const result = await getAllHabits();
	const payload = {
		success: true,
		data: result,
	};
	res.json(payload);
});

export default router;

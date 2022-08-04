import express from "express";
const calendarRouter = express.Router();

import { getAllByIDAndDate } from "../models/calendar.js";

// get where habit_id and date is the same
calendarRouter.get("/:id", async function (req, res) {
  res.json({
    success: true,
    payload: await getAllByIDAndDate(Number(req.params.id)),
  });
});

// update status

// post

// habit

export default calendarRouter;

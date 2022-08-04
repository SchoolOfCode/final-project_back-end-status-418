import express from "express";
const calendarRouter = express.Router();

import { getAllByIDAndDate } from "../models/calendar.js";

// get where habit_id and date is the same
calendarRouter.get("/:id", async function (req, res) {
  try {
    res.status(200).json({
      success: true,
      payload: await getAllByIDAndDate(Number(req.params.id)),
    });
  } catch (e) {
    res.status(404).send({
      sucess: false,
      message: "Please enter correct id number",
    });
  }
});

// update status

// post new calendar entry
calendarRouter.post("/", async function (req, res) {
  res.json({ sucess: true });
});

// habit

export default calendarRouter;
